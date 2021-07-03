import rateLimit from "express-rate-limit";
import Dx from '../models/doxModel';
import request from 'request'

export const tooManyReqs = rateLimit({
    windowMs: 300000,
    max: 10,
    message: {
        message: "Rate Limited, please allow 5 minutes to cooldown."
    }
})

export const duplicatedDx = async (req, res, next) => {
    const { title } = req.body;
    const dx = await Dx.findOne({ title });

    if ( dx ) {
        return res.status(400).json({ message: "Este Dox ya Existe!" })
    } else {
        next();
    }
};

export const isVerified = async (req, res, next) => {
    const dx = await Dx.findOne({ _id: req.params.id });
    if(dx) {
        if(dx.verified === false) return res.status(403).json({ message: "Este dox aun no esta verificado." });
        next()
    } else {
        return res.status(404).json({ message: "404 Not Found" });
    }
    
}


export const addView = async (req, res, next) => {
    const { id } = req.params;
    const dx = await Dx.findOne({ _id: id });
    if(dx) {
        const dxView = dx.views + 1;
        dx.views = dxView;
        dx.save()
        next()
    } else {
        res.status(404).json({ message: "Not Found" })
    }
}

export const checkDoxContent = async (req, res, next) => {
    const { title, content } = req.body;
    if(title === "" || title === undefined || title === null) {
        return res.status(200).json({ message: "'Titulo': Este espacio es requerido" })
    } else if(content === "" || content === undefined || content === null) {
        return res.status(200).json({ message: "'Contenido': Este espacio es requerido" })
    }   
    if(title.length < 5) {
        return res.status(200).json({ success: false, message: "El titulo debe ser mayor a 5 caracteres." });
    }
    if(content.length < 20) {
        res.status(200).json({ success: false, message: "El contenido debe ser mayor a 20 caracteres." });
    }
    next()
}

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