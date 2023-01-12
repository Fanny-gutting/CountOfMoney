module.exports = (sequelize, Sequelize) => {
    const Admin_settings = sequelize.define("admin_settings", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        value: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });

    return Admin_settings;
};
