const { Sequelize } = require('sequelize');

//option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite:memory:') 
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')

//option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: 'path/to/database.sqlite'
// });

//option 3: other dialects
const sequelize = new Sequelize('nodejs', 'root', 'phong', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully');
    } catch (error) {
        console.log('Unable to connect to the database', error);
    }
}

module.exports = connectDB; 