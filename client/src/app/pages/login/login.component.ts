import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {
  constructor(
    private ngZone: NgZone,
    private authService: AuthService) {}

  ngAfterViewInit(): void {
      // Initialize the Google client library
      // @ts-ignore
      window.google.accounts.id.initialize({
        client_id: environment.google.clientId,
        callback: this.handleCredentialResponse
      });
      // Render the button element
      // @ts-ignore
      window.google.accounts.id.renderButton(
        document.getElementById("login-with-google"),
        { 
          type: "standard",
          shape: "pill",
          theme: "filled_blue",
          text: "signin_with",
          size: "medium"
        }
      );
      // Display the One Tap dialog
      // @ts-ignore
      window.google.accounts.id.prompt();
  }

  handleCredentialResponse = (user: any) => {
    this.ngZone.run(() => {
      this.authService.login(user.credential);
    })
  }
}
