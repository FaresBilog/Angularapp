import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/Auth.service';
import { User } from '../../modeles/User';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nom:string;
  password:string;
  loginForm: any;
  constructor(private router:Router,private authService:AuthService,private formBuilder: FormBuilder, private snackBar: MatSnackBar) { 
    this.loginForm = this.formBuilder.group({
      cnom: ['', Validators.required],
      cpassword: ['', Validators.required],
    });
  }

  ngOnInit() {
    
  }
  //authentification
  login(){
    this.authService.authentification(this.nom,this.password).subscribe((res:User)=>
      {
        
        this.authService.user=res;
        localStorage.setItem("token", res.token);
        this.router.navigate(["/Offres"]);
      },
      e => {
        this.snackBar.open("Une erreur s'est produite", "fermer", {
          duration: 2000,
          panelClass: ['red-snackbar']
        });
      });
      
  }
  //navigation à la page enregisterement
  register()
  {
    this.router.navigate(["Registerr"]);
  }
}
