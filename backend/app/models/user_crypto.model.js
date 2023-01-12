module.exports = (sequelize, Sequelize) => {
    const User_crypto = sequelize.define("user_crypto", {
        users_id: {
            type: Sequelize.INTEGER
        },
        cryptos_id: {
            type: Sequelize.INTEGER
        }
    });

    return User_crypto;
};
