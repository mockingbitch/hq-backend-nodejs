'use strict';

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AllCode extends Model {

        static associate(models) {
            //define association 
        }
    };

    AllCode.init({
        key: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEN: DataTypes.STRING,
        valueVI: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AllCode',
    });
    return AllCode;
}