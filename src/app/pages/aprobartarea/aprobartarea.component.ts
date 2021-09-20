import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { StorageKeys } from 'src/app/global/constants/GlobalEnums';
import { ITaskDetail } from 'src/app/interfaces/ITaskDetail';
import { IUserDetail } from 'src/app/interfaces/IUserDetail';
import { BonitaService } from 'src/app/services/bonita.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { environment } from 'src/environments/environment';

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
    this.cargarMiAgenda();
  }

  cargarMiAgenda(): void {
    this.bonitaService.getTaskListAgneda(this.userDetail.id || "").subscribe({
      next: result => {
        result = result.filter(x => this.userDetail.id == x.assigned_id);
        console.log(this.userDetail.id)
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
}
