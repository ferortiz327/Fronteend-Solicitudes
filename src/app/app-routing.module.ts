import { AsesorarClienteComponent } from './pages/asesorar-cliente/asesorar-cliente.component';
import { AgendarVisitaComponent } from './pages/agendar-visita/agendar-visita.component';
import { DarAconocerComponent } from './pages/dar-aconocer/dar-aconocer.component';
import { DobleasesoriaComponent } from './pages/dobleasesoria/dobleasesoria.component';
import { ViabilidadTrasladoComponent } from './pages/viabilidad-traslado/viabilidad-traslado.component';
import { AprobartareaComponent } from './pages/aprobartarea/aprobartarea.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuradicacionComponent } from './pages/menuradicacion/menuradicacion.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginComponent } from './pages/login/login.component';
import { ListarTareasComponent } from './pages/listar-tareas/listar-tareas.component';
import { MisTareasComponent } from './pages/mis-tareas/mis-tareas.component';
import { AsesorllamaComponent } from './pages/asesorllama/asesorllama.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthenticationGuard],},
  //{ path: 'menuradicacion', component: MenuradicacionComponent, canActivate: [AuthenticationGuard],},
  { path: 'listar-tareas', component: ListarTareasComponent, canActivate: [AuthenticationGuard], },
  { path: 'mis-tareas', component: MisTareasComponent, canActivate: [AuthenticationGuard], },
  { path: 'aprobartareas', component: AprobartareaComponent, canActivate:[AuthenticationGuard],},
  { path: 'asesorllama', component: AsesorllamaComponent, canActivate:[AuthenticationGuard],},
  { path: 'viabilidad-traslado', component: ViabilidadTrasladoComponent, canActivate:[AuthenticationGuard],},
  { path: 'dobleasesoria', component: DobleasesoriaComponent, canActivate:[AuthenticationGuard],},
  { path: 'dar-aconocer', component: DarAconocerComponent, canActivate:[AuthenticationGuard],},
  { path: 'asesorar-cliente', component: AsesorarClienteComponent, canActivate:[AuthenticationGuard],},
  { path: 'agendar-visita', component: AgendarVisitaComponent, canActivate:[AuthenticationGuard],},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
