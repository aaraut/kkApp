import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from "@angular/router";
import { LocalStorageService } from 'angular-web-storage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  urlRoute = '';
  constructor(public local: LocalStorageService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        console.log("this.router.url", this.router.url);
        this.urlRoute = this.router.url;
      }
    });
  }
  checkIfUserIsLoggedIn() {
    if(this.local.get('token') != undefined) {
      return true;
    }
    return false;
  }
  checkIfUserIsAdmin(){
    if(this.local.get('admin') != undefined) {
      return true;
    }
    return false;
  }

  getUserName() {
    return 'Alekh'
  }

  logout(){
    this.local.remove("token");
    this.local.remove('admin');
    this.local.remove("redirectTo");
    this.local.clear();
    this.router.navigate(["/home"]);
  }

  login() {
    this.router.navigate(["/login"]);
  }
}
