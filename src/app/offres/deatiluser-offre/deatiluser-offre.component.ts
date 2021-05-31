import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource ,MatDialogRef} from '@angular/material';
import { AuthService } from '../../../services/Auth.service';
import { Competanceservice } from '../../../services/competance.service';
import { Condidatservice } from '../../../services/condidats.service';

import { Offresservice } from '../../../services/offress.service';
import { DetailsComponent } from '../../competences/details/details.component';
import { DialogComponent, DialogModel } from '../../dialog/dialog.component';
import { CondidatsModel } from '../../modeles/CondidatsModel';
import { offreuserModel } from '../../modeles/offreuserModel';

import {saveAs} from 'file-saver'
import { AjouteEntertienComponent } from '../../entretiens/ajoute-entertien/ajoute-entertien.component';
@Component({
  selector: 'app-deatiluser-offre',
  templateUrl: './deatiluser-offre.component.html',
  styleUrls: ['./deatiluser-offre.component.css']
})
export class DeatiluserOffreComponent implements OnInit {
  displayedColumns: string[] = ['Nom_Utilisateur','Prenom_Utilisateur','Sexe_Utilisateur','Poste_Utilisateur','Libille_Role','Portable_Utilisateur','Date_naiss','Commentaire','Cv_Utilisateur','Action'];
  dataSource:any;
  idoff:any;
decoded:any;
nbrpage : any ;
offres:CondidatsModel[];
selectedDoc:CondidatsModel=new CondidatsModel();
private snackBar: MatSnackBar;

idu:any;
testrole:any;
  constructor( public dialog: MatDialog,
    private offreservice: Offresservice,
    private condidatservice: Condidatservice,
    private auth:AuthService,
    private competanceserv: Competanceservice,
    public dialogRef: MatDialogRef<DeatiluserOffreComponent>,
    ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
 
      this.offreservice.getdetailsoffre(this.offreservice.offre.id_Offreess).subscribe((data:any)=>
        {

          this.dataSource= new MatTableDataSource<offreuserModel>(data);
          this.dataSource.paginator = this.paginator;
  
 
       })  
      
  }
  //telecharger un ficher
  download(path:string){
         
   saveAs("https://localhost:44333/"+path, "cv.txt" );

}
details(off: any){

  this.competanceserv.condidat=off;
  
       const dialogRef = this.dialog.open(DetailsComponent, {
        width: '1000px',
        
       });
   
   
       
   
     }
     //popup d'ajouter enteretien
     ajouter(a:any){

      
      this.competanceserv.condidat=a;
  
            
           const dialogRef = this.dialog.open(AjouteEntertienComponent, {
            width: '600px',
            
           });
       
       
           
       
         }
         //methode de fermeture popup
         annuler(){
          this.dialogRef.close(true);
        }
getcondidats(){ 
  if(this.auth.isinrole("Condidat"))
  {
    this.condidatservice.getuserid(this.idu).subscribe((data:any)=>
    {
 
      this.dataSource = new MatTableDataSource<CondidatsModel>(data)  ; 
     
    
     this.dataSource.paginator = this.paginator;
     
    })
  }
  else{
  this.condidatservice.getall().subscribe((data:any)=>
  {
   
    this.dataSource = new MatTableDataSource<CondidatsModel>(data)  ;
  
     
   
   
   this.dataSource.paginator = this.paginator;
  })}}

    //methode de modification
modify(offr) {
  this.condidatservice.action(offr);
 
}
//methode de role utilisateur connecté
IsInRole(role:string){
return this.auth.isinrole(role);
}
//supprpesion offre
supprimer(off: any) {
  
  const dialogData = new DialogModel("Confirmation de la suppression", "Voulez-vous vraiment supprimer cet élément");
  const dialogRef = this.dialog.open(DialogComponent, {
    maxWidth: "400px",
    data: dialogData
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    if(dialogResult)
    {
      this.condidatservice.delete(off)
  .subscribe(() => {



    this.getcondidats();

    this.snackBar.open("element supprimé avec succès", "fermer", {
      duration: 2000,
      panelClass: ['blue-snackbar']
    });
  })
    }
  });
  
}
}
