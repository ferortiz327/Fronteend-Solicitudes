import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IconAlerts, StorageKeys } from 'src/app/global/constants/GlobalEnums';
import { ITaskDetail } from 'src/app/interfaces/ITaskDetail';
import { IUserDetail } from 'src/app/interfaces/IUserDetail';
import { BonitaService } from 'src/app/services/bonita.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { environment } from 'src/environments/environment';
import { ITaskContext } from 'src/app/interfaces/ITaskContext';
import { AlertUtilities } from 'src/app/shared/utilities/AlertUtilities';
import { IAsesorLlama } from 'src/app/interfaces/IAsesorLlama';

@Component({
  selector: 'app-asesorllama',
  templateUrl: './Asesorllama.component.html',
  styleUrls: ['./asesorllama.component.css']
})
export class AsesorllamaComponent implements OnInit {
  datosform = new FormGroup({
    identificacion: new FormControl(""),
    nombres: new FormControl(""),
    aliasAsesor: new FormControl(""),
    respuestaCliente: new FormControl("")
 })

  loading: boolean = true;
  listadoTareas: ITaskDetail[] = []
  dtOptions: DataTables.Settings = {};
  showTable: boolean = false;
  userDetail: IUserDetail = this.sessionStorage.get(StorageKeys.USER_DETAIL)[0] as IUserDetail;
  showDetail: boolean = false;
  idTarea: string = ""
  form = this.fb.group({
    tasks: this.fb.array([])
  });

  constructor(private sessionStorage: SessionStorageService, private bonitaService: BonitaService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.dtOptions = environment.tableConfig;
    this.cargarMisTareas();
  }
  cargarMisTareas(): void {
    this.bonitaService.getTaskList(this.userDetail.id || "").subscribe({
      next: result => {
        result = result.filter(x => this.userDetail.id == x.assigned_id);
        this.listadoTareas = result
        this.showTable = result.length > 0
        this.loading = false;
      },
      error: error => {
        console.log(error);
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
    let informacionTareas: IAsesorLlama
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
  agregarTareasParaEditar(detalleTareas: IAsesorLlama): void {

    this.datosform?.controls.identificacion.setValue(detalleTareas.identificacion)
    this.datosform?.controls.nombres.setValue(detalleTareas.nombres)
    this.datosform?.controls.aliasAsesor.setValue(detalleTareas.aliasAsesor)
    this.datosform?.controls.respuestaCliente.setValue("SELECCIONE")
    this.showDetail = true;
  }


  guardarTareas(): void {

    const respuestaCliente = this.datosform.controls.respuestaCliente.value;
    console.log(this.datosform.valid);
    console.log(respuestaCliente);

    if (respuestaCliente == "SELECCIONE")
    {AlertUtilities.showAlert({title:"Validación de consultar el CRM",icon: IconAlerts.warning, message:"Debe seleccionar una respuesta del Cliente valida"})}

    const listarMisTareas = (): void => {
      this.cargarMisTareas();
    }
    this.bonitaService.guardarAsesorLlama(this.idTarea, respuestaCliente).subscribe({
      next: () => {
        this.showDetail = false;
        AlertUtilities.showAlert({ title: "Validación de consultar el CRM", icon: IconAlerts.success, message: "Se ha completado la tarea satisfactoriamente", functionAfterConfirm: listarMisTareas })
      },
      error: error => AlertUtilities.showAlert({ title: "Validación de consultar el CRM", icon: IconAlerts.error, message: "Ocurrio un error al guardar el detalle de la informacion de la tarea.Error=" + JSON.stringify(error.message) })    })

  }

}
