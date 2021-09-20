import { AprobartareaComponent } from './pages/aprobartarea/aprobartarea.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuradicacionComponent } from './pages/menuradicacion/menuradicacion.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginComponent } from './pages/login/login.component';
import { ListarTareasComponent } from './pages/listar-tareas/listar-tareas.component';
import { MisTareasComponent } from './pages/mis-tareas/mis-tareas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthenticationGuard],},
  //{ path: 'menuradicacion', component: MenuradicacionComponent, canActivate: [AuthenticationGuard],},
  { path: 'lista-tareas', component: ListarTareasComponent, canActivate: [AuthenticationGuard], },
  { path: 'mis-tareas', component: MisTareasComponent, canActivate: [AuthenticationGuard], },
  { path: 'aprobartareas', component: AprobartareaComponent, canActivate:[AuthenticationGuard],},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
