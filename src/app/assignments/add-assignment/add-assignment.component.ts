import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent {

  // Champs du formulaire
  nomDevoir = '';
  dateDeRendu!: Date;

  constructor(private assignmentsService:AssignmentsService,
              private router:Router) {}

  onSubmit() {
    console.log("Formulaire soumis nom = " + this.nomDevoir + " date = " + this.dateDeRendu);
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;

    // on ajoute l'assignment dans la base de données
    this.assignmentsService.addAssignment(newAssignment)
    .subscribe(message => {
      console.log(message);
      // et on navigue vers la page d'accueil pour afficher
      // la liste des assignments à jour, avec le nouveau
      // assignment ajouté
      this.router.navigate(['/home']);
    });

  }
}
