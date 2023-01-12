module.exports = (sequelize, Sequelize) => {
    const Rss = sequelize.define("rss", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        url: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
    });

    return Rss;
};
