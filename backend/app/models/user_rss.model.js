module.exports = (sequelize, Sequelize) => {
    const User_rss = sequelize.define("user_rss", {
        users_id: {
            type: Sequelize.INTEGER
        },
        rsses_id: {
            type: Sequelize.INTEGER
        }
    });

    return User_rss;
};
