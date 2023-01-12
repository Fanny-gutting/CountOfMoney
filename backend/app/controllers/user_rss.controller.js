const db = require("../models");
const User = db.users;
const Rss = db.rsses;
const User_rss = db.user_rsses;

exports.addRss = (req, res) => {
    if (!req.body.users_id || !req.body.rsses_id) {
        res.status(400).send("Cannot be empty")
        return;
    }
    User.findByPk(req.body.users_id)
        .then((user) => {
            if (!user) {
                res.send("User not found!");
                return;
            }
            Rss.findByPk(req.body.rsses_id).then((rss) => {
                if (!rss) {
                    res.send("Rss not found!");
                    return;
                }
                user.addRss(rss);
                res.send(`added Rss id=${rss.id} to User id=${user.id}`);
            });
        })
        .catch((err) => {
            res.status(500).send("Error while adding rss to User: ", err);
        });
};

exports.findAll = (req, res) => {
    User_rss.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send("Error while retrieving User_rss: ", err);
        });
};

exports.findOne = (req, res) => {
    if (!req.body.users_id || !req.body.rsses_id) {
        res.status(400).send("Cannot be empty")
        return;
    }
    User_rss.findOne({ where: { users_id: req.body.users_id, rsses_id: req.body.rsses_id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User_rss"
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    User_rss.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User_rss was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User_rss with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User_rss with id=" + id
            });
        });
};

exports.delete = (req, res) => {

    if (!req.body.users_id || !req.body.rsses_id) {
        res.status(400).send("Cannot be empty")
        return;
    }
    User_rss.destroy({
        where: { users_id: req.body.users_id, rsses_id: req.body.rsses_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User_rss was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User_rss. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User_rss"
            });
        });
};

exports.deleteAll = (req, res) => {
    User_rss.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} User_rss were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all user_rss."
            });
        });
};