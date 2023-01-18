import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?: Assignment;

  constructor(private assignmentsService:AssignmentsService,
              private activatedRoute:ActivatedRoute,
              private router:Router) {}

  ngOnInit() {
    // On récupère l'id dans l'URL, à l'aide de l'objet activatedRoute
    // injecté. Le '+' devant this.activatedRoute.snapshot.params['id']
    // permet de convertir la chaîne de caractères en nombre
    const id = +this.activatedRoute.snapshot.params['id'];
    console.log("id = " + id);

    // Juste pour comprendre... si on veut récupérer les "queryParams",
    // c'est-à-dire les paramètres de l'URL après le '?', on peut faire
    // comme ceci :
    const queryParams = this.activatedRoute.snapshot.queryParams;
    console.log(queryParams);
    //const nom = queryParams['nom'];
    //console.log("Nom = " + nom);
    console.log(this.activatedRoute.snapshot.fragment);


    // On va chercher les données avec le service assignmentsService
    // en fonction de l'id
    this.assignmentsService.getAssignment(id)
    .subscribe(assignment => {
      this.assignmentTransmis = assignment;
    });
  }

  deleteElem() {
    this.assignmentsService.deleteAssignment(this.assignmentTransmis!)
    .subscribe(message => {
      console.log(message);
      // et on retourne à la page d'accueil
      this.router.navigate(['/home']);
    });

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
      // et on retourne à la page d'accueil
      this.router.navigate(['/home']);
    });
  }
}
