import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class IsSignedInGuard implements CanActivate {
  // here you can inject your auth service to check that user is signed in or not
  constructor(private router: Router) {}
  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user && user.token) {
      this.router.navigate(['/blog']); // or home
      return false;
    }
    return true;
  }
}
