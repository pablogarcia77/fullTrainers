import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrenadorRoutingModule } from './entrenador-routing.module';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { CursosComponent } from './cursos/cursos.component';
import { PagosComponent } from './pagos/pagos.component';
import { CursosService } from 'src/app/services/cursos.service';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { RegistroCursoComponent } from './registro-curso/registro-curso.component';
import { EditarCursoComponent } from './editar-curso/editar-curso.component';
import { EliminarCursoComponent } from './eliminar-curso/eliminar-curso.component';
import { RegistroAlumnoComponent } from './registro-alumno/registro-alumno.component';
import { EditarAlumnoComponent } from './editar-alumno/editar-alumno.component';
import { EliminarAlumnoComponent } from './eliminar-alumno/eliminar-alumno.component';
import { ComisionesComponent } from './comisiones/comisiones.component';
import { RegistroComisionComponent } from './registro-comision/registro-comision.component';
import { DetalleComisionComponent } from './detalle-comision/detalle-comision.component';
import { ComisionComponent } from './comision/comision.component';
import { ProfileComponent } from './profile/profile.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';

@NgModule({
  declarations: [
    AlumnosComponent,
    CursosComponent,
    PagosComponent,
    RegistroCursoComponent,
    EditarCursoComponent,
    EliminarCursoComponent,
    RegistroAlumnoComponent,
    EditarAlumnoComponent,
    EliminarAlumnoComponent,
    ComisionesComponent,
    RegistroComisionComponent,
    DetalleComisionComponent,
    ComisionComponent,
    ProfileComponent,
    AsistenciaComponent
  ],
  imports: [
    CommonModule,
    EntrenadorRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MaterialModule,
  ],
  providers: [
    CursosService
  ]
})
export class EntrenadorModule { }
