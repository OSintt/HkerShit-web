import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

passport.use(
    new LocalStrategy({
        usernameField: "username"
    }, async (username, password, done) => {
        const user = await User.findOne({ username: username });
        const passwordCompare = user === null ? false : bcrypt.compareSync(password, user.password);
        if(!(user && passwordCompare)) {
            return done(null, false, { message: "400 Invalid User or Password" })
        } else {
            const userToken = {
                id: user._id,
                username: user.username
            }
            jwt.sign(userToken, 'HkShit')
            return done(null, user)
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    if(user) {
        done(null, user);
    }
});