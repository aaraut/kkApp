import { SessionStorageService } from 'angular-web-storage';
import { LocalStorageService } from 'angular-web-storage';
import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor( public router: Router,
               public local: LocalStorageService, public session: SessionStorageService,) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if(this.local.get('token') != undefined) {
        return true;
      }
    this.router.navigate(['/login']);
    return false;
    }

}
