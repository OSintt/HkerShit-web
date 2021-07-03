// Imports
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import mongoose from 'mongoose';
import cors from 'cors';
import './database';
import './auth/login';
import ApiRoutes from './routes/Api.Routes';
import UserApiRoutes from './routes/User.Routes';
import ErrorApiRoutes from './routes/error.Routes';
import Auth from './routes/Authenticated.Routes';
// Variables
const app = express();
const MongoStore = require('connect-mongo')(session);
// Settings
app.set('port', process.env.PORT || 7000);

// Middlewares
app.use(session({
    secret: "uwu",
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
    name: "hacker.login",
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Middlewares Passport
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/doxes', ApiRoutes);
app.use('/api/users', UserApiRoutes);
app.use('/api/error', ErrorApiRoutes);
app.use('/api/auth', Auth)

app.listen(app.get('port'), () => console.log("Servidor listo en el puerto", app.get('port')));
