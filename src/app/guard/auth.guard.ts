import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router:Router)
  {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage.getItem('loggedUserdID')) {
        // logged in so return true
        return true;
    }

    else
    {
      // not logged in so redirect to login page with the return url and return false
      this.router.navigateByUrl('/');
    }
    
  
}
  
}
