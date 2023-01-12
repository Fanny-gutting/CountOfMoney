const https = require("https");
const db = require("../models");
const Crypto_value = db.crypto_values;
const Crypto = db.cryptos;

exports.create = (req, res) => {
    if (req.user.status === 0) {
        if (!req.body.value || !req.body.date) {
            res.status(400).send({
                message: "Some content is missing in the body"
            });
            return;
        }
        const crypto_value = {
            value: req.body.value,
            date: req.body.date,
            cryptoId: req.body.cryptos_id,
        };
        Crypto_value.create(crypto_value)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Crypto_value."
                });
            });
    } else {
        res.send("unauthorized access")
    }
};

exports.getValueByCryptoId = (req, res) => {
    Crypto.findOne({ where: { id: req.params.id } }, { include: ["crypto_value"] })
        .then((data) => {
            Crypto_value.findAll({
                where: { cryptoId: data.id },
                order: [
                    ['id', 'DESC'],
                ],
            }).then((result) => {
                res.send(result)
            }).catch((err) => {
                res.send(err);
            });
        })
        .catch((err) => {
            res.status(500).send(">> Error while finding crypto: ", err);
        });
};

exports.findAll = (req, res) => {
    Crypto_value.findAll({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send(">> Error while retrieving Crypto_values: ", err);
        });
};

exports.update = (req, res) => {
    if (req.user.status === 0) {
        const id = req.params.id;

        Crypto_value.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Crypto_value was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Crypto_value with id=${id}. Maybe Crypto_value was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Crypto_value with id=" + id
                });
            });
    } else {
        res.send("unauthorized access")
    }
};

exports.delete = (req, res) => {
    if (req.user.status === 0) {
        const id = req.params.id;

        Crypto_value.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Crypto_value was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Crypto_value with id=${id}. Maybe Crypto_value was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Crypto_value with id=" + id
                });
            });
    } else {
        res.send("unauthorized access")
    }
};

exports.deleteByCrypto = (req, res) => {
    if (req.user.status === 0) {
        const id = req.params.id;

        Crypto_value.destroy({
            where: { cryptoId: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Crypto_value was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Deleted ${num} Crypto_values.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Crypto_value with id=" + id
                });
            });
    } else {
        res.send("unauthorized access")
    }
};

exports.deleteAll = (req, res) => {
    if (req.user.status === 0) {
        Crypto_value.destroy({
            where: {},
            truncate: false
        })
            .then(nums => {
                res.send({ message: `${nums} Crypto_values were deleted successfully!` });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while removing all Crypto_values."
                });
            });
    } else {
        res.send("unauthorized access")
    }
};

exports.CryptoValueUpdate = (crypto_name) => {
    Crypto.findOne({ where: { name: crypto_name } })
        .then(crypto_data => {
            https.get('https://rest.coinapi.io/v1/exchangerate/' + crypto_name + '/USD?apikey=9FB50F4F-13B1-4984-B0F2-C041B6DDED09', (resp) => {
                let data = '';
                let result = null
                let crypto_value = {
                    value: null,
                    date: null,
                    cryptoId: 0,
                };
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    result = JSON.parse(data);
                    crypto_value.value = result.rate;
                    crypto_value.date = result.time;
                    crypto_value.cryptoId = crypto_data.id;
                    Crypto_value.create(crypto_value)
                        .catch(err => {
                            console.log(err.message || "Some error occurred while creating the Crypto_value.")
                        });
                });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
        })
        .catch(err => {
            console.log(err.message || "Error retrieving User_crypto")
        });
};