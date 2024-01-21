import 'express-session';
import { IUser } from '../models/user.model';

declare module 'express-session' {
    interface Session {
        user?: IUser
    }
}
