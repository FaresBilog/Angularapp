import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { StagiairesModel } from '../app/modeles/StagiairesModel';



@Injectable({
  providedIn: 'root'
})
export class Stagiairesservice {
    add : boolean ;
  stagiaires : StagiairesModel=null ;
  constructor(private http: HttpClient,public router: Router) { }

  Insert(_stag : StagiairesModel)
  {
   
    console.log(_stag);
    return this.postRequest(environment.URL+"/Stagiaire/Insertstagiaire",_stag); 
  }
  getall()
  {
    
    return this.http.get(environment.URL+"/Stagiaire/getall")
    
  }
  
  Update(_stag : StagiairesModel)
  {
    return this.postRequest(environment.URL+"/Stagiaire/Updatestagiaire",_stag); 
  }





  delete(stagier : StagiairesModel)
  {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      id_stagiare: stagier.id_stagiare,
    };
    console.log(options)
    return this.http.delete(environment.URL+"/Stagiaire/Deletestagiaire/"+stagier.id_stagiare,options)
  }





  CountPage(Text:string,textIsNull:any)
  {
    return this.http.get(environment.URL+"");
  }
  stagiaire: StagiairesModel = new StagiairesModel();
  action(stag) {
    this.stagiaire = stag;
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
