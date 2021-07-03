import { Router } from 'express';

const router = Router();

router.get('/error', (req, res, next) => {
    const { error, message } = req.query;
    const newmsg = message.replace('%20', ' ')
    console.log(error, message)
    res.status(200).json({ message: newmsg })
});

router.get('/success', (req, res, next) => {
    const { status, message } = req.query;
    res.status(201).json({ message: message })
})

export default router;