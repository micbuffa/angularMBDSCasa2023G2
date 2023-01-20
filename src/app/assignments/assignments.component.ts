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
  assignments: Assignment[] = [];
  // Pour la data tabe
  displayedColumns: string[] = ['nom', 'dateDeRendu', 'rendu'];

  // Pour la pagination
  page = 1;
  limit = 10;
  totalPages = 0;
  hasPrevPage = false;
  hasNextPage = false;
  prevPage= false;
  nextPage =false;
  totalDocs=0;

  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit() {
    console.log('AVANT AFFICHAGE');

    // On va chercher les données avec le service assignmentsService
    /*
    this.assignmentsService.getAssignments()
    .subscribe(assignments => {
      this.assignments = assignments;
      console.log("DONNEES ARRIVEES");
    });
    console.log("REQUETE ENVOYEE VIA LE SERVICE")
    */

    // VERSION AVEC PAGINATION
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentsService
      .getAssignmentsAvecPagination(this.page, this.limit)
      .subscribe((data) => {
        this.assignments = data.docs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.totalDocs = data.totalDocs;

        console.log('DONNEES ARRIVEES');
      });
  }

  pageSuivante() {
    this.page++;
    this.getAssignments();
  }

  pagePrecedente() {
    this.page--;
    this.getAssignments();
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  dernierePage() {
    this.page=this.totalPages;
    this.getAssignments();
  }

  processPaginator(event:any) {
    console.log(event);
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;

    this.getAssignments();
  }
}
