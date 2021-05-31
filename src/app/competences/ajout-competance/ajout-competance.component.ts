import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Competanceservice } from '../../../services/competance.service';
import { CompetanceModel } from '../../modeles/CompetanceModel';

interface utilisateur {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-ajout-competance',
  templateUrl: './ajout-competance.component.html',
  styleUrls: ['./ajout-competance.component.css']
})
export class AjoutCompetanceComponent implements OnInit {

  Competances = new CompetanceModel();
//déclaration
  id_Competance  ?:any;
   Libelle_Competance  ?:any;
   Description_Competance  ?:any;
   Id_Utilisateur  ?:any;

  titre: string = "Ajouter compétence" ;
medForm:any;
dataSource:any;

utilisateurs: utilisateur[] = [];

constructor(
  
  private snackBar: MatSnackBar,
  private competanceserv: Competanceservice,
 
  private formBuilder: FormBuilder,
  public dialogRef: MatDialogRef<AjoutCompetanceComponent>,
  @Inject(MAT_DIALOG_DATA) public data: CompetanceModel) { 
      this.medForm = this.formBuilder.group({
        Libelle_Competance: ['', Validators.required],
        Description_Competance: ['', Validators.required], 
      
        Id_Utilisateur: ['', Validators.required],
   
  });
}
//founction pour fermer le popup
onNoClick(): void {
  this.dialogRef.close();
}
  ngOnInit() {

   
  //modifier compétence
    if (this.competanceserv.competance != null) {
     
      this.titre = "Modifier compétence"
      this.Libelle_Competance = this.competanceserv.competance.libelle_Competance;
      this.Description_Competance = this.competanceserv.competance.description_Competance;
      
      this.Id_Utilisateur=this.competanceserv.competance.id_Utilisateur;
      
    }
  }
  //reinitialiser les champs
  annuler(){
    this.dialogRef.close(true);
  }

  annulee(){
    this.medForm.reset();
    }
    //ajouter competance
    Insert() {
    
        this.Competances.libelle_Competance=this.Libelle_Competance;
       this.Competances.description_Competance= this.Description_Competance;
      this.Competances.id_Utilisateur=this.competanceserv.condidat.id_Utilisateur;
       
      
       
      if (this.competanceserv.competance == null) {
        this.competanceserv.Insert(this.Competances)
        .subscribe(() => {
            this.snackBar.open("Competance ajouté avec succès", "fermer", {
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
       
        this.Competances.id_Competance=this.competanceserv.competance.id_Competance;
        this.competanceserv.Update(this.Competances)
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
