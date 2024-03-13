import {Component} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {IUser} from '../../../../../server/src/models/user.model';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatInputModule],
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
