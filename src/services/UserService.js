import db from '../models/index'
import bcrypt from 'bcryptjs';
import { reject } from 'bcrypt/promises';

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = async (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);

            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                });

                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 1;
                        userData.errMessage = 'Wrong password';
                    }

                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'User not found';
                }

            } else {
                userData.errCode = 1;
                userData.errMessage = 'Your user email does not exist';
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })

            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            console.log(users);
            resolve(users);

        } catch (e) {
            reject(e);
        }
    })
}

let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkEmail = await checkUserEmail(data.email);

            if (checkEmail === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Existed email'
                })
            } else {
                let hashedPassword = await hashPassword(data.password);
                await db.User.create({
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    image: data.image,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    password: hashedPassword
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Created',
                });

            }

        } catch (e) {
            reject(e);
        }
    })
}

let updateUser = async (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            })

            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: 'Could not find user'
                })
            } else {
                await db.User.update({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    image: data.image,
                    roleId: data.roleId,
                    positionId: data.positionId,
                },
                    { where: { id: id } })

                    resolve({
                        errCode: 0,
                        message: 'Updated'
                    })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            })
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: 'Could not find user id'
                })
            } else {
                await db.User.destroy({
                    where: { id: id }
                });

                resolve({
                    errCode: 0,
                    errMessage: 'Deleted Successfully'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}