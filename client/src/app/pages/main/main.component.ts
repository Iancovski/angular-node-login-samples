import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { IUser } from '../../../../../server/src/models/user.model';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  user: IUser;

  constructor(private authService: AuthService) {
    this.user = authService.user;
  }

  public logout() {
    this.authService.logout();
  }
}
