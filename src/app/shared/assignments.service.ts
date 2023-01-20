import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';

import { bdInitialAssignments } from './data';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  assignments: Assignment[] = [];

  constructor(private loggingService:LoggingService,
              private http:HttpClient) {}

  URI="http://localhost:8010/api/assignments";
  //URI="https://backmbds2023g2.herokuapp.com/api/assignments";

  /* Cette méthode requête le serveur backend et renvoie un
     tableau d'assignments Observable */
  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.URI);
  }

  getAssignmentsAvecPagination(page:number, limit:number): Observable<any> {
    return this.http.get<any>(this.URI + "?page=" + page + "&limit=" + limit);
  }

  getAssignment(id:number):Observable<Assignment|undefined> {
    return this.http.get<Assignment>(this.URI + "/" + id);
  }

  /* Cette méthode ajoute un assignment au tableau
      et retourne un Observable qui contient une string
      qui indique que tout s'est bien passé */
  addAssignment(a: Assignment):Observable<any> {
    // on génére un id aléatoire pour l'assignment
    a.id = Math.floor(Math.random() * 100000000000000000);

    this.loggingService.log(a.nom, "ajouté");

    return this.http.post(this.URI, a);
  }

  updateAssignment(a: Assignment):Observable<any> {
    this.loggingService.log(a.nom, "modifié");

    return this.http.put(this.URI, a);
  }

  deleteAssignment(a:Assignment):Observable<any> {
    this.loggingService.log(a.nom, "supprimé");

    return this.http.delete(this.URI + "/" + a._id);
  }

  peuplerBD() {
    bdInitialAssignments.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      this.addAssignment(nouvelAssignment)
      .subscribe(() => {
        console.log("Assignment ajouté par peuplerBD");
      })
    });
  }

  peuplerBDavecForkJoin():Observable<any> {
    let appelsVersAddAssignment:Observable<any>[] = [];

    bdInitialAssignments.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment))
    });

    return forkJoin(appelsVersAddAssignment);
  }
}

