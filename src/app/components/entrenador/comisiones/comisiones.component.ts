import { Component, OnInit } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { Comision } from 'src/app/interfaces/comision';
import { Usuario } from 'src/app/interfaces/usuario';
import { ComisionesService } from 'src/app/services/comisiones.service';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.scss']
})
export class ComisionesComponent implements OnInit {
  
  public usuario: Usuario;
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
    this.usuario = JSON.parse(localStorage.getItem("usuario"))
    let id = this.usuario.instructor.id_instructores
    this.cursosService.getCursosComisionesByInstructor(id).subscribe(
      response => {
        this.cursos = response.cursos;
      }
    )
  
  
  
  }



}
