import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { CompetanceModel } from "../app/modeles/CompetanceModel";
import { CondidatsModel } from "../app/modeles/CondidatsModel";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class Competanceservice{
      add : boolean ;
    competance : CompetanceModel ;
    condidat:CondidatsModel;

    constructor(private http: HttpClient,public router: Router) { }
//methode d'ajout
    Insert(_competance : CompetanceModel)
    {
      return this.postRequest(environment.URL+"/Competance/InsertCompetance",_competance);
    }
   
//methode de modification
    Update(_competance : CompetanceModel)
    {
      return this.postRequest(environment.URL+"/Competance/UpdateCompetance",_competance);
    }



//methode d'affichage 
  getdetails(competance : any)
  {
    return this.http.get(environment.URL+"/Competance/get_competance_par_utilisateur/"+competance)
  }
//methode se suppression
    delete(competance : CompetanceModel)
    {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        Id_Competance: competance.id_Competance,
      };
      console.log(options)
      return this.http.delete(environment.URL+"/Competance/Deletecompetance/"+competance.id_Competance,options)
    }






    entertiens : CompetanceModel=new CompetanceModel();
    action(entertien) 
    {
      this.entertiens = entertien;
    }

    postRequest(url,body)
    {
      let header = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      });

      return this.http.post(url, body, { headers: header }).pipe(
        catchError( err => {
             return throwError("Il y a un problème, réessayer de rafraichir ou essayer plus tard.");
        }));
    }

    getRequest(url)
    {
      let header = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      });

      return this.http.get(url, { headers: header }).pipe(
        catchError( err => {
             return throwError("Il y a un problème, réessayer de rafraichir ou essayer plus tard.");
        }));
    }


  }
