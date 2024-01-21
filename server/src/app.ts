import cors from 'cors';
import express from 'express';
import authRouter from './auth/auth.route';
import session from 'express-session';
import FileStore from 'session-file-store';
import environment from './config/environment';

const app = express();

app.use(cors());
app.use(express.json());

const Store = FileStore(session);
app.use(session({
    secret: 'this key is used to sign the cookie, so keep it secret :)',
    resave: false,
    saveUninitialized: false,
    store: new Store({}),
    name: 'session',
    cookie: {
        secure: environment.production,
        sameSite: true,
        maxAge: 100 * 60 * 60 * 24 * 30,
        httpOnly: true
    }
}));

app.use('/api/auth', authRouter);

export default app;