import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Condidatservice } from '../../../services/condidats.service';
import { CondidatsModel } from '../../modeles/CondidatsModel';

interface Role {
  value: string;
  viewValue: string;
}
interface sexe {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  sexee: sexe[] = [
    {value: 'Homme', viewValue: 'Homme'},
    {value: 'Femme', viewValue: 'Femme'}
   
  ];
  
  condidats = new CondidatsModel();
  Nom?: any;
  Prenom?: any;
  sexe?: any;
  Poste?:any;
  Date?:any;
  Portable?:any;
  cv?:any ;
  Id_Role?:any ;
  inputdoc:any;
  docSelected=false;
  Email:any;
  Password:any;
  medForm:any;
  Nom_Enterprise:any;

Roles: Role[] = [];
  constructor(private router:Router,private formBuilder: FormBuilder,private snackBar: MatSnackBar,private condidatserv: Condidatservice,) { 
    this.medForm = this.formBuilder.group({
      Nom: ['', Validators.required],
        Prenom: ['', Validators.required], 
        sexe: ['', Validators.required],
        Poste: ['', Validators.required],
        Date: ['', Validators.required], 
        Portable: ['', Validators.required],
        cv: ['', Validators.required],
        Id_Role: ['', Validators.required],
      Email: ['', [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      Nom_Enterprise: ['', Validators.required],
      Password: ['', [Validators.required,Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.condidatserv.getall_Role().subscribe((res:any)=>{
      this.Roles=res;
 
    })
  }

 
Insert() {
  
  this.condidats.nom_Utilisateur=this.Nom;
  this.condidats.prenom_Utilisateur=this.Prenom;
  this.condidats.sexe_Utilisateur=this.sexe;

  this.condidats.date_naiss=this.Date;
  
  this.condidats.poste_Utilisateur=this.Poste;
  this.condidats.portable_Utilisateur=this.Portable;
  this.condidats.cv_Utilisateur=this.cv;
  this.condidats.id_Role=this.Id_Role;
  this.condidats.email=this.Email;
  this.condidats.password=this.Password;
  this.condidats.nom_Enterprise=this.Nom_Enterprise;
 
  if (this.condidatserv.condidat == null) {
    //ajouter un utilisateur
    this.condidatserv.Insert(this.condidats,this.cv)
    .subscribe(() => {
        this.snackBar.open("condidats ajouté avec succès", "fermer", {
          duration: 2000,
          panelClass: ['blue-snackbar']
        });
        this.router.navigate(["/login"]);
       
      }, e => {
        this.snackBar.open("Une erreur s'est produite", "fermer", {
          duration: 2000,
          panelClass: ['red-snackbar']
        });
      });
  }
  
}
//uplode du ficher
public uploadFile = (files) => {
  
  this.cv = <File>files[0] ;
}
//reinitialiser le formulaire
annulee(){
  this.medForm.reset();
  }
  //redirection à la page de s'authentifier
connect()
{
  this.router.navigate(["login"]);
}
}