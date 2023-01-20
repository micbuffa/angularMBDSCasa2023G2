import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // indique si on est connecté
  loggedIn = false;

  constructor() { }

  // Plus tard, on ajoutera comme paramètres login et password
  // et on pourra par exemple, se connecter sur un web service
  // pour vérifier si les identifiants sont corrects...
  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }

  // Retourne une promesse. Si on devait l'utiliser on ferait
  // isAdmin.then(admin => { console.log(admin) });
  isAdmin() {
    let promesse = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });

    return promesse;
  }
}
