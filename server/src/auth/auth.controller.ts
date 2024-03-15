import express from 'express';
import {OAuth2Client} from 'google-auth-library';
import environment from '../config/environment';
import {IUser} from '../models/user.model';
import {IFacebookCredential, SocialLogin} from './auth.model';

export default class AuthController {
    public static async login(req: express.Request, res: express.Response, next: express.NextFunction) {
        const credential: any = req.body.credential;
        const socialLogin: SocialLogin = req.headers['x-social-login'] as SocialLogin;

        if (!credential) {
            return res.status(401).send({message: 'User or token not provided.'});
        }

        try {
            const user: IUser = await AuthController.handleCredential(credential, socialLogin);

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

    private static async handleCredential(credential: any, socialLogin: SocialLogin): Promise<IUser> {
        switch (socialLogin) {
            case 'google':
                return AuthController.loginWithGoogle(credential);
            case 'facebook':
                return AuthController.loginWithFacebook(credential);
        }
    }

    private static async loginWithGoogle(credential: any): Promise<IUser> {
        const authClient = new OAuth2Client();

        const ticket = await authClient.verifyIdToken({
            idToken: credential,
            audience: environment.google.clientId
        });

        const payload = ticket.getPayload();

        return {
            id: payload.sub,
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
            socialLogin: 'google'
        };
    }

    private static async loginWithFacebook(credential: IFacebookCredential): Promise<IUser> {
        return {
            id: credential.id,
            name: credential.name,
            email: credential.email,
            picture: credential.picture.data.url,
            socialLogin: 'facebook'
        };
    }
}
