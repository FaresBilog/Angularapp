import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent implements OnInit {
  constructor(public router: Router) {}
  ngOnInit() {}
  signout() {
    localStorage.clear();
    this.router.navigate(["login"]);
  }
}
