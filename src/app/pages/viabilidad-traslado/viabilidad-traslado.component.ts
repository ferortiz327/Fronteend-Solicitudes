import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ITaskDetail } from 'src/app/interfaces/ITaskDetail';
import { IUserDetail } from 'src/app/interfaces/IUserDetail';
import { BonitaService } from 'src/app/services/bonita.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { environment } from 'src/environments/environment';
import { ITaskContext } from 'src/app/interfaces/ITaskContext';
import { AlertUtilities } from 'src/app/shared/utilities/AlertUtilities';
import { AlertSetting } from 'src/app/global/constants/AlertSetting';
import { IconAlerts, StorageKeys } from 'src/app/global/constants/GlobalEnums';
import { IViabilidadTraslado } from 'src/app/interfaces/IViabilidadTraslado';

@Component({
  selector: 'app-viabilidadtraslado',
  templateUrl: './viabilidad-traslado.component.html',
  styleUrls: ['./viabilidad-traslado.component.css']
})
export class ViabilidadTrasladoComponent implements OnInit {
  datosform = new FormGroup({
    identificacion: new FormControl(""),
    nombres: new FormControl(""),
    apellidos: new FormControl(""),
    aliasAsesor: new FormControl(""),
    fecha: new FormControl(""),
    fechaNacimiento: new FormControl(""),
    regimen: new FormControl(""),
    tiempoAfiliacion: new FormControl(""),
    sexo: new FormControl(""),
    respuestaCliente: new FormControl(""),
    email: new FormControl(""),
    direccion: new FormControl(""),
    telefono: new FormControl(""),
    salario: new FormControl(""),
 })
 loading: boolean = true;
 listadoTareas: ITaskDetail[] = []
 dtOptions: DataTables.Settings = {};
 showTable: boolean = false;
 idTarea: string = ""
 userDetail: IUserDetail = this.sessionStorage.get(StorageKeys.USER_DETAIL)[0] as IUserDetail;
 showDetail: boolean = false;
 form = this.fb.group({
   tasks: this.fb.array([])
 });

 constructor(private sessionStorage: SessionStorageService, private bonitaService: BonitaService, private fb: FormBuilder){}
 ngOnInit(): void {
  this.dtOptions = environment.tableConfig;
  this.cargarMisTareas();
}
cargarMisTareas(): void {
  this.bonitaService.getTaskList(this.userDetail.id || "","Consultar viabilidad del traslado").subscribe({
    next: result => {
      //result = result.filter(x => this.userDetail.id == x.assigned_id);
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
  let informacionTareas: IViabilidadTraslado
  this.bonitaService.obtenerViabilidadTraslado(url).subscribe({
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

agregarTareasParaEditar(detalleTareas: IViabilidadTraslado): void {
  this.datosform?.controls.identificacion.setValue(detalleTareas.identificacion)
  this.datosform?.controls.nombres.setValue(detalleTareas.nombres)
  this.datosform?.controls.apellidos.setValue(detalleTareas.apellidos)
  this.datosform?.controls.aliasAsesor.setValue(detalleTareas.aliasAsesor)
  this.datosform?.controls.fecha.setValue(detalleTareas.fecha)
  this.datosform?.controls.fechaNacimiento.setValue(detalleTareas.fechaNacimiento)
  this.datosform?.controls.regimen.setValue(detalleTareas.regimen)
  this.datosform?.controls.tiempoAfiliacion.setValue(detalleTareas.tiempoAfiliacion)
  this.datosform?.controls.sexo.setValue(detalleTareas.sexo)
  this.datosform?.controls.respuestaCliente.setValue(detalleTareas.respuestaCliente)
  this.datosform?.controls.email.setValue(detalleTareas.email)
  this.datosform?.controls.direccion.setValue(detalleTareas.direccion)
  this.datosform?.controls.telefono.setValue(detalleTareas.telefono)
  this.datosform?.controls.salario.setValue(detalleTareas.salario)



 // this.datosform?.controls.resultadoDobleAsesoria.setValue("SELECCIONE")
  this.showDetail = true;
}

guardarTareas(): void {

  const ident = this.datosform.controls.identificacion.value;
  const regimen = this.datosform.controls.regimen.value;
  const tiempoAfiliacion = this.datosform.controls.tiempoAfiliacion.value;
  const salario = this.datosform.controls.salario.value;
  console.log(this.datosform.valid);
  console.log(ident);
  console.log(regimen);
  console.log(tiempoAfiliacion);
  console.log(salario);

  if (ident == "")
    {AlertUtilities.showAlert({title:"Validación Viabilidad Traslado",icon: IconAlerts.warning, message:"Debe ingresar la identificación"})}
  if (regimen == "")
  {AlertUtilities.showAlert({title:"Validación Viabilidad Traslado",icon: IconAlerts.warning, message:"Debe ingresar un regimen"})}
  if (tiempoAfiliacion == "")
  {AlertUtilities.showAlert({title:"Validación Viabilidad Traslado",icon: IconAlerts.warning, message:"Debe ingresar un tiempo de afiliación"})}
  if (salario == "")
  {AlertUtilities.showAlert({title:"Validación Viabilidad Traslado",icon: IconAlerts.warning, message:"Debe ingresar el valor del salario"})}

  const listarMisTareas = (): void => {
    this.cargarMisTareas();
  }


  this.bonitaService.guardarViabilidadTraslado(this.idTarea, regimen, tiempoAfiliacion,salario).subscribe({
    next: () => {
      this.showDetail = false;
      AlertUtilities.showAlert({ title: "Completar Viabilidad Traslado", icon: IconAlerts.success, message: "Se ha completado la tarea satisfactoriamente", functionAfterConfirm: listarMisTareas })
    },
    error: error => AlertUtilities.showAlert({ title: "Completar Viabilidad Traslado", icon: IconAlerts.error, message: "Ocurrio un error al guardar el detalle de la informacion de la tarea.Error=" + JSON.stringify(error.message) })    })

  }

}
