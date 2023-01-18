import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  /* Cette méthode affiche dans la console un message
    * indiquant que l'assignment a été créé, supprimé, modifié etc.
  */
  log(assignmentName:string, action:string) {
    console.log(`LOGGING SERVICE : Assignment ${assignmentName} a été ${action}`);
  }
}
