import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des Assignments';

  assignmentSelectionne!: Assignment;
  assignments: Assignment[] = [];

  constructor(private assignmentsService:AssignmentsService) {}

  ngOnInit() {
    console.log("AVANT AFFICHAGE");

    // On va chercher les données avec le service assignmentsService
    this.assignmentsService.getAssignments()
    .subscribe(assignments => {
      this.assignments = assignments;
      console.log("DONNEES ARRIVEES");
    });
    console.log("REQUETE ENVOYEE VIA LE SERVICE")
  }

  getColor(a: any) {
    if (a.rendu) {
      return 'green';
    } else {
      return 'red';
    }
  }

  assignmentClique(a: Assignment) {
    console.log('CLICK : ' + a.nom);
    this.assignmentSelectionne = a;
  }

  /* Cette méthode
   * - est appelée par le fils quand il veut supprimer un élément
   * du tableau situé dans le père */
  onDeleteAssignment(a: Assignment) {
    this.assignmentsService.deleteAssignment(a)
    .subscribe(message => {
      console.log(message);
    });
  }
}
