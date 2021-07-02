import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-registro-alumno',
  templateUrl: './registro-alumno.component.html',
  styleUrls: ['./registro-alumno.component.scss']
})
export class RegistroAlumnoComponent implements OnInit {

  alumnoForm: any;

  estado: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private alumnosService: AlumnosService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.alumnoForm = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      mail: ['', [Validators.required,Validators.email]],
      direccion_calle: ['', [Validators.required]],
      direccion_numero: ['', [Validators.required]],
      direccion_barrio: ['', [Validators.required]],
      direccion_localidad: ['', [Validators.required]],
    })
  }

  nuevo(){
    let alumno = {
      nombres: this.alumnoForm.get('nombres').value,
      apellidos: this.alumnoForm.get('apellidos').value,
      dni: this.alumnoForm.get('dni').value,
      celular: this.alumnoForm.get('celular').value,
      mail: this.alumnoForm.get('mail').value,
      // Hay conflictos con estos campos, envía null
      direccion_calle: this.alumnoForm.get('direccion_calle').value.toUpperCase(),
      direccion_numero: this.alumnoForm.get('direccion_numero').value,
      direccion_barrio: this.alumnoForm.get('direccion_barrio').value.toUpperCase(),
      direccion_localidad: this.alumnoForm.get('direccion_localidad').value.toUpperCase(),
    };

    // console.log(alumno)
    
    this.alumnosService.postAlumno(alumno).subscribe(
      response => {
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
