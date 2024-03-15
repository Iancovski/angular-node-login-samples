import {Component} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {environment} from '../../../environments/environment';
import {MatCardModule} from '@angular/material/card';
import {GoogleLoginButtonComponent} from './components/google-login-button/google-login-button.component';
import {FacebookLoginButtonComponent} from './components/facebook-login-button/facebook-login-button.component';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        MatCardModule,
        GoogleLoginButtonComponent,
        FacebookLoginButtonComponent
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    clientId = environment.login.google.clientId;
    appId = environment.login.facebook.appId;

    constructor(private authService: AuthService) {
    }

    loginWithGoogle = (credential: any) => {
        console.log(credential);
        this.authService.loginWithGoogle(credential);
    }

    loginWithFacebook = (credential: any) => {
        console.log(credential);
        this.authService.loginWithFacebook(credential);
    }
}
