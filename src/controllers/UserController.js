import UserService from '../services/UserService'

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Email or Password must be not empty!'
        })
    }

    let userData = await UserService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let show = async (req, res) => {
    let id = req.query.id;

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: []
        })
    }

    let users = await UserService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let create = async (req, res) => {
    let message = await UserService.createNewUser(req.body);

    return res.status(201).json(message);
}

let update = async (req, res) => {
    let id = req.query.id;

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters'
        })
    }

    let message = await UserService.updateUser(id, req.body);

    return res.status(200).json(message);
}

let destroy = async (req, res) => {
    let id = req.query.id;
    
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters'
        })
    }

    let message = await UserService.deleteUser(id);
    
    return res.status(200).json(message);
}

module.exports = {
    handleLogin: handleLogin,
    show: show,
    create: create,
    update: update,
    destroy: destroy
}