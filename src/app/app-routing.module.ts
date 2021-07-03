import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './components/entrenador/alumnos/alumnos.component';
import { ComisionComponent } from './components/entrenador/comision/comision.component';
import { ComisionesComponent } from './components/entrenador/comisiones/comisiones.component';
import { CursosComponent } from './components/entrenador/cursos/cursos.component';
import { PagosComponent } from './components/entrenador/pagos/pagos.component';
import { ProfileComponent } from './components/entrenador/profile/profile.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { LoginComponent } from './components/layout/login/login.component';
import { NotfoundComponent } from './components/layout/notfound/notfound.component';
import { PanelComponent } from './components/layout/panel/panel.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '404', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'panel', component: PanelComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'perfil/:id', component: ProfileComponent },
      { path: 'cursos', component: CursosComponent },
      { path: 'alumnos', component: AlumnosComponent },
      { path: 'comisiones', component: ComisionesComponent },
      { path: 'pagos', component: PagosComponent },
      { path: 'comision/:id_comisiones', component: ComisionComponent }
    ]
  },
  { path: 'registro', component: RegistroComponent },
  {
    path: 'entrenador',
    loadChildren: './components/entrenador/entrenador.module#EntrenadorModule',
  },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
