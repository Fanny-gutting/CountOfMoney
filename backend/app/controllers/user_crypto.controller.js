const db = require("../models");
const User = db.users;
const Crypto = db.cryptos;
const User_crypto = db.user_cryptos;

exports.addCrypto = (req, res) => {
    if (!req.body.users_id || !req.body.cryptos_id) {
        res.status(400).send("Cannot be empty")
        return;
    }
    User.findByPk(req.body.users_id)
        .then((user) => {
            if (!user) {
                res.send("User not found!");
                return;
            }
            Crypto.findByPk(req.body.cryptos_id).then((crypto) => {
                if (!crypto) {
                    res.send("Crypto not found!");
                    return;
                }
                user.addCrypto(crypto);
                res.send(`added Crypto id=${crypto.id} to User id=${user.id}`);
            });
        })
        .catch((err) => {
            res.status(500).send("Error while adding crypto to User: ", err);
        });
};

exports.findAll = (req, res) => {
    User_crypto.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send("Error while retrieving Users: ", err);
        });
};

exports.findOne = (req, res) => {
    if (!req.body.users_id || !req.body.cryptos_id) {
        res.status(400).send("Cannot be empty")
        return;
    }
    User_crypto.findOne({ where: { users_id: req.body.users_id, cryptos_id: req.body.cryptos_id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User_crypto"
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    User_crypto.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    if (!req.body.users_id || !req.body.cryptos_id) {
        res.status(400).send("Cannot be empty")
        return;
    }
    User_crypto.destroy({
        where: { users_id: req.body.users_id, cryptos_id: req.body.cryptos_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User"
            });
        });
};

exports.deleteAll = (req, res) => {
    User_crypto.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        });
};