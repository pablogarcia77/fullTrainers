import { Component, OnInit } from '@angular/core';
import { Instructor } from 'src/app/interfaces/instructor';
import { Usuario } from 'src/app/interfaces/usuario';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public usuario: Usuario;
  public instructor: Instructor;
  public cursos: Array<any>;

  constructor(
    private cursosService: CursosService
  ) {
    this.cursos = new Array<any>();
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    this.instructor = this.usuario.instructor


    this.cursosService.getCursosPagos().subscribe(
      response => {
        console.log(response)
        this.cursos = response
      }
    )

    this.cursosService.getCursosByInstructor(this.instructor.id_instructores).subscribe(
      response => {
        console.log(response.rows)
      }
    )
  }

}
