import { Component, OnInit } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { Comision } from 'src/app/interfaces/comision';
import { Curso } from 'src/app/interfaces/curso';
import { Instructor } from 'src/app/interfaces/instructor';
import { ComisionesService } from 'src/app/services/comisiones.service';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.scss']
})
export class ComisionesComponent implements OnInit {
  
  public instructor: Instructor;
  public cursos: Array<any>;
  public comisiones: Array<Comision>;

  constructor(
    private cursosService: CursosService,
    private comisionesService: ComisionesService
  ) {
    this.cursos = new Array<any>();
    this.comisiones = new Array<Comision>();
  }

  ngOnInit(): void {
    this.instructor = JSON.parse(localStorage.getItem("usuario"))
    console.log(this.instructor)
    this.cursosService.getCursosComisionesByInstructor(this.instructor.id_instructores).subscribe(
      response => {
        this.cursos = response.cursos;
        console.log(this.cursos)
      }
    )
  
  
  
  }



}
