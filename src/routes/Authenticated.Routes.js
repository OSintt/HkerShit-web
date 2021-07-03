import { Router } from 'express';
import { tooManyReqs } from '../middlewares/user.Middlewares';
const router = Router();

router.get('/', [tooManyReqs], async (req, res, next) => {
    res.redirect('/isAuthenticated')
})

router.get('/isAuthenticated', [tooManyReqs], async (req, res, next) => {
    const user = req.user;
    if(user) {
        return res.status(201).json({ message: true, status: 1 });
    } else {
        return res.status(401).json({ message: false, status: 0 });
    }
});

export default router;