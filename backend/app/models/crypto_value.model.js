module.exports = (sequelize, Sequelize) => {
    const Crypto_value = sequelize.define("crypto_value", {
        value: {
            type: Sequelize.STRING,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });

    return Crypto_value;
};
