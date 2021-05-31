import { Component, OnInit, Inject } from '@angular/core';
import { OffresModel } from '../../modeles/OffresModel';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { Offresservice } from '../../../services/offress.service';

@Component({
  selector: 'app-ajoute-offre',
  templateUrl: './ajoute-offre.component.html',
  styleUrls: ['./ajoute-offre.component.css']
})
export class AjouteOffreComponent implements OnInit {
  //declaration
offres = new OffresModel();
id_Offre?:any;
Titre_Offre?: any;
Pays_Offre?: any;
Description_Offre?: any;
Statut_Offre?:any;
Date_Expiration?:any;
titre: string = "Ajouter Offres" ;
medForm:any;
dataSource:any;
constructor(
  private snackBar: MatSnackBar,
  private offreserv: Offresservice,
  private formBuilder: FormBuilder,
  public dialogRef: MatDialogRef<AjouteOffreComponent>,
  @Inject(MAT_DIALOG_DATA) public data: OffresModel) { 
      this.medForm = this.formBuilder.group({
        Titre_Offre: ['', Validators.required],
        Pays_Offre: ['', Validators.required], 
        Description_Offre: ['', Validators.required],
        Statut_Offre: ['', Validators.required],
        Date_Expiration: ['', Validators.required],
  });
}
//fermeture du popup
onNoClick(): void {
  this.dialogRef.close();
}
  ngOnInit() {
    
    if (this.offreserv.offre != null) {
    //modifier un offre 
      this.titre = "Modifier Offres"
      this.Titre_Offre = this.offreserv.offre.titre_Offre;
      this.Pays_Offre = this.offreserv.offre.pays_Offre;
      this.Description_Offre = this.offreserv.offre.description_Offre;
      this.Statut_Offre=this.offreserv.offre.statut_Offre;
      this.Date_Expiration=this.offreserv.offre.date_Expiration;
    }
  }

  //fermeture du popup
  annuler(){
    this.dialogRef.close(true);
  }
  //reinitialiser formulaire
  annulee(){
    this.medForm.reset();
    }
    Insert() {
//ajoute offre
      this.offres.titre_Offre = this.Titre_Offre;
      this.offres.pays_Offre = this.Pays_Offre;
      this.offres.description_Offre = this.Description_Offre;
      this.offres.statut_Offre=this.Statut_Offre;
      this.offres.date_Expiration=this.Date_Expiration;
      if (this.offreserv.offre == null) {
        this.offreserv.Insert(this.offres)
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
        
        this.offres.id_Offreess=this.offreserv.offre.id_Offreess;
        this.offreserv.Update(this.offres)
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
