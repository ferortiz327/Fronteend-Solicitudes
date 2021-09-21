import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { StorageKeys } from 'src/app/global/constants/GlobalEnums';
import { ITaskDetail } from 'src/app/interfaces/ITaskDetail';
import { IUserDetail } from 'src/app/interfaces/IUserDetail';
import { BonitaService } from 'src/app/services/bonita.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-asesorllama',
  templateUrl: './asesorllama.component.html',
  styleUrls: ['./asesorllama.component.css']
})
export class AsesorllamaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
