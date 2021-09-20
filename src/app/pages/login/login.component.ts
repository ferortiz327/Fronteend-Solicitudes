import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ILoginRequest } from '../../interfaces/ILoginRequest.model';
import { BonitaService } from '../../services/bonita.service';
import { SessionStorageService } from '../../services/session-storage.service';
import { IUserDetail } from '../../interfaces/IUserDetail';
import { IconAlerts, StorageKeys } from '../../global/constants/GlobalEnums';
import { AlertUtilities } from 'src/app/shared/utilities/AlertUtilities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string = "";
  loading: boolean = false
  constructor(private bonitaService: BonitaService, private router: Router, private sessionStorage: SessionStorageService) {
  }

  ngOnInit(): void { }

  onLogin(data: NgForm): void {
    this.errorMessage = "";
    if (data.invalid)
      return;

    this.loading = true
    let datosLogin: ILoginRequest = data.value;
    this.bonitaService.login(datosLogin).subscribe({
      error: error => {
        if (error.status != 200 || error.status != 201) {
          console.log(error)
          this.errorMessage = "Ocurrio un error al iniciar sesion, por favor verifique su usuario y contraseña y vuelva a intentarlo"
          this.bonitaService.mostramenu.next(false)
        }
        this.loading = false
      }, complete: () => this.getUserDetail(datosLogin.username)
    })
  }

  getUserDetail(username: string) {
    let userDetail: IUserDetail
    this.bonitaService.getUserDetail(username).subscribe({
      next: result => userDetail = result,
      complete: () => {
        this.loading = false
        this.errorMessage = ""
        this.sessionStorage.set(StorageKeys.USER_DETAIL, userDetail)
        this.bonitaService.mostramenu.next(true)
        this.router.navigate(["/inicio"])
      },
      error: error => {
        this.loading = false
        console.log(error)
        if (error.status == 401) {
          AlertUtilities.showAlert({ title: "Sesion Expirada", icon: IconAlerts.info, message: "Su sesión ha expirado" });
        }
      }
    })
  }

}
