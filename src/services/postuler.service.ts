import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { OffresModel } from "../app/modeles/OffresModel";
import { PostulerModel } from "../app/modeles/PostulerModel";
import { environment } from "../environments/environment";


@Injectable({
    providedIn: 'root'
  })
  export class postulerservice {
    add : boolean ;
    postuler : PostulerModel ;
    offres : OffresModel ;

    constructor(private http: HttpClient,public router: Router) { }
//methode a'joute 
    Insert(_postuler : PostulerModel)
    {

      return this.postRequest(environment.URL+"/Post/Insertpost",_postuler);
    }
  
//methode de modification
    Update(_postuler : PostulerModel)
    {
      return this.postRequest(environment.URL+"/Post/Updatepost",_postuler);
    }




 //methoe de supprssion

    delete(postuler : PostulerModel)
    {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        Id_Post: postuler.id_Post,
      };
      console.log(options)
      return this.http.delete(environment.URL+"/Post/Deletepost/"+postuler.id_Post,options)
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
