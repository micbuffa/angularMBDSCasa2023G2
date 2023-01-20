import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment-app';

  constructor(private authService:AuthService,
              private router:Router,
              private assignmentsService:AssignmentsService) {}

  login() {
    if(!this.authService.loggedIn) {
      this.authService.logIn();
    } else {
      this.authService.logOut();
      // et on revient à la page d'accueil
      this.router.navigate(['/home']);
    }
  }

  genereTestData() {
    this.assignmentsService.peuplerBDavecForkJoin()
    .subscribe(() => {
      console.log("Données de tests insérées dans BD, opération terminée");
      // et on revient vers la page d'accueil qui affiche la liste des assignments
      // à jour
      this.router.navigate(['/home']);
    });
  }
}
