import { Component, OnInit } from '@angular/core';
import { IconAlerts, StorageKeys } from 'src/app/global/constants/GlobalEnums';
import { ITaskDetail } from 'src/app/interfaces/ITaskDetail';
import { IUserDetail } from 'src/app/interfaces/IUserDetail';
import { SessionStorageService } from '../../services/session-storage.service';
import { BonitaService } from '../../services/bonita.service';
import { environment } from 'src/environments/environment';
import { AlertUtilities } from 'src/app/shared/utilities/AlertUtilities';
import { ITaskContext } from '../../interfaces/ITaskContext';
import { ITaskDataDetail } from 'src/app/interfaces/ITaskDataDetail';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { AlertSetting } from '../../global/constants/AlertSetting';

@Component({
  selector: 'app-aprobartarea',
  templateUrl: './aprobartarea.component.html',
  styleUrls: ['./aprobartarea.component.css']
})
export class AprobartareaComponent implements OnInit {
  loading: boolean = true;
  listadoTareas: ITaskDetail[] = []
  dtOptions: DataTables.Settings = {};
  showTable: boolean = false
  userDetail: IUserDetail = this.sessionStorage.get(StorageKeys.USER_DETAIL)[0] as IUserDetail;
  form = this.fb.group({
    tasks: this.fb.array([])
  });
  showDetail: boolean = false;
  idTarea: string = ""
  get tasks() {
    return this.form.controls["tasks"] as FormArray;
  }

   constructor(private sessionStorage: SessionStorageService, private bonitaService: BonitaService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dtOptions = environment.tableConfig;
    this.cargarMisTareas();
  }
  cargarMisTareas(): void {
    this.bonitaService.getTaskList(this.userDetail.id || "", "Actualizar y Aprobar Agenda").subscribe({
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
        console.log(JSON.stringify(contexto))
        await this.obtenerInformacionTarea(contexto.actividadComercial_ref.link);
      }
    })
  }

  async obtenerInformacionTarea(url: any) {
    let informacionTareas: ITaskDataDetail[] = []
    this.bonitaService.obtenerInformacionTarea(url).subscribe({
      next: result => informacionTareas = result,
      error: error => {
        AlertUtilities.showAlert({ title: "Completar Tarea", icon: IconAlerts.error, message: "Ocurrio un error al obtener el detalle de la informacion de la tarea.Error=" + JSON.stringify(error) })
      },
      complete: () => {
        console.log(JSON.stringify(informacionTareas))
        this.agregarTareasParaEditar(informacionTareas);
      }
    })
  }

  agregarTareasParaEditar(detalleTareas: ITaskDataDetail[]): void {
    this.tasks.clear();
    let id: number = 1;
    let fec: Date;
    let y: string;
    let m: string;
    let d: string;

    detalleTareas.forEach(tarea => {
      y = tarea.fecha.substring(0,4);
      m = tarea.fecha.substring(5,7);
      d = tarea.fecha.substring(8,10);
      //console.log(fec)
      const taskItemForm = this.fb.group({
        identificacion: [tarea.identificacion, Validators.required],
        aliasAsesor: [tarea.aliasAsesor|| '', Validators.required],
        fecha: [, Validators.required],
        hora: [tarea.fecha.substring(11,16), Validators.required],
        tipoGestion: [tarea.tipoGestion, Validators.required],
        id: [id, Validators.required],
        persistenceId_string: [tarea.persistenceId_string, Validators.required],

      });
      const objFecha = {year:Number(y),month:Number(m), day:Number(d)};
      taskItemForm.controls.fecha.setValue(objFecha);
      this.tasks.push(taskItemForm);
      id = id + 1;
      //console.log(fec);
      //console.log(objFecha);
    })
    this.showDetail = true;
  }

  guardarTareas(): void {

    const registros = Object.keys(this.form.controls.tasks.value).map(index => {
      let person = this.form.controls.tasks.value[index];
      return person;
    });
    const title: string = "Guardar Datos";
    const icon: IconAlerts = IconAlerts.warning;
    let validations: AlertSetting[] = []
    let datos: any = []
    registros.forEach(element => {
      if (!element.identificacion)
        validations.push({ text: "Debe ingresar el número de identificación del registro # " + element.id.toString(), title: title, icon: icon })
      if (!element.aliasAsesor)
        validations.push({ text: "Debe ingresar el alias del asesor del registro # " + element.id.toString(), title: title, icon: icon })
      if (!element.fecha)
        validations.push({ text: "Debe ingresar la fecha del registro # " + element.id.toString(), title: title, icon: icon })
      if (!element.hora)
        validations.push({ text: "Debe ingresar la hora del registro # " + element.id.toString(), title: title, icon: icon })

      datos.push({
        persistenceId_string: element.persistenceId_string,
        aliasAsesor: element.aliasAsesor,
        fecha: element.fecha.year + "-" + (element.fecha.month <= 9 ? "0" + element.fecha.month : element.fecha.month) + "-" + (element.fecha.day <= 9 ? "0" + element.fecha.day : element.fecha.day) + "T" + element.hora + ":00",
        tipoGestion: "Llamada",
        identificacion: element.identificacion
      })
    });

    if (validations.length > 0)
      AlertUtilities.showAlert({ message: validations.map(x => x.text).join("\n"), title: title, icon: icon });
    else {
      const listarMisTareas = (): void => {
        this.cargarMisTareas();
      }
      this.bonitaService.ejecutarTareaAgendaDelDia(this.idTarea, datos).subscribe({
        next: () => {
          this.showDetail = false;
          AlertUtilities.showAlert({ title: "Completar Tarea", icon: IconAlerts.success, message: "Se ha completado la tarea satisfactoriamente", functionAfterConfirm: listarMisTareas })
        },
        error: error => AlertUtilities.showAlert({ title: "Completar Tarea", icon: IconAlerts.error, message: "Ocurrio un error al guardar el detalle de la informacion de la tarea.Error=" + JSON.stringify(error.message) })
      })
    }


  }
}
