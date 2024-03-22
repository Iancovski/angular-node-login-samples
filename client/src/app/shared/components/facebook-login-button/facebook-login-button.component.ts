import {Component, Input, NgZone, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ScriptService} from "../../services/script.service";

@Component({
    selector: 'facebook-login-button',
    standalone: true,
    imports: [
        NgOptimizedImage
    ],
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
    text: 'signin_with' | 'signup_with' | 'continue_with' = 'signin_with';

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

    constructor(
        private ngZone: NgZone,
        private scriptService: ScriptService) {
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

        this.scriptService.execute(
            `https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v19.0&appId=${this.appId}`,
            {
                id: "facebookSdk",
                async: true
            }
        );
    }

    login() {
        // @ts-ignore
        FB.login((response) => {
            if (response.authResponse) {
                // @ts-ignore
                FB.api('/me', {fields: 'name, email, picture'}, (response) => {
                    this.ngZone.run(() => {
                        this.callback(response);
                    });
                });
            }
        }, {scope: 'email'});
    }

    getClass() {
        let classes =
            `button ${this.type} ${this.type}_${this.size} ${this.shape} ${this.theme} ${this.logo_alignment} `;

        if (this.type === "standard" && this.width) {
            classes += `w-[${this.width}px]`;
        }

        return classes;
    }

    getLogoClass() {
        return `logo_${this.shape}_${this.size}`
    }

    getLogoSize(): number {
        switch (this.size) {
            case "small":
                return 10;
            case "medium":
                return 14;
            case "large":
                return 18;
        }
    }

    getText(): string {
        switch (this.text) {
            case "continue_with":
                return "Continue with Facebook"
            case "signin_with":
                return "Sign in with Facebook"
            case "signup_with":
                return "Sign up with Facebook"
        }
    }
}
