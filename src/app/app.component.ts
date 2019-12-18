import { MatSidenav } from "@angular/material";
import {
  Component,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  OnInit
} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { LocalStorageService } from "angular-web-storage";
import { SessionStorageService } from "angular-web-storage";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "charApp";
  isopen = false;
  @ViewChild("sidenav", { static: false })
  sidenav: MatSidenav;

  reason = "";
  token = "token";
  isUserLoggedIn = false;
  isUserAdmin = false;
  isSelected = "Home";
  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
    this.isopen = !this.isopen;
  }
  constructor(
    public local: LocalStorageService,
    public session: SessionStorageService,
    public router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    // this.route.params.subscribe(data => {
    //   console.log('data', data)
    // })
    // this.local.set(this.token, { a: 1, now: '10' }, 10000, 's')
    // this.router.events.subscribe((url:any) => console.log('url', url));
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        console.log("this.router.url", this.router.url);
        const urlRoute = this.router.url;

        if (urlRoute === "/home") {
          this.isSelected = "Home";
        } else if (urlRoute === "/posting") {
          this.isSelected = "Posting";
        } else if (urlRoute === "/seminar") {
          this.isSelected = "Seminar";
        } else if (urlRoute === "/company") {
          this.isSelected = "Refrance";
        } else if (urlRoute === "/about-us") {
          this.isSelected = "About";
        } else if (urlRoute === "/society") {
          this.isSelected = "Society";
        } else if (urlRoute === "/admin") {
          this.isSelected = "Dashboard";
        } else if (urlRoute === "/login") {
          this.isSelected = "Login";
        } else {
          this.isSelected = "";
        }
      }
      console.log("val", this.local.get(this.token), this.router.url);
      if (this.local.get(this.token) != undefined) {
        this.isUserLoggedIn = true;
  
        if(this.local.get('admin') != undefined){
          console.log(this.local.get('admin'), 'asa')
          const temp = this.local.get('admin');
          this.isUserAdmin = temp.isAdmin;
        }
      }
    });
    
  }

  redirectTo(url) {
    if (url == "/home") {
      this.router.navigate([url]);
    } else {
      // this.router.navigate([url])
      if (this.local.get(this.token) != undefined) {
        this.router.navigate([url]);
      } else {
        this.local.set("redirectTo", { url: url }, 300, "s");
        this.router.navigate(["/login"]);
      }
    }
  }
  logout() {
    this.local.remove("token");
    this.local.remove('admin');
    this.local.remove("redirectTo");
    this.local.clear();
    this.router.navigate(["/home"]);
    this.isUserLoggedIn = false;
    this.isUserAdmin = false;
  }
}
