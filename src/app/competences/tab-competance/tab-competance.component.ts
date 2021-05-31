import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Competanceservice } from '../../../services/competance.service';
import { DialogComponent, DialogModel } from '../../dialog/dialog.component';
import { CompetanceModel } from '../../modeles/CompetanceModel';
import { AjoutCompetanceComponent } from '../ajout-competance/ajout-competance.component';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-tab-competance',
  templateUrl: './tab-competance.component.html',
  styleUrls: ['./tab-competance.component.css']
})

export class TabCompetanceComponent implements OnInit {
  displayedColumns: string[] = ['Nom_Utilisateur','Prenom_Utilisateur','Action'];
  dataSource:any;
  Competance:CompetanceModel[];
  nbrpage : any ;
  
 
constructor(
  public dialog: MatDialog,
  private competanceserv: Competanceservice,
  private router: Router,
  private snackBar: MatSnackBar
  ){}
 @ViewChild('SearchInput',{static: true}) SearchInput: ElementRef;

 
  openDialog( competnce : any): void {
   
    if( competnce == null)
    {
      this.competanceserv.add = true ;
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
 
      
  }
  ngAfterViewInit() {
    
    fromEvent( this.SearchInput.nativeElement, 'keyup').pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          if(this.SearchInput.nativeElement.value == "")
          {
            //les competance par utlilsateur 
            this.competanceserv.getdetails(this.competanceserv.competance.id_Utilisateur).subscribe((data:any) => {
          
              this.dataSource = new MatTableDataSource<CompetanceModel>(data);
            })
          }
          else
          {
            //liste des competance 
            this.competanceserv.getdetails(this.competanceserv.competance.id_Utilisateur).subscribe((data:any) => {
             
              this.dataSource = new MatTableDataSource<CompetanceModel>(data);
            })
          }
         
        })
      ).subscribe()

    this.paginator.page.pipe(
        tap(() => {
          if(this.SearchInput.nativeElement.value == "")
          {
            this.getoffre();
          }
          else
          {
            this.getoffre();
          }
        })
      ).subscribe()
  }

  
 //methode d'afficher les competance d'utilsateur par id
  getoffre(){
    this.competanceserv.getdetails(this.competanceserv.competance.id_Utilisateur).subscribe((data:any) => {
             
      this.dataSource = new MatTableDataSource<CompetanceModel>(data);
    })
  }
//methode moddifer
  modify(comp) {
    this.competanceserv.action(comp);
  


  }

  details(off: any){

   this.competanceserv.competance=off
   
         
        const dialogRef = this.dialog.open(DetailsComponent, {
          maxWidth: "400px",
         
        });
    
    
        
    
      }
      //methode suppression
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
