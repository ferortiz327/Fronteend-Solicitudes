import { Component, OnInit } from '@angular/core';
import { BonitaService } from 'src/app/services/bonita.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-menuradicacion',
  templateUrl: './menuradicacion.component.html',
  styleUrls: ['./menuradicacion.component.css']
})
export class MenuradicacionComponent implements OnInit {

  constructor(private bonitaService: BonitaService,private sessionStorage: SessionStorageService) { }

  mostrarmenu: boolean = false;

  ngOnInit(): void {
    this.bonitaService.mostramenu.subscribe({
      next: resultado =>this.mostrarmenu=resultado
    });


  }

}
