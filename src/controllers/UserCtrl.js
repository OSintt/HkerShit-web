import User from '../models/User';
import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';
const userCtrl = {};

userCtrl.createUser = async (req, res, next) => {
    const { username, password } = req.body;
    const newPwd = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = new User({
        username: username,
        password: newPwd
    })
    await newUser.save();
    const userToken = {
        id: newUser._id,
        username: newUser.username
    }
    const token = jwt.sign(userToken, 'HkShit')
    return res.status(200).json({ username: newUser.username, id: newUser._id, token})
}

userCtrl.loginUser = passport.authenticate('local', {
    successRedirect: '/api/error/success?status=200&message=Redireccionando...',
    failureRedirect: '/api/error/error?error=400&message=Inicio%20de%20Sesión%20Invalido'
})

export default userCtrl;