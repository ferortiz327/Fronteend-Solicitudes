import { Component, OnInit } from '@angular/core';
import { ITaskDetail } from '../../interfaces/ITaskDetail';
import { environment } from '../../../environments/environment';
import { BonitaService } from '../../services/bonita.service';
import { SessionStorageService } from '../../services/session-storage.service';
import { IUserDetail } from '../../interfaces/IUserDetail';
import { IconAlerts, StorageKeys } from '../../global/constants/GlobalEnums';
import { AlertsTitles } from '../../global/constants/AlertsTitles';
import { AlertUtilities } from '../../shared/utilities/AlertUtilities';

@Component({
  selector: 'app-listar-tareas',
  templateUrl: './listar-tareas.component.html',
  styles: [
  ]
})
export class ListarTareasComponent implements OnInit {

  loading: boolean = true;
  listadoTareas: ITaskDetail[] = []
  dtOptions: DataTables.Settings = {};
  showTable: boolean = false
  userDetail: IUserDetail = this.sessionStorage.get(StorageKeys.USER_DETAIL)[0] as IUserDetail;

  constructor(private bonitaService: BonitaService, private sessionStorage: SessionStorageService) { }

  ngOnInit(): void {
    this.dtOptions = environment.tableConfig;
    this.loadTaskLists();
  }

  loadTaskLists(): void {
    this.bonitaService.getTaskList(this.userDetail.id || "").subscribe({
      next: result => {
        result = result.filter(x => !x.assigned_id);
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

  asignarTarea(idTarea: any): void {
    this.bonitaService.asignarTarea(Number(this.userDetail.id || ""), idTarea).subscribe({
      error: error => {
        AlertUtilities.showAlert({ title: "Asignación Tarea", icon: IconAlerts.error, message: "Ocurrio un error al asignar la tarea.Error=" + JSON.stringify(error) })
      },
      complete: () => {
        this.loadTaskLists();
        AlertUtilities.showAlert({ title: "Asignación Tarea", icon: IconAlerts.success, message: "Se asigno la tarea satisfactoriamente" })
      }
    })
  }

}
