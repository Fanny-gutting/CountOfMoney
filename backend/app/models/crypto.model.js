module.exports = (sequelize, Sequelize) => {
    const Crypto = sequelize.define("crypto", {
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        show: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

    return Crypto;
};
