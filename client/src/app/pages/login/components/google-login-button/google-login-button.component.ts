import {Directive, ElementRef, Input, NgZone, OnInit} from '@angular/core';

@Directive({
    selector: 'google-login-button',
    standalone: true
})
export class GoogleLoginButtonComponent implements OnInit {
    @Input()
    clientId: string = '';

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
    locale: string = '';

    @Input()
    displayOneTapDialog: boolean = true;

    @Input()
    callback: (credential: any) => void;

    constructor(private el: ElementRef, private ngZone: NgZone) {
    }

    ngOnInit(): void {
        if (!this.clientId) {
            throw new Error('Google ClientId not provided.');
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

        if (this.width && (this.width < 200 || this.width > 400)) {
            throw new Error('Invalid button width. Valid width: min 200 and max 400.')
        }

        this.loadGsiClient();
    }

    loadGsiClient() {
        let script = document.createElement('script');

        script.async = true;
        script.src = 'https://accounts.google.com/gsi/client';
        script.onload = this.initialize;

        document.head.appendChild(script);
    }

    initialize = () => {
        // @ts-ignore
        window.google.accounts.id.initialize({
            client_id: this.clientId,
            callback: this.handleCredentialResponse
        });

        // @ts-ignore
        window.google.accounts.id.renderButton(
            this.el.nativeElement,
            {
                locale: this.locale,
                logo_alignment: this.logo_alignment,
                shape: this.shape,
                size: this.size,
                text: this.text,
                theme: this.theme,
                type: this.type,
                width: this.width
            }
        );

        if (this.displayOneTapDialog) {
            // @ts-ignore
            window.google.accounts.id.prompt();
        }
    }

    handleCredentialResponse = (user: any) => {
        this.ngZone.run(() => {
            this.callback(user.credential);
        });
    }
}
