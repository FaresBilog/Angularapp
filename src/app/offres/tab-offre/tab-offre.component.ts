import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { OffresModel } from '../../modeles/OffresModel';
import { MatDialog, MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material';
import { Offresservice } from '../../../services/offress.service';
import { AjouteOffreComponent } from '../ajoute-offre/ajoute-offre.component';
import { DialogModel, DialogComponent } from '../../dialog/dialog.component';
import { AcheterComponent } from '../../acheter/acheter.component';
import { PostulerComponent } from '../../postuler/postuler.component';
import jwt_decode from "jwt-decode";
import { AuthService } from '../../../services/Auth.service';
import { DeatiluserOffreComponent } from '../deatiluser-offre/deatiluser-offre.component';
@Component({
  selector: 'app-tab-offre',
  templateUrl: './tab-offre.component.html',
  styleUrls: ['./tab-offre.component.css']
})
export class TabOffreComponent implements OnInit {
  displayedColumns: string[] = ['Titre_Offre','Pays_Offre','Description_Offre','Statut_Offre','Date_Expiration','Action'];
  dataSource:any;
  offres:OffresModel[];
  nbrpage : any ;
  CountPage:any;
  role:any;
  decoded:any;
 
  constructor(
    public dialog: MatDialog,
    private offreservice: Offresservice,
    private snackBar: MatSnackBar,
    private auth:AuthService
    ){}
    @ViewChild('SearchInput',{static: true}) SearchInput: ElementRef;
 
    openDialog( offre : any): void {
      if( offre == null)
      {
        this.offreservice.add = true ;
        this.offreservice.offre=null;
      }
      else
      {
        this.offreservice.add = false ;
        this.offreservice.offre = offre ;      
      }
      //popup pour ajouter un offre
      const dialogRef = this.dialog.open(AjouteOffreComponent, {
        width: '800px',
        data: { }
      }); 
      dialogRef.afterClosed().subscribe(result => {
        this.getoffre();
      });
    }
    
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    
  ngOnInit() {
      this.offreservice.getall().subscribe((data:any)=>
        {
  
          this.dataSource= new MatTableDataSource<OffresModel>(data);
          this.dataSource.paginator = this.paginator;
  
var  token = localStorage.getItem("token");;
this.decoded = jwt_decode(token);
this.role=this.decoded.role;
 
       })  
      
  }
 //module paypall
  Acheter(off: any , price :any){

price =100 ;
    const dialogData = new DialogModel("Confirmation de l'achat", "Voulez-vous vraiment acheter cet élément");
    const dialogRef = this.dialog.open(AcheterComponent, {
      maxWidth: "400px",
      data: price
    });

  }
  //popup pour postuler à un offre
  Postuler(element:any){

    this.offreservice.offres.id_Offreess=element;
    const dialogRef = this.dialog.open(PostulerComponent, {
      width: '800px',
    
    });

}
// role d'utilisateur connecté
IsInRole(role:string){
  return this.auth.isinrole(role);
}
   
details1(off: any){

  this.offreservice.offre=off;
       const dialogRef = this.dialog.open(DeatiluserOffreComponent, {
        width: '1000px',
        
       }); 
   
     }
     //afficher la liste des offres
  getoffre(){
    this.offreservice.getall().subscribe((data:any) => {
             
      this.dataSource = new MatTableDataSource<OffresModel>(data);
      this.dataSource.paginator = this.paginator;
    })
  }

  //modification offre
  modify(offr) {
    this.offreservice.action(offr);
  
    
  }

//suppression offre
  supprimer(off: any) {
  
    const dialogData = new DialogModel("Confirmation de la suppression", "Voulez-vous vraiment supprimer cet élément");
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult)
      { 
        this.offreservice.delete(off)
    .subscribe(() => {


     
      this.getoffre();
  

      this.snackBar.open("element supprimé avec succès", "fermer", {
        duration: 2000,
        panelClass: ['blue-snackbar']
      });
    })
      }
    });
    
  }




  
}
