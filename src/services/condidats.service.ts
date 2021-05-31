import { Injectable } from "@angular/core";
import { CondidatsModel } from "../app/modeles/CondidatsModel";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../environments/environment";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { CompetanceModel } from "../app/modeles/CompetanceModel";


@Injectable({
    providedIn: 'root'
  })
  export class Condidatservice {
      add : boolean ;
    condidat : CondidatsModel ;
    competance : CompetanceModel;
    constructor(private http: HttpClient,public router: Router) { }
  
    Insert(_condidat : any, file : File)
    {
      let FD = new FormData()
      FD.append("nom_Utilisateur",_condidat.nom_Utilisateur) ;
      FD.append("prenom_Utilisateur",_condidat.prenom_Utilisateur) ;
      FD.append("sexe_Utilisateur",_condidat.sexe_Utilisateur) ;
      FD.append("date_naiss",_condidat.date_naiss) ;
      FD.append("poste_Utilisateur",_condidat.poste_Utilisateur) ;
      FD.append("portable_Utilisateur",_condidat.portable_Utilisateur) ;
      FD.append("myFile",file) ;
      FD.append("id_Role",_condidat.id_Role) ;
      FD.append("email",_condidat.email);
      FD.append("password",_condidat.password);
      FD.append("nom_Enterprise",_condidat.nom_Enterprise);
    
      return this.http.post(environment.URL+"/Condidats/Insertcondidats",FD); 
    }
 //methode d'affichage
    getall()
    {
      
      return this.http.get(environment.URL+"/Condidats/getall")
      
    }
    //methode d'affichage par utilisateur
    getuserid(condidat : any){
    
      return this.http.get(environment.URL+"/Condidats/get_utilisateurbyid/"+condidat)
    }
    //methode qui affiche les role
    getall_Role()
    {
      
      return this.http.get(environment.URL+"/Condidats/getall_Role")
      
    }
    //methode de modification
    Update(_condidat : any, file : File)
    {
      let FD = new FormData()
      FD.append("id_Utilisateur",_condidat.id_Utilisateur) ;
      FD.append("nom_Utilisateur",_condidat.nom_Utilisateur) ;
      FD.append("prenom_Utilisateur",_condidat.prenom_Utilisateur) ;
      FD.append("sexe_Utilisateur",_condidat.sexe_Utilisateur) ;
      FD.append("date_naiss",_condidat.date_naiss) ;
      FD.append("poste_Utilisateur",_condidat.poste_Utilisateur) ;
      FD.append("portable_Utilisateur",_condidat.portable_Utilisateur) ;
      FD.append("myFile",file) ;
      FD.append("id_Role",_condidat.id_Role) ;
      FD.append("email",_condidat.email);
      FD.append("nom_Enterprise",_condidat.nom_Enterprise);
      return this.postRequest(environment.URL+"/Condidats/Updatecondidats",FD); 
    }
  //methode de supression
    delete(condidats : CondidatsModel)
    {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        id_Utilisateur:condidats.id_Utilisateur,
        
      };
      console.log(options)
      return this.http.delete(environment.URL+"/Condidats/Deletecondidats/"+condidats.id_Utilisateur,options)
    }
  
   
 
    condidats: CondidatsModel = new CondidatsModel();
    action(condidat) {
      this.condidats = condidat;
    }
  
    postRequest(url,body)
    {
      let header = new HttpHeaders({
       
        'Accept': 'application/json'
      });
    
      return this.http.post(url, body, { headers: header }).pipe(
        catchError( err => {
             return throwError("Il y a un problème, réessayer de rafraichir ou essayer plus tard.");
        }));
    }
    getdetailss(competance : any){
    
      return this.http.get(environment.URL+"/Competance/get_competance_par_utilisateur/"+competance)
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
  