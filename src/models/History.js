'use strict';

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class History extends Model {

        static associate(models) {
            //define association 
        }
    };

    History.init({
       patientId: DataTypes.INTEGER,
       doctorId: DataTypes.INTEGER,
       description: DataTypes.STRING,
       files: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'History',
    });
    return History;
}