import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';

import {AuthService} from "../services/auth.service";
  import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn:"root"
})
export class AuthenticationGuard implements CanActivate{
  constructor(private authService:AuthService,
              private router:Router) {
  }
  canActivate(route:ActivatedRouteSnapshot
              , state:RouterStateSnapshot
  ):Observable<boolean | UrlTree> | Promise<boolean|UrlTree>|boolean  {
    if(this.authService.isAuthenticated){
      console.log(this.authService.roles && this.authService.roles!='USER')
      return true;
    }else{
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}

