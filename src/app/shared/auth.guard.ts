import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService,
              private router:Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // si cette méthode renvoie true alors
      // on peut accéder à la route
      return this.authService.isAdmin()
      .then((admin) => {
        if (admin) {
          console.log("NAVIGATION AUTORISEE, vous êtes admin");
          return true;
        } else {
          console.log("NAVIGATION REFUSEE, il faut être admin");
          // on pourrait redirigiger vers une page de connexion, etc.
          // pour le moment on redirige vers la page d'accueil
          this.router.navigate(['/home']);
          return false;
        }
      });
  }

}
