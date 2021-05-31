import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { OffresModel } from '../app/modeles/OffresModel';
import { environment } from '../environments/environment';
import { PostulerModel } from '../app/modeles/PostulerModel';
import { CondidatsModel } from '../app/modeles/CondidatsModel';



@Injectable({
  providedIn: 'root'
})
export class Offresservice {
    add : boolean ;
  offre : OffresModel ;
  postuler:PostulerModel;
  condidat:CondidatsModel;
  constructor(private http: HttpClient,public router: Router) { }
//methode d'inssertion offre
  Insert(_offre : OffresModel)
  {

    return this.postRequest(environment.URL+"/Offres/Insertoffres",_offre); 
  }
  //methode d'inssertion post
  Insert1(_postuler : PostulerModel)
  {

    return this.postRequest(environment.URL+"/Post/Insertpost",_postuler);
  }
  //methode d'affichage la list des offres
  getall()
  {
    
    return this.http.get(environment.URL+"/Offres/getall")
    
  }
  //methode de modification
  Update(_offre : OffresModel)
  {
    return this.postRequest(environment.URL+"/Offres/Updateoffres",_offre); 
  }

//methode qui retourne la liste des condidats postuler à un offre
  getdetails(ofrre : any){

    return this.http.get(environment.URL+"/Post/get_postbyid/"+ofrre)
  }


  getdetailsoffre(ofrre : any){

    return this.http.get(environment.URL+"/Offres/Get_Utilisateurbyoffre/"+ofrre)
  }
//methode de suppression
  delete(offre : OffresModel)
  {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      Id_Offre: offre.id_Offreess,
    };
    console.log(options)
    return this.http.delete(environment.URL+"/Offres/DeleteOffre/"+offre.id_Offreess,options)
  }





  offres: OffresModel = new OffresModel();
  action(offre) {
    this.offres = offre;
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
