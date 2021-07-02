import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/interfaces/alumno';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-eliminar-alumno',
  templateUrl: './eliminar-alumno.component.html',
  styleUrls: ['./eliminar-alumno.component.scss']
})
export class EliminarAlumnoComponent implements OnInit {

  public alumno!: Alumno;
  public estado: boolean | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {alumno: Alumno},
    private alumnosService: AlumnosService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.alumno = this.data.alumno;
  }

  ngOnInit(): void {
  }

  eliminarAlumno(){
    // Nota: si mandó un id (number) devuelve ok:true, pero no elimina el registro
    this.alumnosService.deleteAlumno(this.alumno.dni).subscribe(
      response => {
        // console.log(response);
        this.estado = (response.ok) ? true : false;
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        setTimeout(() => {
          this.router.navigate([currentUrl]);
          this.dialog.closeAll();
        }, 1200);
      }
    )
  }

}
