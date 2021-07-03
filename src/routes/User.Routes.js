import { Router } from "express";
import userCtrl from '../controllers/UserCtrl';
import { doubleUser, tooManyReqs, verifyCaptcha, verifyParams } from '../middlewares/user.Middlewares';
import passport from 'passport'
const router = Router();

router.route('/')
.get([tooManyReqs], (req, res, next) => {
    res.status(200).json({ message: "Welcome to user Api!" });
});

router.route('/register')
.post([tooManyReqs, doubleUser, verifyParams, verifyCaptcha], userCtrl.createUser)

router.route('/login')
.post([tooManyReqs], userCtrl.loginUser)

export default router;