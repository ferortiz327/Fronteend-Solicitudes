import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IconAlerts, StorageKeys } from 'src/app/global/constants/GlobalEnums';
import { IDobleAsesoria } from 'src/app/interfaces/IDobleAsesoria';
import { ITaskContext } from 'src/app/interfaces/ITaskContext';
import { ITaskDetail } from 'src/app/interfaces/ITaskDetail';
import { IUserDetail } from 'src/app/interfaces/IUserDetail';
import { BonitaService } from 'src/app/services/bonita.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { AlertUtilities } from 'src/app/shared/utilities/AlertUtilities';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-traslado-visita',
  templateUrl: './traslado-visita.component.html',
  styleUrls: ['./traslado-visita.component.css']
})
export class TrasladoVisitaComponent implements OnInit {
  datosform = new FormGroup({
    identificacion: new FormControl(""),
    nombres: new FormControl(""),
    apellidos: new FormControl(""),
    aliasAsesor: new FormControl(""),
    fecha: new FormControl(""),
    tipoGestion: new FormControl(""),
    regimen: new FormControl(""),
    tiempoAfiliacion: new FormControl(""),
    resultadoViabilidad: new FormControl(""),
    alternativaSeleccionada: new FormControl(""),
    fechaVisita: new FormControl(""),
    solicitudRegistrada: new FormControl(""),

 })
  fechaAgenda: string = ""
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
    this.bonitaService.getTaskList(this.userDetail.id || "","Visitar cliente, diligenciar formalurarios, registrar oportunidad CRM").subscribe({
      next: result => {
        result = result.filter(x => this.userDetail.id == x.assigned_id);

        this.listadoTareas = result
        this.showTable = result.length > 0
        this.loading = false;
      },
      error: error => {
        console.log(this.listadoTareas);
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

    let y: string;
    let m: number;
    let m1: string;
    let d1: string;
    let d: number;
    let v: string;
    v = "{year=2021, month=12, day=20}"   //detalleTareas.fechaVisita;
    y = v.substring(6,10)
    m1 = v.substring(18,20)
    m = parseInt(m1.replace(",","").replace("=",""))
    d1 = v.substring(25,27)
    d = parseInt(d1.replace("}","").replace("=",""))
    // {year=2021, month=9, day=2}
    //console.log(d1);

    this.fechaAgenda = y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);

    this.datosform?.controls.identificacion.setValue(detalleTareas.identificacion)
    this.datosform?.controls.nombres.setValue(detalleTareas.nombres)
    this.datosform?.controls.apellidos.setValue(detalleTareas.apellidos)
    this.datosform?.controls.aliasAsesor.setValue(detalleTareas.aliasAsesor)
    this.datosform?.controls.fecha.setValue(detalleTareas.fecha)
    this.datosform?.controls.tipoGestion.setValue(detalleTareas.tipoGestion)
    this.datosform?.controls.regimen.setValue(detalleTareas.regimen)
    this.datosform?.controls.tiempoAfiliacion.setValue(detalleTareas.tiempoAfiliacion)
    this.datosform?.controls.resultadoViabilidad.setValue(detalleTareas.resultadoViabilidad)
    this.datosform?.controls.alternativaSeleccionada.setValue(detalleTareas.alternativaSeleccionada)
    this.datosform?.controls.fechaVisita.setValue(this.fechaAgenda)
    this.datosform?.controls.solicitudRegistrada.setValue("SELECCIONE")
    this.showDetail = true;
  }

  guardarTareas(): void {

    const resultado = this.datosform.controls.solicitudRegistrada.value;


    if (resultado == "SELECCIONE")
    {AlertUtilities.showAlert({title:"Validación Traslado",icon: IconAlerts.warning, message:"Debe seleccionar una opción de solicitud Resgitrada"})}
    //console.log(resultado)

    const listarMisTareas = (): void => {
      this.cargarMisTareas();
    }
    this.bonitaService.guardarTraslado(this.idTarea, resultado).subscribe({
      next: () => {
        this.showDetail = false;
        AlertUtilities.showAlert({ title: "Completar Traslado", icon: IconAlerts.success, message: "Se ha completado la tarea satisfactoriamente", functionAfterConfirm: listarMisTareas })
      },
      error: error => AlertUtilities.showAlert({ title: "Completar Traslado", icon: IconAlerts.error, message: "Ocurrio un error al guardar el detalle de la informacion de la tarea.Error=" + JSON.stringify(error.message) })    })

  }

}
