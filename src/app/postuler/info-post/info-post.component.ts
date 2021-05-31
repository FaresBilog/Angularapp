import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Offresservice } from '../../../services/offress.service';
import { PostulerModel } from '../../modeles/PostulerModel';

@Component({
  selector: 'app-info-post',
  templateUrl: './info-post.component.html',
  styleUrls: ['./info-post.component.css']
})
export class InfoPostComponent implements OnInit {


  displayedColumns: string[] = ['Commentaire'];
  dataSource:any;
  Postuler:PostulerModel[];
  nbrpage : any ;

  constructor(
    public dialog: MatDialog,
    private Offresservice: Offresservice,
    private router: Router,
    private snackBar: MatSnackBar
    ){}
   @ViewChild('SearchInput',{static: true}) SearchInput: ElementRef;
 

   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   ngOnInit() {


       this.Offresservice.getdetails(this.Offresservice.offre.id_Offreess).subscribe((data:any)=>
         {
  
           this.dataSource= new MatTableDataSource<PostulerModel>(data);
           
       this.dataSource.paginator = this.paginator;
                  })

   }

  
}


