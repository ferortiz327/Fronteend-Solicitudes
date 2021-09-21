import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ListarTareasComponent } from './pages/listar-tareas/listar-tareas.component';
import { DataTablesModule } from 'angular-datatables';
import { MisTareasComponent } from './pages/mis-tareas/mis-tareas.component';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from "@angular/common";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { MenuradicacionComponent } from './pages/menuradicacion/menuradicacion.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AprobartareaComponent } from './pages/aprobartarea/aprobartarea.component';
import { AsesorllamaComponent } from './pages/asesorllama/asesorllama.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ListarTareasComponent,
    MisTareasComponent,
    MenuradicacionComponent,
    InicioComponent,
    AprobartareaComponent,
    AsesorllamaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    CommonModule,
    BsDatepickerModule.forRoot(),
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
