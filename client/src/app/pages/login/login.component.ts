import { AfterViewInit, Component, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { environment } from '../../../environments/environment';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule],
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
          type: "standard",    // standard / icon
          shape: "pill",       // for type standard: rectangle / pill - for type icon: square / circle
          theme: "outline",    // outline / filled_blue / filled_black
          text: "signin_with", // signin_with / signup_with / continue_with / signin
          size: "medium"       // large / medium / small
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
