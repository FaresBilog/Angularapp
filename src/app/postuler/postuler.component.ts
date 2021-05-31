import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AjoutPostulerComponent } from './ajout-postuler/ajout-postuler.component';

@Component({
  selector: 'app-postuler',
  templateUrl: './postuler.component.html',
  styleUrls: ['./postuler.component.css']
})
export class PostulerComponent implements OnInit {
  medForm:any;
  constructor(public dialogRef: MatDialogRef<AjoutPostulerComponent>) { }

  ngOnInit() {
  }
  annuler(){
    this.dialogRef.close(true);
  }
}
