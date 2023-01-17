import { Component } from '@angular/core';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent {
  titre = 'Liste des Assignments';
  formVisible=false;

  assignmentSelectionne!:Assignment;

  assignments:Assignment[] = [
    {
      nom:"Devoir Angular de Mr Buffa",
      dateDeRendu: new Date("2023-01-26"),
      rendu : false
    },
    {
      nom:"Devoir R de Mr Pasquier",
      dateDeRendu: new Date("2023-02-15"),
      rendu : false
    },
    {
      nom:"Devoir Grails de Mr galli",
      dateDeRendu: new Date("2022-12-16"),
      rendu : true
    }
  ];

  getColor(a:any) {
    if (a.rendu) {
      return 'green';
    } else {
      return 'red';
    }
  }

  assignmentClique(a:Assignment) {
    console.log("CLICK : " + a.nom);
    this.assignmentSelectionne = a;
  }

  onAddAssignment(a:Assignment) {
    // on ajoute l'assignment envoyé par le fils au tableau
    this.assignments.push(a);

    // on cache le formulaire et on affiche la liste
    this.formVisible = false;
  }
}
