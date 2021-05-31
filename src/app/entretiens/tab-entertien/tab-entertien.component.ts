import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Entertienservice } from '../../../services/entertien.service';
import { DialogComponent, DialogModel } from '../../dialog/dialog.component';
import { EntretiensModel } from '../../modeles/EntretiensModel';
import { AjouteEntertienComponent } from '../ajoute-entertien/ajoute-entertien.component';
import jwt_decode from "jwt-decode";
import { AuthService } from '../../../services/Auth.service';
@Component({
  selector: 'app-tab-entertien',
  templateUrl: './tab-entertien.component.html',
  styleUrls: ['./tab-entertien.component.css']
})
export class TabEntertienComponent implements OnInit {
  displayedColumns: string[] = ['Nom_Entertien','Date_Entertien','Descision_Entretien','Nom_Utilisateur','Titre_Offre','Action'];
  dataSource:any;  
  Entertiens:EntretiensModel[];
  nbrpage : any ;
  role:any;
  decoded:any;
  idu:any;
  constructor(public dialog: MatDialog,private Entertiensserv: Entertienservice,private snackBar: MatSnackBar,private auth:AuthService){}
    @ViewChild('SearchInput',{static: true}) SearchInput: ElementRef;
    openDialog( Entertien : any): void {
   
      if( Entertien == null)
        {
          this.Entertiensserv.add = true ;
          this.Entertiensserv.entertien=null;
        }
      else
        {
         this.Entertiensserv.add = false ;
         this.Entertiensserv.entertien = Entertien ;
        }
         const dialogRef = this.dialog.open(AjouteEntertienComponent, { width: '700px',
            data: { }
               });
         dialogRef.afterClosed().subscribe(result => {
            this.getoffre();
              });  
             } 
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    ngOnInit() {
      var  token = localStorage.getItem("token");;
      this.decoded = jwt_decode(token);
      this.idu=this.decoded.nameid;
      this.role=this.decoded.role;
       
        if(this.auth.isinrole("Condidat"))
         {//afficher les entertien d'utilisateur connecté
           this.Entertiensserv.getentertieniduser(this.idu).subscribe((data:any)=>
         {
          this.dataSource = new MatTableDataSource<EntretiensModel>(data)  ; 
          this.dataSource.paginator = this.paginator;
        })
        }
         else{
           //afficher les entretien
         this.Entertiensserv.getall().subscribe((data:any)=>
        {
          this.dataSource= new MatTableDataSource<EntretiensModel>(data);
          this.dataSource.paginator = this.paginator;
        })  
        }
        }
   //role d'utilisateur connecté
  IsInRole(role:string){
    return this.auth.isinrole(role);
  }
  //liste des offres
  getoffre(){
    this.Entertiensserv.getall().subscribe((data:any) => {      
      this.dataSource = new MatTableDataSource<EntretiensModel>(data);
      this.dataSource.paginator = this.paginator;
    })
  }
  //modifier entretien
  modify(offr) {
    this.Entertiensserv.action(offr);
  }
  //suppression entertien
  supprimer(off: any) {
    const dialogData = new DialogModel("Confirmation de la suppression", "Voulez-vous vraiment supprimer cet élément");
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult)
      { 
        this.Entertiensserv.delete(off).subscribe(() => {
     
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
