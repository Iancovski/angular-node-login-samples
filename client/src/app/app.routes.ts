import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },    
    {
        path: "",
        component: MainComponent,
        canActivate: [authGuard]
    },
    {
        path: "**",
        redirectTo: ""
    }
];
