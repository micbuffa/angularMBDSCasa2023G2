import { Component, EventEmitter, Output } from '@angular/core';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent {
  @Output() nouvelAssignment = new EventEmitter<Assignment>();

  // Champs du formulaire
  nomDevoir = '';
  dateDeRendu!: Date;

  onSubmit() {
    console.log("Formulaire soumis nom = " + this.nomDevoir + " date = " + this.dateDeRendu);
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;

    // on l'ajoute au tableau
    //this.assignments.push(newAssignment);
    this.nouvelAssignment.emit(newAssignment);
  }
}
