import express from 'express';
import {OAuth2Client} from 'google-auth-library';
import environment from '../config/environment';
import {IUser} from '../models/user.model';

export default class AuthController {
    public static async login(req: express.Request, res: express.Response, next: express.NextFunction) {
        const authClient = new OAuth2Client();
        const credential = req.body.credential;

        if (!credential) {
            return res.status(401).send({message: 'Token not provided.'});
        }

        try {
            const ticket = await authClient.verifyIdToken({
                idToken: credential,
                audience: environment.google.clientId
            });
            const payload = ticket.getPayload();
            const user: IUser = {
                id: payload.sub,
                name: payload.name,
                email: payload.email,
                picture: payload.picture
            };

            // Do something with the user, such as saving it in the database

            req.session.user = user;

            res.status(200).send(user);
        } catch (error: any) {
            res.status(401).send({message: error.message});
            next(error);
        }
    }

    public static async logout(req: express.Request, res: express.Response) {
        req.session.destroy((error) => {
            if (error) {
                return res.status(401).send({message: error.message});
            }

            res.status(200).send();
        });
    }

    public static async authenticate(req: express.Request, res: express.Response) {
        res.status(200).json(req.session?.user);
    }
}
