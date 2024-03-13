import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {tap} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.authenticate().pipe(
        tap((response: any) => {
            if (!response) {
                router.navigate(["login"]);
                return false;
            }

            authService.user = response;
            return true;
        })
    );
};
