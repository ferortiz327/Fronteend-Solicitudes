import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { StorageKeys } from 'src/app/global/constants/GlobalEnums';
import { ITaskDetail } from 'src/app/interfaces/ITaskDetail';
import { IUserDetail } from 'src/app/interfaces/IUserDetail';
import { BonitaService } from 'src/app/services/bonita.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viabilidadtraslado',
  templateUrl: './viabilidad-traslado.component.html',
  styleUrls: ['./viabilidad-traslado.component.css']
})
export class ViabilidadTrasladoComponent implements OnInit {
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

  }


}
