import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { authModel } from "../app/modeles/authModel";
import { CondidatsModel } from "../app/modeles/CondidatsModel";

import { environment } from "../environments/environment";
import jwt_decode from "jwt-decode";
@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    user:CondidatsModel;
    decoded:any;
    constructor(private http: HttpClient,public jwtHelper: JwtHelperService) {
     }
    public isAuthenticated(): boolean {
      const token = localStorage.getItem("token");
      return !this.jwtHelper.isTokenExpired(token);
    }
    //methode authentifier
    authentification(Email: String, Password: String): Observable<any> {
    
      let auth=new authModel();
      auth.Password=Password;auth.Email=Email
      return this.http.post(environment.URL+"/Authentification/Login",auth);
     
    }
    //methode qui retourne le role d'utilisateur connecté
    isinrole(test:string){
      var  token = localStorage.getItem("token");;
      
       this.decoded = jwt_decode(token);
        if(test==this.decoded.role){
          return true
        }
        else{
          return false
        }
    }

   
  }
  