const db = require("../models");
const Rss = db.rsses;

exports.create = (req, res) => {
    if (req.user.status === 0) {
        if (!req.body.url) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        const rss = {
            name: req.body.name,
            url: req.body.url,
        };
        Rss.create(rss)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Rss."
                });
            });
    } else {
        res.send("unauthorized access")
    }
};

exports.findAll = (req, res) => {
    Rss.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Rss."
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    Rss.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Rss with id=" + id
            });
        });
};

exports.update = (req, res) => {
    if (req.user.status === 0) {
        const id = req.params.id;

        Rss.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Rss was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Rss with id=${id}. Maybe Rss was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Rss with id=" + id
                });
            });
    } else {
        res.send("unauthorized access")
    }
};

exports.delete = (req, res) => {
    if (req.user.status === 0) {
        const id = req.params.id;

        Rss.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Rss was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Rss with id=${id}. Maybe Rss was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Rss with id=" + id
                });
            });
    } else {
        res.send("unauthorized access")
    }
};

exports.deleteAll = (req, res) => {
    if (req.user.status === 0) {
        Rss.destroy({
            where: {},
            truncate: false
        })
            .then(nums => {
                res.send({ message: `${nums} Rss were deleted successfully!` });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while removing all rss."
                });
            });
    } else {
        res.send("unauthorized access")
    }
};