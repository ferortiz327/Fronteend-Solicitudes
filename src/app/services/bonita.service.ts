import { IDobleAsesoria } from './../interfaces/IDobleAsesoria';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ILoginRequest } from '../interfaces/ILoginRequest.model';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ITaskDetail } from '../interfaces/ITaskDetail';
import { IUserDetail } from '../interfaces/IUserDetail';
import { StorageKeys } from '../global/constants/GlobalEnums';
import { ITaskContext } from '../interfaces/ITaskContext';
import { ITaskDataDetail } from '../interfaces/ITaskDataDetail';
@Injectable({
  providedIn: 'root'
})
export class BonitaService {

  constructor(private http: HttpClient, private cookieService: CookieService,) { }
  mostramenu: Subject<boolean> = new Subject<boolean>();

  public login(request: ILoginRequest): Observable<any> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/x-www-form-urlencoded")
    const login = new HttpParams().set('username', request.username).set('password', request.password);
    const endpoint = environment.services.urlBase + environment.services.post.login
    return this.http.post(endpoint, login, { headers: headers, observe: 'response', withCredentials: true });

  }

  public crearCasoProcesTraslado(token: string): Observable<any> {

    const obj = {
      listadoProspectos: [
        { identificacion: "CC1000111222" },
        { identificacion: "CC1000222333" },
        { identificacion: "CC1003" }
      ]
    }

    const headers = new HttpHeaders()
      .set("X-Bonita-API-Token", token)
    const endpoint = "http://localhost:8080/bonita/API/bpm/process/5805131461874979464/instantiation"
    return this.http.post(endpoint, obj, { headers: headers, observe: 'response', withCredentials: true });

  }

  public getUserDetail(userId: string): Observable<IUserDetail> {
    const endpoint: string = environment.services.urlBase + environment.services.get.getUserDetail + userId;
    return this.http.get<IUserDetail>(endpoint, { withCredentials: true });
  }

  public getTaskList(userId: string): Observable<ITaskDetail[]> {
    const endpoint: string = environment.services.urlBase + environment.services.get.taskByUser + userId;
    return this.http.get<ITaskDetail[]>(endpoint, { withCredentials: true });
  }

  public asignarTarea(userId: any, idTarea: string): Observable<any> {
    const headers = new HttpHeaders().set("X-Bonita-API-Token", this.cookieService.get(StorageKeys.X_BONITA_API_TOKEN))
    const endpoint: string = environment.services.urlBase + environment.services.put.asignarTarea + "/" + idTarea
    const obj = { assigned_id: userId }
    return this.http.put(endpoint, obj, { headers: headers, observe: 'response', withCredentials: true });
  }

  public obtenerContextoTarea(idTarea: string): Observable<ITaskContext> {
    const endpoint: string = environment.services.urlBase + environment.services.get.getTaskContext + idTarea + "/context"
    return this.http.get<ITaskContext>(endpoint, { withCredentials: true });
  }

  public obtenerInformacionTarea(urlInformacion: string): Observable<ITaskDataDetail[]> {
    const endpoint: string = environment.services.urlBase + "/" + urlInformacion
    return this.http.get<ITaskDataDetail[]>(endpoint, { withCredentials: true });
  }

  public ejecutarTareaAgendaDelDia(idTarea: string, data: any): Observable<any> {
    const headers = new HttpHeaders().set("X-Bonita-API-Token", this.cookieService.get(StorageKeys.X_BONITA_API_TOKEN))
    const endpoint: string = environment.services.urlBase + environment.services.post.ejecutarTareaDelDia + idTarea + "/execution"

    const obj =
    {
      "listadoProspectos": data
    }

    console.log(JSON.stringify(obj))
    return this.http.post<any>(endpoint, obj, { headers: headers, withCredentials: true });
  }

  public obtenerInformacionDobleAsesoria(urlInformacion: string): Observable<IDobleAsesoria> {
    const endpoint: string = environment.services.urlBase + "/" + urlInformacion
    return this.http.get<IDobleAsesoria>(endpoint, { withCredentials: true });
  }

  public guardarDobleAsesoria(idTarea: string, data: any): Observable<any> {
    const headers = new HttpHeaders().set("X-Bonita-API-Token", this.cookieService.get(StorageKeys.X_BONITA_API_TOKEN))
    const endpoint: string = environment.services.urlBase + environment.services.post.ejecutarTareaDelDia + idTarea + "/execution"

    const obj =
    {
      "registroActividad": {
          "resultadoDobleAsesoria":data
      }
    }

    console.log(JSON.stringify(obj))
    return this.http.post<any>(endpoint, obj, { headers: headers, withCredentials: true });
  }

  public guardarAsesorLlama(idTarea: string, data: any): Observable<any> {
    const headers = new HttpHeaders().set("X-Bonita-API-Token", this.cookieService.get(StorageKeys.X_BONITA_API_TOKEN))
    const endpoint: string = environment.services.urlBase + environment.services.post.ejecutarTareaDelDia + idTarea + "/execution"

    const obj =
    {
      "registroActividad": {
          "respuestaCliente":data
      }
    }

    console.log(endpoint);
    console.log(JSON.stringify(obj))
    return this.http.post<any>(endpoint, obj, { headers: headers, withCredentials: true });
  }

}





