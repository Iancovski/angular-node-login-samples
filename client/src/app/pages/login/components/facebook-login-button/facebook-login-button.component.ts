import {Component, Input, NgZone, OnInit} from '@angular/core';

@Component({
    selector: 'facebook-login-button',
    standalone: true,
    imports: [],
    templateUrl: './facebook-login-button.component.html',
    styleUrl: './facebook-login-button.component.scss'
})
export class FacebookLoginButtonComponent implements OnInit {
    @Input()
    appId: string = '';

    @Input()
    type: 'standard' | 'icon' = 'standard';

    @Input()
    size: 'small' | 'medium' | 'large' = 'medium';

    @Input()
    text: string = '';

    @Input()
    shape: 'square' | 'circle' | 'pill' | 'rectangular' = 'rectangular';

    @Input()
    theme: 'outline' | 'filled_blue' | 'filled_black' = 'outline';

    @Input()
    logo_alignment: 'left' | 'center' = 'left';

    @Input()
    width: number = 0;

    @Input()
    callback: (credential: any) => void;

    constructor(private ngZone: NgZone) {
    }

    ngOnInit(): void {
        if (!this.appId) {
            throw new Error('Facebook AppId not provided.');
        }

        if (!this.callback) {
            throw new Error('Callback function not provided.');
        }

        if (this.type === 'standard' && ['square', 'circle'].includes(this.shape)) {
            throw new Error('Invalid shape for standard type button. Valid shapes: rectangular, pill.');
        }

        if (this.type === 'icon' && ['rectangular', 'pill'].includes(this.shape)) {
            throw new Error('Invalid shape for icon type button. Valid shapes: square, circle.');
        }

        this.loadFacebookSdk();
    }

    loadFacebookSdk() {
        let script = document.createElement('script');

        script.async = true;
        script.src = `https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v19.0&appId=${this.appId}`;
        script.crossOrigin = 'anonymous';
        script.nonce = 'KAEY5OfB';

        document.head.appendChild(script);
    }

    login() {
        // @ts-ignore
        FB.login((response) => {
            if (response.authResponse) {
                // @ts-ignore
                FB.api('/me', {fields: 'name, email, picture'}, (response) => {
                    this.callback(response);
                });
            }
        }, {scope: 'email'});
    }

    getClass() {
        return `${this.type} ${this.type}_${this.size} ${this.shape} ${this.theme} ${this.logo_alignment}`;
    }

    getLogoClass() {
        return `logo_${this.shape}_${this.size}`
    }
}
