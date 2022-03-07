'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            email: 'phong123@gmail.com',
            password: '$2a$10$qE7e9BZpkWMkuB/5aUdD.OUlLnREODFj9srSE5Yc0xHPtBzFqJKc6',
            firstName: 'Phong',
            lastName: 'Tran',
            address: 'VN',
            phoneNumber: '0374110298',
            image: 'jasfkjfkjasdkjf',
            gender: 1,
            roleId: 'R1',
            positionId: '1',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },
    
    down: async (queryInterface, Sequelize) => {

    }
}