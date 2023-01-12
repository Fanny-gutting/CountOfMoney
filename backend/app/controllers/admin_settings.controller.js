const db = require("../models");
const Admin_settings = db.admin_settings;

exports.create = (req, res) => {
    if (req.user.status === 0) {
        if (!req.body.name || !req.body.value) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        const admin_settings = {
            name: req.body.name,
            value: req.body.value,
        };
        Admin_settings.create(admin_settings)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                console.log("ntm")
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Admin_setting."
                });
            });
    } else {
        res.send("unauthorized access")
    }
}

exports.findAll = (req, res) => {
    Admin_settings.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send("Error while retrieving Admin_settings: ", err);
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    if (req.user.status === 0) {
        Admin_settings.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Admin_settings was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Admin_settings with id=${id}. Maybe User was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Admin_settings with id=" + id
                });
            });
    } else {
        res.send("unauthorized access")
    }
};

exports.delete = (req, res) => {
    if (req.user.status === 0) {
        Admin_settings.destroy({
            where: { id: req.params.id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Admin_settings was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Admin_settings. Maybe User was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Admin_settings"
                });
            });
    } else {
        res.send("unauthorized access")
    }
};

exports.deleteAll = (req, res) => {
    if (req.user.status === 0) {
        Admin_settings.destroy({
            where: {},
            truncate: false
        })
            .then(nums => {
                res.send({ message: `${nums} Admin_settings were deleted successfully!` });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while removing all Admin_settings."
                });
            });
    } else {
        res.send("unauthorized access")
    }
};