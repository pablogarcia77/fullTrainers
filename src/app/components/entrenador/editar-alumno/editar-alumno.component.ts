import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/interfaces/alumno';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.scss']
})
export class EditarAlumnoComponent implements OnInit {

  alumnoForm: any;

  alumno: Alumno;

  estado: boolean | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {alumno: Alumno},
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private alumnosService: AlumnosService
  ) {
    this.alumno = this.data.alumno;
  }

  ngOnInit(): void {
    this.alumnoForm = this.formBuilder.group({
      nombres: [this.alumno.nombres, [Validators.required]],
      apellidos: [this.alumno.apellidos, [Validators.required]],
      dni: [this.alumno.dni, [Validators.required]],
      celular: [this.alumno.celular, [Validators.required]],
      mail: [this.alumno.mail, [Validators.required,Validators.email]],
      direccion_calle: [this.alumno.direccionCalle, [Validators.required]],
      direccion_numero: [this.alumno.direccionNumero, [Validators.required]],
      direccion_barrio: [this.alumno.direccionBarrio, [Validators.required]],
      direccion_localidad: [this.alumno.direccionLocalidad, [Validators.required]],
    })
  }

  editarAlumno(){
    this.alumno.nombres = this.alumnoForm.get('nombres').value,
    this.alumno.apellidos = this.alumnoForm.get('apellidos').value,
    this.alumno.dni = this.alumnoForm.get('dni').value,
    this.alumno.celular = this.alumnoForm.get('celular').value,
    this.alumno.mail = this.alumnoForm.get('mail').value,
    this.alumno.direccionCalle = this.alumnoForm.get('direccion_calle').value,
    this.alumno.direccionNumero = this.alumnoForm.get('direccion_numero').value,
    this.alumno.direccionBarrio = this.alumnoForm.get('direccion_barrio').value,
    this.alumno.direccionLocalidad = this.alumnoForm.get('direccion_localidad').value,
    // console.log(this.curso);
    // Nota: al parecer no esta habilitado el método PUT en backend
    this.alumnosService.putAlumno(this.alumno.alumnos_id,this.alumno).subscribe(
      response => {
        // console.log(response.ok);
        this.estado = (response.ok) ? true : false;
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        setTimeout(() => {
          this.router.navigate([currentUrl]);
          this.dialog.closeAll();
        }, 1200);
      },
      error => {
        this.estado = false;
        setTimeout(() => {
          this.dialog.closeAll();
        }, 1200);
      }
    )
  }

}
