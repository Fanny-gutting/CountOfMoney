const db = require("../models");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = db.users;
const Crypto = db.cryptos;
const Rss = db.rsses;
const tokenSecret = "my-token-secret";

exports.create = (req, res) => {
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error)
            res.status(500).json(error)
        else {
            if (!req.body.email) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }
            const user = {
                username: req.body.username,
                email: req.body.email,
                password: hash,
                status: req.body.status,
            };
            User.create(user)
                .then(data => {
                    res.status(200).json({ token: generateToken(data), user: user });
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the User."
                    });
                });
        }
    })
};

exports.login = (req, res) => {
    User.findOne({ where: { email: req.body.email } }).then(user => {
        if (!user)
            res.status(404).json({ error: 'no user with that email found' })
        else
            bcrypt.compare(req.body.password, user.password, (error, match) => {
                if (error) {
                    res.status(500).json(error)
                }
                else if (match) {
                    res.status(200).json({ token: generateToken(user) })
                }
                else {
                    res.status(403).json({ error: 'passwords do not match' })
                }
            })
    }).catch(error => {
        res.status(500).json(error)
    })
}

exports.createOauth = (req, res) => {
    bcrypt.hash(req.user.id, 10, (error, hash) => {
        if (error)
            res.status(500).json(error)
        else {
            if (!req.user._json.email) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }
            const user = {
                username: req.user._json.given_name,
                email: req.user._json.email,
                password: hash,
                status: 1,
            };
            User.create(user)
                .then(data => {
                    res.status(200).json({ token: generateToken(data), user: user });
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the User."
                    });
                });
        }
    })
};

exports.loginOauth = (req, res) => {
    User.findOne({ where: { email: req.user._json.email } }).then(user => {
        if (!user)
            this.createOauth(req, res);
        else
            bcrypt.compare(req.user.id, user.password, (error, match) => {
                if (error) {
                    res.status(500).json(error)
                }
                else if (match) {
                    res.status(200).json({ token: generateToken(user) })
                }
                else {
                    res.status(403).json({ error: 'passwords do not match' })
                }
            })
    }).catch(error => {
        res.status(500).json(error)
    })
}

function generateToken(user) {
    return jwt.sign({ data: user }, tokenSecret, { expiresIn: ('24h') })
}

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if (!token)
        res.status(403).json({ error: "please provide a token" })
    else {
        jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
            if (err)
                res.status(500).json({ error: 'failed to authenticate token' })
            if (value) {
                req.user = value.data
                next()
            }
        })
    }
}

exports.findAll = (req, res) => {
    console.log("req.user.id = ", req.user.id);
    console.log("req.user.status = ", req.user.status);
    User.findAll({
        attributes: { exclude: req.user.status === 0 ? null : ['status', 'password'] },
        include: req.user.status === 0 ? [
            {
                model: Crypto,
                as: "cryptos",
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            },
            {
                model: Rss,
                as: "rss",
                attributes: ["name", "url"],
                through: {
                    attributes: [],
                }
            },
        ] : null,
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send("Error while retrieving Users: ", err);
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log("req.user.id = ", req.user.id);
    console.log("req.user.status = ", req.user.status);

    User.findOne({
        where: { id: id },
        attributes: { exclude: (req.user.status === 0 || req.user.id == id) ? null : ['status', 'password'] },
        include: (req.user.status === 0 || req.user.id == id) ? [
            {
                model: Crypto,
                as: "cryptos",
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            },
            {
                model: Rss,
                as: "rss",
                attributes: ["name", "url"],
                through: {
                    attributes: [],
                }
            },
        ] : null,
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

exports.update = (req, res) => {
    if (req.user.id == req.params.id || req.user.status === 0) {
        const id = req.params.id;

        User.update(req.body, {
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
    } else {
        res.send("unauthorized access")
    }
};

exports.delete = (req, res) => {
    const id = req.params.id;
    if (req.user.status === 0) {
        User.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "User was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete User with id=${id}. Maybe User was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete User with id=" + id
                });
            });
    } else {
        res.send("unauthorized access")
    }
};

exports.deleteAll = (req, res) => {
    if (req.user.status === 0) {
        User.destroy({
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
    } else {
        res.send("unauthorized access")
    }
};