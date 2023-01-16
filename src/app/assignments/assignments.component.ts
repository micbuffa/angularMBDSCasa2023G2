import { Component } from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent {
  titre = 'Liste des Assignments';
  // Champs du formulaire
  nomDevoir = '';
  dateDeRendu = '';

  assignments = [
    {
      nom:"Devoir Angular de Mr Buffa",
      dateDeRendu:"2023-01-26",
      rendu : false
    },
    {
      nom:"Devoir R de Mr Pasquier",
      dateDeRendu:"2023-02-15",
      rendu : false
    },
    {
      nom:"Devoir Grails de Mr galli",
      dateDeRendu:"2022-12-16",
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

  onSubmit(event:any) {
    console.log(event);
    console.log("Formulaire soumis nom = " + this.nomDevoir);
  }
}
