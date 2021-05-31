declare var require: any
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CondidatsModel } from '../../modeles/CondidatsModel';
import { MatDialog, MatSnackBar, MatPaginator, MatTableDataSource } from '@angular/material';
import { Condidatservice } from '../../../services/condidats.service';
import { DialogModel, DialogComponent } from '../../dialog/dialog.component';
import { AjouteCondidatsComponent } from '../ajoute-condidats/ajoute-condidats.component';
import { Competanceservice } from '../../../services/competance.service';
import { DetailsComponent } from '../../competences/details/details.component';
import jwt_decode from "jwt-decode";
import { AuthService } from '../../../services/Auth.service';

import {saveAs} from 'file-saver'

@Component({ 
  selector: 'app-tab-condidats',
  templateUrl: './tab-condidats.component.html', 
  styleUrls: ['./tab-condidats.component.css']
})
export class TabCondidatsComponent implements OnInit {
  displayedColumns: string[] = ['Nom_Utilisateur','Prenom_Utilisateur','Sexe_Utilisateur','Poste_Utilisateur','Libille_Role','Portable_Utilisateur','Date_naiss','Cv_Utilisateur','Action'];
  dataSource:any;
  offres:CondidatsModel[];
  selectedDoc:CondidatsModel=new CondidatsModel();
  nbrpage : any ;
  role:any;
  decoded:any;
  idu:any;
  testrole:any;
  constructor(
    public dialog: MatDialog,
    private condidatservice: Condidatservice,
    private snackBar: MatSnackBar,
    private competanceserv: Competanceservice,
    private auth:AuthService,

    
    ) { }
    @ViewChild('SearchInput',{static: true}) SearchInput: ElementRef;
    openDialog( condidat : any): void {
   
      if( condidat == null)
      {
        this.condidatservice.add = true ;
        this.condidatservice.condidat=null;
      }
      else
      {
        this.condidatservice.add = false ;
        this.condidatservice.condidat = condidat ;
      }
      const dialogRef = this.dialog.open(AjouteCondidatsComponent, {
        width: '600px',
      
        data: { }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getcondidats();
      });
    
     
    }
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   
    ngOnInit() {
      var  token = localStorage.getItem("token");;
      this.decoded = jwt_decode(token);
      this.idu=this.decoded.nameid;
      if(this.auth.isinrole("Condidat"))
      {//afficher les données d'untilisateur connecté
        this.condidatservice.getuserid(this.idu).subscribe((data:any)=>
        {
          this.dataSource = new MatTableDataSource<CondidatsModel>(data)  ; 
         this.dataSource.paginator = this.paginator;
        })
      }
      else{
        //afficher la liste des utilisateur
      this.condidatservice.getall().subscribe((data:any)=>
      {
        this.dataSource = new MatTableDataSource<CondidatsModel>(data)  ;
       this.dataSource.paginator = this.paginator;
      })}
    }

    details(off: any){
      this.competanceserv.condidat=off;
           const dialogRef = this.dialog.open(DetailsComponent, {
            width: '400px',
           });
         }
         download(path:string){
          saveAs("https://localhost:44333/"+path, "cv.txt" );
}
//afficher la liste des utilisateur ou l'utilisateur connecté
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
//modiffier un utilisateur
    modify(offr) {
      this.condidatservice.action(offr);
    }
  //le role d'utilisateur connecté
  IsInRole(role:string){
    return this.auth.isinrole(role);
  }
//suppprssion d'utilisateur
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
  
