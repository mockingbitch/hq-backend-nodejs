import express from "express";
import HomeController from "../controllers/HomeController";
import UserController from '../controllers/UserController';

let router = express.Router();

let initWebAPIs = (app) => {
    //USER
    router.post('/api/login', UserController.handleLogin);
    router.get('/api/user', UserController.show);
    router.post('/api/user', UserController.create);
    router.put('/api/user', UserController.update);
    router.delete('/api/user', UserController.destroy);

    return app.use("/", router);
}

module.exports = initWebAPIs;