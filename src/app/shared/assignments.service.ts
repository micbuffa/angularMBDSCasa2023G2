import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  assignments: Assignment[] = [
    {
      nom: 'Devoir Angular de Mr Buffa',
      dateDeRendu: new Date('2023-01-26'),
      rendu: false,
    },
    {
      nom: 'Devoir R de Mr Pasquier',
      dateDeRendu: new Date('2023-02-15'),
      rendu: false,
    },
    {
      nom: 'Devoir Grails de Mr galli',
      dateDeRendu: new Date('2022-12-16'),
      rendu: true,
    },
  ];
  constructor(private loggingService:LoggingService) {}

  /* Cette méthode retourne un Observable qui contient
     un tableau d'assignments Observable<Assignment[]>
    On devra le consommer avec un subscribe() */
  getAssignments(): Observable<Assignment[]> {
    return of(this.assignments);
  }

  /* Cette méthode ajoute un assignment au tableau
      et retourne un Observable qui contient une string
      qui indique que tout s'est bien passé */
  addAssignment(a: Assignment):Observable<string> {
    this.assignments.push(a);
    this.loggingService.log(a.nom, "ajouté");

    return of("Assignment ajouté");
  }

  updateAssignment(a: Assignment):Observable<string> {
    // Pour le moment on n'a pas vraiment fait de modifications
    // on a juste mis rendu=true sur une référence à un
    // objet du tableau...

    // Plus tard on enverra une requête AJAX PUT vers un web service
    this.loggingService.log(a.nom, "modifié");

    return of("Assignment modifié");
  }

  deleteAssignment(a:Assignment):Observable<string> {
    // on supprime l'assignment envoyé par le fils dans le tableau
    this.assignments.splice(this.assignments.indexOf(a), 1);
    this.loggingService.log(a.nom, "supprimé");

    return of("Assignment supprimé");
  }
}
