import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertSetting } from 'src/app/global/constants/AlertSetting';
import { IconAlerts, StorageKeys } from 'src/app/global/constants/GlobalEnums';
import { IDobleAsesoria } from 'src/app/interfaces/IDobleAsesoria';
import { ITaskContext } from 'src/app/interfaces/ITaskContext';
import { ITaskDataDetail } from 'src/app/interfaces/ITaskDataDetail';
import { ITaskDetail } from 'src/app/interfaces/ITaskDetail';
import { IUserDetail } from 'src/app/interfaces/IUserDetail';
import { BonitaService } from 'src/app/services/bonita.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { AlertUtilities } from 'src/app/shared/utilities/AlertUtilities';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dar-aconocer',
  templateUrl: './dar-aconocer.component.html',
  styleUrls: ['./dar-aconocer.component.css']
})
export class DarAconocerComponent implements OnInit {
  datosform = new FormGroup({
    identificacion: new FormControl(""),
    nombres: new FormControl(""),
    apellidos: new FormControl(""),
    aliasAsesor: new FormControl(""),
    fecha: new FormControl(""),
    tipoGestion: new FormControl(""),
    regimen: new FormControl(""),
    tiempoAfiliacion: new FormControl(""),
    respuestaCliente: new FormControl(""),
    resultadoViabilidad: new FormControl(""),
    salario: new FormControl(""),
    alternativaSeleccionada: new FormControl("")
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
    this.bonitaService.getTaskList(this.userDetail.id || "", "Dar a conocer al cliente las diferentes alternativas para iniciar el proceso de traslado.").subscribe({
      next: result => {
        result = result.filter(x => this.userDetail.id == x.assigned_id);
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
    this.datosform?.controls.nombres.setValue(detalleTareas.nombres)
    this.datosform?.controls.apellidos.setValue(detalleTareas.apellidos)
    this.datosform?.controls.aliasAsesor.setValue(detalleTareas.aliasAsesor)
    this.datosform?.controls.fecha.setValue(detalleTareas.fecha)
    this.datosform?.controls.tipoGestion.setValue(detalleTareas.tipoGestion)
    this.datosform?.controls.regimen.setValue(detalleTareas.regimen)
    this.datosform?.controls.tiempoAfiliacion.setValue(detalleTareas.tiempoAfiliacion)
    this.datosform?.controls.respuestaCliente.setValue(detalleTareas.respuestaCliente)
    this.datosform?.controls.resultadoViabilidad.setValue(detalleTareas.resultadoViabilidad)
    this.datosform?.controls.salario.setValue("$ " + detalleTareas.salario)
    this.datosform?.controls.alternativaSeleccionada.setValue("SELECCIONE")
    this.showDetail = true;
  }

  guardarTareas(): void {

    const resultado = this.datosform.controls.alternativaSeleccionada.value;


    if (resultado == "SELECCIONE")
    {AlertUtilities.showAlert({title:"Validación Dar a Conocer Traslado",icon: IconAlerts.warning, message:"Debe seleccionar una opción de traslado"})}

    const listarMisTareas = (): void => {
      this.cargarMisTareas();
    }
    this.bonitaService.guardarDarAConocer(this.idTarea, resultado).subscribe({
      next: () => {
        this.showDetail = false;
        AlertUtilities.showAlert({ title: "Dar a Conocer Traslado", icon: IconAlerts.success, message: "Se ha completado la tarea satisfactoriamente", functionAfterConfirm: listarMisTareas })
      },
      error: error => AlertUtilities.showAlert({ title: "Dar a Conocer Traslado", icon: IconAlerts.error, message: "Ocurrio un error al guardar el detalle de la informacion de la tarea.Error=" + JSON.stringify(error.message) })    })

  }

}
