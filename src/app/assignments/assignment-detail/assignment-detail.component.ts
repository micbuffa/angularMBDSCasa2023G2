import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent {
  @Input() assignmentTransmis?: Assignment;
  @Output() delAssignment = new EventEmitter<Assignment>();

  constructor(private assignmentsService:AssignmentsService) {}

  deleteElem() {
    this.delAssignment.emit(this.assignmentTransmis);
    // pour cacher le détail, on remet assignmentTransmis à undefined
    this.assignmentTransmis = undefined;
  }

  onAssignmentRendu() {
    if(!this.assignmentTransmis) return;

    this.assignmentTransmis.rendu = true;

    // on appelle le service pour mettre à jour l'assignment
    // dans la base de données...
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
    .subscribe(message => {
      console.log(message);
    });
  }
}
