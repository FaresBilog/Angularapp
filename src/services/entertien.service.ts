import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { EntretiensModel } from "../app/modeles/EntretiensModel";
import { environment } from "../environments/environment";


@Injectable({
    providedIn: 'root'
  })
  export class Entertienservice{
      add : boolean ;
    entertien : EntretiensModel ;
    constructor(private http: HttpClient,public router: Router)
     { }
  //methode d'insertion
    Insert(_entertien : EntretiensModel)
    {
     
   
      return this.postRequest(environment.URL+"/entretien/Insertentretien",_entertien); 
    }
    //methode d'affichage des entertien
    getall()
    {
      
      return this.http.get(environment.URL+"/entretien/getall")
      
    }
    
//methode qui affichez les entretien par utilisateur
    getentertieniduser(entertien:any)
    {
      
      return this.http.get(environment.URL+"/entretien/Getentretienbyiduser/"+entertien)
      
    }
//methode de modification
    Update(_entertien : EntretiensModel)
    {
      return this.postRequest(environment.URL+"/entretien/Updateentretien",_entertien); 
    }
  
 
  
  //methode de suppression
  
    delete(entertien : EntretiensModel)
    {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        Id_Entertien: entertien.id_Entertien,
      };
      console.log(options)
      return this.http.delete(environment.URL+"/entretien/Deleteentretien/"+entertien.id_Entertien,options)
    }
  
  
  
  
  
   
    
    entertiens : EntretiensModel=new EntretiensModel();
    action(entertien) {
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
  