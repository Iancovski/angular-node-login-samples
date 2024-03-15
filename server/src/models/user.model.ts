import {SocialLogin} from '../auth/auth.model';

export interface IUser {
    id: string;
    name: string;
    email: string;
    picture: string;
    socialLogin: SocialLogin;
}
