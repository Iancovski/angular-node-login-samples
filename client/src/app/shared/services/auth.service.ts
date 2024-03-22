import {IUser} from '../../../../../server/src/models/user.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user: IUser = null;

    constructor(
        private http: HttpClient,
        private router: Router) {
    }

    loginWithGoogle(credential: string) {
        const url = "/api/auth/login";
        const body = {credential};
        const headers = {"X-Social-Login": "google"};

        this.http.post(url, body, {headers}).subscribe({
            next: (user: object) => {
                this.user = user as IUser;
                this.router.navigate([""]);
            }
        });
    }

    loginWithFacebook(credential: string) {
        const url = "/api/auth/login";
        const body = {credential};
        const headers = {"X-Social-Login": "facebook"};

        this.http.post(url, body, {headers}).subscribe({
            next: (user: object) => {
                this.user = user as IUser;
                this.router.navigate([""]);
            }
        });
    }

    logout() {
        const url = "/api/auth/logout";

        this.http.get(url).subscribe({
            next: () => {
                this.user = null;
                this.router.navigate(["login"]);
            }
        });
    }

    authenticate() {
        const url = "/api/auth";

        return this.http.get(url);
    }
}
