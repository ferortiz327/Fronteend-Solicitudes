import { Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StorageKeys } from 'src/app/global/constants/GlobalEnums';
import { BonitaService } from 'src/app/services/bonita.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { IUserDetail } from 'src/app/interfaces/IUserDetail';
import { convertTypeAcquisitionFromJson } from 'typescript';

@Component({
  selector: 'app-menuradicacion',
  templateUrl: './menuradicacion.component.html',
  styleUrls: ['./menuradicacion.component.css']
})
export class MenuradicacionComponent implements OnInit {

  constructor(private bonitaService: BonitaService,private sessionStorage: SessionStorageService,private cookieService: CookieService,private router: Router) { }

  listarTareas: boolean = true;
  asignarTareas: boolean = false;
  aprobarTareas: boolean = false;
  llamarAsesor: boolean = false;
  viabilidadTraslado: boolean = false;
  dobleAsesoria: boolean = false;
  conocerTraslados: boolean = false;
  asesorarCliente: boolean = false;
  trasladoElectronico: boolean = false;
  agendarVisita: boolean = false;
  trasladoVisita: boolean = false;


  mostrarmenu: boolean = false;
  

  ngOnInit(): void {
    this.bonitaService.mostramenu.subscribe({
      next: resultado =>{
          this.mostrarmenu=resultado
          let userDetail: IUserDetail = this.sessionStorage.get(StorageKeys.USER_DETAIL)[0] as IUserDetail;
          console.log(userDetail.userName);
          switch(userDetail.userName?.toUpperCase())
          {
          
              case "ROBOT":
                this.listarTareas =true;
                this.asignarTareas=true;
                this.aprobarTareas =false;
                this.llamarAsesor= false;
                this.viabilidadTraslado = false;
                this.dobleAsesoria= false;
                this.conocerTraslados= false;
                this.asesorarCliente= false;
                this.trasladoElectronico= false;
                this.agendarVisita= false;
                this.trasladoVisita= false;
                break;
              case "CAMILO":
              case "JAVIER":
              case "CRISTIAN":
                this.listarTareas =false;
                this.aprobarTareas =false;
                this.asignarTareas=false;
                this.llamarAsesor= true;
                this.viabilidadTraslado = true;
                this.dobleAsesoria= false;
                this.conocerTraslados= true;
                this.asesorarCliente= true;
                this.trasladoElectronico= true;
                this.agendarVisita= true;
                this.trasladoVisita= true;
                  break;
              case "DIRECTORCOMERCIAL":
                this.listarTareas =true;
                this.aprobarTareas =true;
                this.asignarTareas=false;
                this.llamarAsesor= false;
                this.viabilidadTraslado = false;
                this.dobleAsesoria= false;
                this.conocerTraslados= false;
                this.asesorarCliente= false;
                this.trasladoElectronico= false;
                this.agendarVisita= false;
                this.trasladoVisita= false;
                  break;
                case "ANALISTAOPE":
                this.listarTareas =true;
                this.aprobarTareas =false;
                this.asignarTareas=false;
                this.llamarAsesor= false;
                this.viabilidadTraslado = false;
                this.dobleAsesoria= true;
                this.conocerTraslados= false;
                this.asesorarCliente= false;
                this.trasladoElectronico= false;
                this.agendarVisita= false;
                this.trasladoVisita= false;
                  break;
          }
      }
    });
  }

  CerrarSession():void{
      this.cookieService.delete(StorageKeys.X_BONITA_API_TOKEN);
      this.bonitaService.mostramenu.next(false)
      this.router.navigate(["/login"])
  }

}
