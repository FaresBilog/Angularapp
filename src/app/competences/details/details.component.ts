import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Competanceservice } from '../../../services/competance.service';
import { DialogComponent, DialogModel } from '../../dialog/dialog.component';
import { CompetanceModel } from '../../modeles/CompetanceModel';
import { AjoutCompetanceComponent } from '../ajout-competance/ajout-competance.component';
import jwt_decode from "jwt-decode";
import { AuthService } from '../../../services/Auth.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  displayedColumns: string[] = ['libelle_Competance','description_Competance','Action'];
  dataSource:any;
  Competance:CompetanceModel[];
  nbrpage : any ;
  role:any;
  decoded:any;

  constructor(
    public dialog: MatDialog,
    private competanceserv: Competanceservice,
    private snackBar: MatSnackBar,
    private auth:AuthService,
    public dialogRef: MatDialogRef<AjoutCompetanceComponent>,
    ){}
   @ViewChild('SearchInput',{static: true}) SearchInput: ElementRef;
   //ouvrir popup pour ajouter une competance
   openDialog( competnce : any): void {
   
    if( competnce == null)
    {
      this.competanceserv.add = true ;
      this.competanceserv.competance=null;
    }
    else
    {
      this.competanceserv.add = false ;
      this.competanceserv.competance = competnce ;
    }
    const dialogRef = this.dialog.open(AjoutCompetanceComponent, {
      width: '800px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getoffre();
    });
  
  }
   
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   ngOnInit() {
   

       this.competanceserv.getdetails(this.competanceserv.condidat.id_Utilisateur).subscribe((data:any)=>
         {
 
  
           this.dataSource= new MatTableDataSource<CompetanceModel>(data);
           this.dataSource.paginator = this.paginator;
                  })  
                  var  token = localStorage.getItem("token");;
this.decoded = jwt_decode(token);
this.role=this.decoded.role;
 
       
   }

 //methode pour fermer la popup
   annuler(){
    this.dialogRef.close(true);
  }
 //methode d'afficher la liste des competance
  getoffre(){
    this.competanceserv.getdetails(this.competanceserv.condidat.id_Utilisateur).subscribe((data:any) => {
             
      this.dataSource = new MatTableDataSource<CompetanceModel>(data);
      this.dataSource.paginator = this.paginator;
    })
  }
//methode pour modifier
  modify(comp) {
    this.competanceserv.action(comp);
  


  }
//methode permet d'ouvrire la popup les details
  details(off: any){

   this.competanceserv.competance=off;
   
     
        const dialogRef = this.dialog.open(DetailsComponent, {
          maxWidth: "400px",
         
        });
    
    
        
    
      }
      //methode retourne la role d'utilisateur connecté
      IsInRole(role:string){
        return this.auth.isinrole(role);
      }
      //popup  de suppresion d'unr comerptance
  supprimer(comp: any) {
  
    const dialogData = new DialogModel("Confirmation de la suppression", "Voulez-vous vraiment supprimer cet élément");
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult)
      { 
        this.competanceserv.delete(comp)
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


