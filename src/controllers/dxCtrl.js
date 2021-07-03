import Dx from '../models/doxModel';
import moment from 'moment';
import { rateLimitDox } from '../middlewares/dx.Middlewares';
import rateLimit from 'express-rate-limit';

const dxCtrl = {}

// Moment Locale
moment.locale('es', {
    monthsShort: "En.*Feb.*Mar.*Abril*Mayo*Jun.*Jul.*Agost.*Sept.*Oct.*Nov.*Dic.".split('*'),
    months: "Enero*Febrero*Marzo*Abril*Mayo*Junio*Julio*Agosto*Septiembre*Octubre*Noviembre*Diciembre".split('*'),
    weekdays: "Domingo*Lunes*Martes*Miercoles*Jueves*Viernes*Sabado".split('*'),
    weekdaysShort: "Dom.*Lun.*Mar.*Mier.*Jue.*Vier.*Sab.".split('*')
})


// Dx Controllers
dxCtrl.createDx = async (req, res, next) => {
    const { title, content, visibility, password } = req.body;
    console.log(req.user)
    if(visibility || password || visibility && password) {
        const user = req.user;
        if(!user) {
            return res.status(400).json({ error: "'Visibilidad' | 'Contraseña' Esta accion es unica para usuarios registrados." });
        } else {
            const newDox = new Dx({
                title: title,
                author: req.user.username,
                content: content,
                visibility: visibility,
                password: password,
                creation: moment().format("MMMM Do YYYY h:mm:ss a")
            })
            newDox.save()
            res.status(200).json({ message: "200 Created" });
        }
    }
    if(user) {
        const newDox = new Dx({
            title: title,
            author: req.user.username ? req.user.username : "Hk$hit",
            content: content,
            creation: moment().format("MMMM Do YYYY h:mm:ss a")
        })
        newDox.save()
        return res.status(200).json({ message: "200 Created" });
    } else {
        const newDox = new Dx({
            title: title,
            author: "Hk$hit",
            content: content,
            creation: moment().format("MMMM Do YYYY h:mm:ss a")
        })
        newDox.save()
        return res.status(200).json({ message: "200 Created" });
    }
    
};

dxCtrl.getDxes = async (req, res, next) => {
    const doxes = await Dx.find();
    res.status(200).json(doxes);
};

dxCtrl.getDx = async (req, res, next) => {
    const { id } = req.params;
    const dox = await Dx.findById(id)
    if(dox) {
        return res.status(200).json(dox)
    } else {
        return res.status(404).json({ message: "404 Dox Not Found" });
    };
}

// Export all Functions

export default dxCtrl;