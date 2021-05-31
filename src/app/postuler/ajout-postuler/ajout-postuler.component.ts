import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Offresservice } from '../../../services/offress.service';
import { postulerservice } from '../../../services/postuler.service';
import { PostulerModel } from '../../modeles/PostulerModel';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-ajout-postuler',
  templateUrl: './ajout-postuler.component.html',
  styleUrls: ['./ajout-postuler.component.css']
})
export class AjoutPostulerComponent implements OnInit {

  postes = new PostulerModel();
  private postservice: postulerservice;
 
  private offreservice: Offresservice;
  id_Post?:any;
  Commentaire?: any;
  Id_Offreess?:any;
  Id_Utilisateur?:any;
  action: string = "Ajouter Offres" ;
  medForm:any;
  dataSource:any;
  decoded:any;
  idu:any;
  constructor(
    private snackBar: MatSnackBar,
    private offreserv: Offresservice,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AjoutPostulerComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: PostulerModel) { 
        this.medForm = this.formBuilder.group({
          Commentaire: ['', Validators.required],
          Id_Offreess: ['', Validators.required],
         
    });
  }
  //methode de fermeture popup 
  onNoClick(): void {
    this.dialogRef.close();
  }
    ngOnInit() {
      var  token = localStorage.getItem("token");;
      this.decoded = jwt_decode(token);
      this.idu=this.decoded.nameid;
       
      
      if (this.offreserv.postuler != null) {
       //modification postuler
        this.action = "Modifier Offres"
        
        this.Id_Offreess=this.offreserv.postuler.id_Offreess;
        this.Id_Utilisateur=this.idu;
        this.Commentaire = this.offreserv.postuler.commentaire;
      
      }
    }
    annuler(){
      this.dialogRef.close(true);
    }
//reinitialiser le formulaire
    annulee(){
      this.medForm.reset();
      }
      Insert1() { 
        //ajouter offre postuler
         this.postes.id_Offreess=this.offreserv.offres.id_Offreess.id_Offreess;
         this.postes.id_Utilisateur=+this.idu;
         this.postes.commentaire = this.Commentaire;
      
        if (this.offreserv.postuler == null) {
          this.offreserv.Insert1(this.postes)
          .subscribe(() => {
              this.snackBar.open("Offres ajouté avec succès", "fermer", {
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
          
          this.postes.id_Offreess=this.offreserv.postuler.id_Post;
          this.offreserv.Update(this.postes)
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
  