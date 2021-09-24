import { Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StorageKeys } from 'src/app/global/constants/GlobalEnums';
import { BonitaService } from 'src/app/services/bonita.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-menuradicacion',
  templateUrl: './menuradicacion.component.html',
  styleUrls: ['./menuradicacion.component.css']
})
export class MenuradicacionComponent implements OnInit {

  constructor(private bonitaService: BonitaService,private sessionStorage: SessionStorageService,private cookieService: CookieService,private router: Router) { }

  mostrarmenu: boolean = false;

  ngOnInit(): void {
    this.bonitaService.mostramenu.subscribe({
      next: resultado =>this.mostrarmenu=resultado
    });
  }

  CerrarSession():void{
      this.cookieService.delete(StorageKeys.X_BONITA_API_TOKEN);
      this.bonitaService.mostramenu.next(false)
      this.router.navigate(["/login"])
  }

}
