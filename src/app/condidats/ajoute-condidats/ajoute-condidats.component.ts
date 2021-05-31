import { Component, OnInit, Inject } from '@angular/core';
import { CondidatsModel } from '../../modeles/CondidatsModel';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { Condidatservice } from '../../../services/condidats.service';

interface Role {
  value: string;
  viewValue: string;
}
interface sexe {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-ajoute-condidats',
  templateUrl: './ajoute-condidats.component.html',
  styleUrls: ['./ajoute-condidats.component.css']
})
export class AjouteCondidatsComponent implements OnInit {
  //declaration
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
  Email:any;
  Nom_Enterprise:any;
  docSelected=false;
  titre: string = "Ajouter condidat" ;
medForm:any;
Roles: Role[] = [];

constructor(

  private snackBar: MatSnackBar,
  private condidatserv: Condidatservice,
  private formBuilder: FormBuilder,
  public dialogRef: MatDialogRef<AjouteCondidatsComponent>,
  @Inject(MAT_DIALOG_DATA) public data: CondidatsModel) { 
      this.medForm = this.formBuilder.group({
        Nom: ['', Validators.required],
        Prenom: ['', Validators.required], 
        sexe: ['', Validators.required],
        Poste: ['', Validators.required],
        Date: ['', Validators.required], 
        Portable: ['', Validators.required],
        cv: ['', Validators.required],
        Id_Role: ['', Validators.required],
        Email: ['', Validators.required],
        Nom_Enterprise: ['', Validators.required],
        
  });
}
//methode fermeture popup
onNoClick(): void {
  this.dialogRef.close();
}
  ngOnInit() {
    //methode afficher les utilisateurs
    this.condidatserv.getall_Role().subscribe((res:any)=>{
      this.Roles=res;
    
    })
    
    if (this.condidatserv.condidat != null) {
     //modifer un utilisateur
      this.titre = "Modifier candidat"
      
      this.Nom = this.condidatserv.condidat.nom_Utilisateur;
      this.Prenom = this.condidatserv.condidat.prenom_Utilisateur;
      this.sexe = this.condidatserv.condidat.sexe_Utilisateur;
      this.Poste = this.condidatserv.condidat.poste_Utilisateur;
      this.Date=this.condidatserv.condidat.date_naiss;
      this.Portable=this.condidatserv.condidat.portable_Utilisateur;
      this.cv=this.condidatserv.condidat.cv_Utilisateur;
      this.Id_Role=this.condidatserv.condidat.id_Role;
      this.Nom_Enterprise=this.condidatserv.condidat.nom_Enterprise;
      this.Email=this.condidatserv.condidat.email;
    }
  
  }



//methode pour uplode des ficher
  public uploadFile = (files) => {
  
    this.cv = <File>files[0] ;
  }
  
 //methode de fermeture popup
  annuler(){
    this.dialogRef.close(true);
  }
  //reinitialiser le formulaire
  annulee(){
    this.medForm.reset();
    }
    //insertion utilisateur
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
      this.condidats.nom_Enterprise=this.Nom_Enterprise;
      
      if (this.condidatserv.condidat == null) {
        this.condidatserv.Insert(this.condidats,this.cv)
        .subscribe(() => {
            this.snackBar.open("condidats ajouté avec succès", "fermer", {
              duration: 2000,
              panelClass: ['blue-snackbar']
            });
            this.dialogRef.close();
           
          }, e => {
            this.snackBar.open("Une erreur s'est produite", "fermer", {
              duration: 2000,
              panelClass: ['red-snackbar']
            });
          });
      }
      else {
       
        this.condidats.id_Utilisateur=this.condidatserv.condidat.id_Utilisateur;
        this.condidatserv.Update(this.condidats,this.cv)
          .subscribe(() => {
            this.snackBar.open("Modification effectuée avec succès", "fermer", {
              duration: 2000,
              panelClass: ['blue-snackbar']
            });
            this.dialogRef.close();
           
          }, e => {
            this.snackBar.open("Une erreur s'est produite", "fermer", {
              duration: 2000,
              panelClass: ['red-snackbar']
            });
          });
      }
}
}
