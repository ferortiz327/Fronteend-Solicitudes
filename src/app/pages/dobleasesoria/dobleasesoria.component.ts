import { IDobleAsesoria } from './../../interfaces/IDobleAsesoria';
import { Component, OnInit } from '@angular/core';
import { IconAlerts, StorageKeys } from 'src/app/global/constants/GlobalEnums';
import { ITaskDetail } from 'src/app/interfaces/ITaskDetail';
import { IUserDetail } from 'src/app/interfaces/IUserDetail';
import { FormArray, FormBuilder, Validators,FormGroup,FormControl,AbstractControl } from '@angular/forms';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { BonitaService } from 'src/app/services/bonita.service';
import { environment } from 'src/environments/environment';
import { ITaskContext } from 'src/app/interfaces/ITaskContext';
import { AlertUtilities } from 'src/app/shared/utilities/AlertUtilities';
import { AlertSetting } from 'src/app/global/constants/AlertSetting';
import { of } from 'rxjs';

@Component({
  selector: 'app-dobleasesoria',
  templateUrl: './dobleasesoria.component.html',
  styleUrls: ['./dobleasesoria.component.css']
})
export class DobleasesoriaComponent implements OnInit {
  datosform = new FormGroup({
    identificacion: new FormControl(""),
    resultadoDobleAsesoria: new FormControl("")
 })

  loading: boolean = true;
  listadoTareas: ITaskDetail[] = []
  dtOptions: DataTables.Settings = {};
  showTable: boolean = false
  userDetail: IUserDetail = this.sessionStorage.get(StorageKeys.USER_DETAIL)[0] as IUserDetail;
  showDetail: boolean = false;
  idTarea: string = ""

  constructor(private sessionStorage: SessionStorageService, private bonitaService: BonitaService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.dtOptions = environment.tableConfig;
    this.cargarMisTareas();
  }
  cargarMisTareas(): void {
    this.bonitaService.getTaskList(this.userDetail.id || "","Procesar doble asesoría").subscribe({
      next: result => {
        //result = result.filter(x => this.userDetail.id == x.assigned_id);
        this.listadoTareas = result
        this.showTable = result.length > 0
        this.loading = false;
      },
      error: error => {
        //console.log(error);
        this.loading = false;
      }
    });

  }

  completarTarea(idTarea: any): void {
    let contexto: ITaskContext
    this.idTarea = idTarea
    this.bonitaService.obtenerContextoTarea(idTarea).subscribe({
      next: result => contexto = result,
      error: error => {
        AlertUtilities.showAlert({ title: "Completar Tarea", icon: IconAlerts.error, message: "Ocurrio un error al obtener el contexto de esta tarea.Error=" + JSON.stringify(error) })
      },
      complete: async () => {
        //console.log(JSON.stringify(contexto))
        await this.obtenerInformacionTarea(contexto.actividadComercial_ref.link);
      }
    })
  }

  async obtenerInformacionTarea(url: any) {
    let informacionTareas: IDobleAsesoria
    this.bonitaService.obtenerInformacionDobleAsesoria(url).subscribe({
      next: result => informacionTareas = result,
      error: error => {
        AlertUtilities.showAlert({ title: "Completar Tarea", icon: IconAlerts.error, message: "Ocurrio un error al obtener el detalle de la informacion de la tarea.Error=" + JSON.stringify(error) })
      },
      complete: () => {
        //console.log(JSON.stringify(informacionTareas))
        this.agregarTareasParaEditar(informacionTareas);
      }
    })
  }

  agregarTareasParaEditar(detalleTareas: IDobleAsesoria): void {

    this.datosform?.controls.identificacion.setValue(detalleTareas.identificacion)
    this.datosform?.controls.resultadoDobleAsesoria.setValue("SELECCIONE")
    this.showDetail = true;
  }

  guardarTareas(): void {

    const ident = this.datosform.controls.identificacion.value;
    const resultado = this.datosform.controls.resultadoDobleAsesoria.value;
    console.log(this.datosform.valid);
    console.log(ident);
    console.log(resultado);

    if (ident == "")
    {AlertUtilities.showAlert({title:"Validación Doble Asesoria",icon: IconAlerts.warning, message:"Debe ingresar la identificación"})}
    if (resultado == "SELECCIONE")
    {AlertUtilities.showAlert({title:"Validación Doble Asesoria",icon: IconAlerts.warning, message:"Debe seleccionar un resultado de asesoria"})}

    const listarMisTareas = (): void => {
      this.cargarMisTareas();
    }
    this.bonitaService.guardarDobleAsesoria(this.idTarea, resultado).subscribe({
      next: () => {
        this.showDetail = false;
        AlertUtilities.showAlert({ title: "Completar doble asesoría", icon: IconAlerts.success, message: "Se ha completado la tarea satisfactoriamente", functionAfterConfirm: listarMisTareas })
      },
      error: error => AlertUtilities.showAlert({ title: "Completar doble asesoría", icon: IconAlerts.error, message: "Ocurrio un error al guardar el detalle de la informacion de la tarea.Error=" + JSON.stringify(error.message) })    })

  }

}
