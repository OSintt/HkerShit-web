import User from '../models/User';
import rateLimit from "express-rate-limit";
import request from 'request';

export const doubleUser = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if(user) {
        return res.status(200).json({ message: "El usuario ya existe." });
    } else {
        next()
    }
}

export const tooManyReqs = rateLimit({
    windowMs: 300000,
    max: 10,
    message: {
        message: "Rate Limited, please allow 5 minutes to cooldown."
    }
})

export const verifyCaptcha = async (req, res, next) => {
    const { captcha } = req.body;
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (captcha === undefined || captcha === "" || captcha === null || captcha === false) {
        return res.status(200).json({success: false, message: "Por favor, complete el captcha"});
    }
    const secretKey = "6LeXkdAaAAAAAI094AnJZyRRjsv3EGnVopiPZpIQ";
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}&remoteip=${userIp}`;

    request(verifyUrl, (err, response, body) => {
        body = JSON.parse(body);
        if (body.success !== undefined && !body.success) {
            return res.status(200).json({success: false, message: "Por favor, complete el captcha"});
        } else {
            res.status(201).json({success: true, message: "Captcha passed"})
            next();
        } 
    });
}

export const verifyParams = async (req, res, next) => {
    const { username, password } = req.body;
    const user = req.user;
    if(user) {
        return res.status(400).json({ message: "You are already logged in!" })
    } else {
        if(username === "" || username === undefined || username === null) {
            return res.status(200).json({ message: "El parametro usuario no puede ir vacío." });
        } else if(password === "" || password === undefined || password === null) {
            return res.status(200).json({ message: "El parametro contraseña no puede ir vacío." });
        } else {
            if(username.length < 3) {
                return res.status(200).json({ message: "El parametro usuario debe ser mayor a 3 caracteres" });
            } else if(username.length > 15) {
                return res.status(200).json({ message: "El parametro usuario debe ser menor a 15 caracteres" });
            }
            if(password.length < 6) {
                return res.status(200).json({ message: "El parametro contraseña debe ser mayor a 6 caracteres" })
            } else if(password.length > 20) {
                return res.status(200).json({ message: "El parametro contraseña debe ser menor a 20 caracteres" })
            }
            next()
        }
    }
}