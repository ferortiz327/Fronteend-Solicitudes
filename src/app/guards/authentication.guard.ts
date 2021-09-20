import { BonitaService } from './../services/bonita.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { StorageKeys } from '../global/constants/GlobalEnums';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router, private bonitaService: BonitaService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot): boolean {
    let cookie = this.cookieService.get(StorageKeys.X_BONITA_API_TOKEN)
    if (cookie)
      return true;
    else {
      this.bonitaService.mostramenu.next(false)
      this.router.navigate(["/login"])
      return false
    }

  }

}
