const db = require("../models");
const https = require("https");
const Crypto = db.cryptos;
const User = db.users;
const Admin_settings = db.admin_settings;
const Crypto_value = db.crypto_values;
const crypto_values = require("./crypto_value.controller");
const { Console } = require("console");

exports.create = (req, res) => {
    if (req.user.status === 0) {
        if (!req.body.name) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        // F73FC60D-D0B3-4980-9C89-53E5F0122FC9

        // 1BC98DC9-0C29-44F6-BB1C-E60F25FF11F7
        https.get('https://rest.coinapi.io/v1/exchangerate/' + req.body.name + '/USD?apikey=9FB50F4F-13B1-4984-B0F2-C041B6DDED09', (resp) => {
            let data = '';
            let result = null;
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                let crypto_id = 0;
                result = JSON.parse(data);
                if ('rate' in result) {
                    const crypto = {
                        name: req.body.name,
                        show: req.body.show,
                    };
                    Crypto.create(crypto)
                        .then(id => {
                            crypto_id = id.id
                            https.get('https://rest.coinapi.io/v1/assets/' + req.body.name + '?apikey=1BC98DC9-0C29-44F6-BB1C-E60F25FF11F7', (resp) => {
                                let dateAndCrypto = '';
                                let trueDateAndCrypto = null;
                                resp.on('data', (chunk) => {
                                    dateAndCrypto += chunk;
                                });
                                resp.on('end', () => {
                                    trueDateAndCrypto = JSON.parse(dateAndCrypto);
                                    https.get('https://rest.coinapi.io/v1/exchangerate/' + req.body.name + '/USD/history?period_id=10DAY&time_start=' + trueDateAndCrypto[0].data_start + '&time_end=' + trueDateAndCrypto[0].data_end + '&apikey=1BC98DC9-0C29-44F6-BB1C-E60F25FF11F7', (resp) => {
                                        let periods = '';
                                        let res_periods = null;
                                        resp.on('data', (chunk) => {
                                            periods += chunk;
                                        });
                                        resp.on('end', () => {
                                            res_periods = JSON.parse(periods);
                                            for (let i = 0; i < res_periods.length; i++) {
                                                Crypto_value.create({
                                                    value: res_periods[i].rate_open,
                                                    date: res_periods[i].time_period_start,
                                                    cryptoId: crypto_id,
                                                }).then(() => {
                                                })
                                                    .catch(err => {
                                                        res.status(500).send({
                                                            message:
                                                                err.message || "Some error occurred while creating the Crypto."
                                                        });
                                                    });
                                            }

                                        })
                                    }).on("error", (err) => {
                                        res.status(400).send({
                                            message: "Error: " + err
                                        });
                                    });

                                })
                            }).on("error", (err) => {
                                res.status(400).send({
                                    message: "Error: " + err
                                });
                            });
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while creating the Crypto."
                            });
                        });
                    res.send("crypto created successfully")
                } else {
                    res.status(400).send({
                        message: "crypto doesn't exist"
                    });
                }
            });
        }).on("error", (err) => {
            res.status(400).send({
                message: "Error: " + err
            });
        });
    } else {
        res.send("unauthorized access")
    }
};

exports.findAll = (req, res) => {
    Crypto.findAll({ include: ["crypto_value"], order: [[Crypto_value, 'date', 'DESC']] })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (i > -1) {
                    if (!req.headers.authorization && data[i].show === false) {
                        data.splice(i, 1)
                        i--
                    }
                }
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cryptos."
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    Crypto.findOne({ where: { id: id }, include: ["crypto_value"], order: [[Crypto_value, 'date', 'DESC']] })
        .then(data => {
            if (req.headers.authorization || data.show === true)
                res.send(data);
            else
                res.status(400).send("not authorized");
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Crypto with id=" + id
            });
        });
};

exports.update = (req, res) => {
    if (req.user.status === 0) {
        const id = req.params.id;

        Crypto.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Crypto was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Crypto with id=${id}. Maybe Crypto was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Crypto with id=" + id
                });
            });
    } else {
        res.send("unauthorized access")
    }
};

exports.delete = (req, res) => {
    if (req.user.status === 0) {
        const id = req.params.id;

        Crypto.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Crypto was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Crypto with id=${id}. Maybe Crypto was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Crypto with id=" + id
                });
            });
    } else {
        res.send("unauthorized access")
    }
};

exports.deleteAll = (req, res) => {
    if (req.user.status === 0) {
        Crypto.destroy({
            where: {},
            truncate: false
        })
            .then(nums => {
                res.send({ message: `${nums} Cryptos were deleted successfully!` });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while removing all cryptos."
                });
            });
    } else {
        res.send("unauthorized access")
    }
};

exports.FindPopCrypto = (req, res) => {
    Admin_settings.findAll({ where: { name: "crypto" } }).then(data => {
        let array = []
        Crypto.findAll({
            include: [
                {
                    model: User,
                    as: "users",
                    attributes: ["username"],
                    through: {
                        attributes: [],
                    }
                }, "crypto_value"]
        }).then(temp => {
            for (let i = 0; i < temp.length; i++) {
                array.push({
                    value: temp[i].dataValues.users.length,
                    id: temp[i].dataValues.id,
                    name: temp[i].dataValues.name,
                    show: temp[i].dataValues.show,
                    createdAt: temp[i].dataValues.createdAt,
                    updatedAt: temp[i].dataValues.updatedAt,
                    crypto_value: temp[i].dataValues.crypto_value,
                })
            }
            array.sort((a, b) => {
                if (a.value > b.value) {
                    return -1;
                }
                if (a.value < b.value) {
                    return 1;
                }
                return 0;
            });
            res.send(array)
        });
    })
};

exports.UpdateShowCrypto = (req, res) => {
    Admin_settings.findAll({ where: { name: "crypto" } }).then(data => {
        if (!data || !data[0])
            return;
        let array = []
        Crypto.findAll({
            include: [
                {
                    model: User,
                    as: "users",
                    attributes: ["username"],
                    through: {
                        attributes: [],
                    }
                }, "crypto_value"]
        }).then(temp => {
            for (let i = 0; i < temp.length; i++) {
                array.push({
                    value: temp[i].dataValues.users.length,
                    id: temp[i].dataValues.id,
                    name: temp[i].dataValues.name,
                    show: temp[i].dataValues.show,
                    createdAt: temp[i].dataValues.createdAt,
                    updatedAt: temp[i].dataValues.updatedAt,
                    crypto_value: temp[i].dataValues.crypto_value,
                })
            }
            array.sort((a, b) => {
                if (a.value > b.value) {
                    return -1;
                }
                if (a.value < b.value) {
                    return 1;
                }
                return 0;
            });
            let j = 0
            for (let i = 0; i < array.length; i++) {
                let crypto = {
                    name: "",
                    show: true
                };
                if (j < data[0].dataValues.value) {
                    crypto = {
                        name: array[i].name,
                        show: true
                    };
                    j++;
                } else {
                    crypto = {
                        name: array[i].name,
                        show: false,
                    };
                }
                Crypto.update(crypto, {
                    where: { id: array[i].id }
                }).catch(err => {
                    console.log("Error updating Crypto with id=" + array[i].id);
                });
            }
        });
    })
};

exports.Find5First = () => {
    Crypto.findAll({
        order: [['createdAt']]
    }).then(function (entries) {
        for (let i = 0; i < entries.length; i++)
            crypto_values.CryptoValueUpdate(entries[i].name)
    });
}