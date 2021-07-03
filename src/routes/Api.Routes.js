import { Router } from "express";
import dxCtrl from '../controllers/dxCtrl';
import { duplicatedDx, tooManyReqs, checkDoxContent, verifyCaptcha, isVerified, addView } from '../middlewares/dx.Middlewares';
const router = Router();

router.route('/')
.get([tooManyReqs],(req, res) => res.json({ message: "Welcome to Hk$hit Api" }))

router.route('/dox')
.post([tooManyReqs, checkDoxContent, verifyCaptcha, duplicatedDx], dxCtrl.createDx)

router.route('/dox/:id')
.get([tooManyReqs, addView, isVerified], dxCtrl.getDx)

router.route('/doxes')
.get([tooManyReqs], dxCtrl.getDxes)

export default router;