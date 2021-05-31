import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Entertienservice } from '../../../services/entertien.service';
import { Offresservice } from '../../../services/offress.service';
import { Condidatservice } from '../../../services/condidats.service';
import { EntretiensModel } from '../../modeles/EntretiensModel';
import { Competanceservice } from '../../../services/competance.service';
interface offre {
  value: string;
  viewValue: string;
}
interface utilisateur {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-ajoute-entertien',
  templateUrl: './ajoute-entertien.component.html',
  styleUrls: ['./ajoute-entertien.component.css']
})
export class AjouteEntertienComponent implements OnInit {
//declaration
  Entertiens = new EntretiensModel();

id_Entertien ?:any;
Nom_Entertien ?:any;
 Date_Entertien ?:any;
 Id_Offreess ?:any;
 Id_Utilisateur ?:any;
  Nom_Utilisateur ?:any;
   Titre_Offre ?:any;
    Descision_Entretien ?:any;
    titre: string = "Ajouter entertien" ;
medForm:any;
dataSource:any;
offres: offre[] = [];
utilisateurs: utilisateur[] = [];

constructor(
  private snackBar: MatSnackBar,
  private entertienserv: Entertienservice,
  private Offresservice:Offresservice,
  private condidatserv: Condidatservice,
  private formBuilder: FormBuilder,
  private offreservice: Offresservice,
  private Competanceservice:Competanceservice,
  public dialogRef: MatDialogRef<AjouteEntertienComponent>,
  @Inject(MAT_DIALOG_DATA) public data: EntretiensModel) { 
      this.medForm = this.formBuilder.group({
        Nom_Entertien: ['', Validators.required],
        Date_Entertien: ['', Validators.required], 
        Descision_Entretien: ['', Validators.required],
        Id_Utilisateur: ['', Validators.required],
        Id_Offreess: ['', Validators.required],
  });
}
//methode de fermeture popup
onNoClick(): void {
  this.dialogRef.close();
}
  ngOnInit() {

    this.Offresservice.getall().subscribe((res:any)=>{
      this.offres=res;
      
    })

    this.condidatserv.getall().subscribe((res:any)=>{
      this.utilisateurs=res;
     
    })

     
    if (this.entertienserv.entertien != null) {
     //modifier entertien
      this.titre = "Modifier entertien"
      this.Nom_Entertien = this.entertienserv.entertien.nom_Entertien;
      this.Date_Entertien = this.entertienserv.entertien.date_Entertien;
      this.Descision_Entretien=this.entertienserv.entertien.descision_Entretien;
      this.Id_Utilisateur=this.entertienserv.entertien.id_Utilisateur;
      this.Id_Offreess=this.entertienserv.entertien.id_Offreess;
    }
  }
  //methode de fermeture popup
  annuler(){
    this.dialogRef.close(true);
  }
  //reinitialiser le formulaire
  annulee(){
    this.medForm.reset();
    }
//ajouter enteriten
    Insert() {

        this.Entertiens.nom_Entertien=this.Nom_Entertien;
        this.Entertiens.date_Entertien= this.Date_Entertien;
        this.Entertiens.descision_Entretien=this.Descision_Entretien;
        
       this.Entertiens.id_Utilisateur=this.Competanceservice.condidat.id_Utilisateur;
       this.Entertiens.id_Offreess= this.offreservice.offre.id_Offreess;
     
      if (this.entertienserv.entertien == null) {
        this.entertienserv.Insert(this.Entertiens)
        .subscribe(() => {
            this.snackBar.open("Entretien ajouté avec succès", "fermer", {
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
        
        this.Entertiens.id_Entertien=this.entertienserv.entertien.id_Entertien;
        this.entertienserv.Update(this.Entertiens)
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
