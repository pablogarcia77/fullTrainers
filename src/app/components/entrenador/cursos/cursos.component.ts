import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Curso } from 'src/app/interfaces/curso';
import { CursosService } from 'src/app/services/cursos.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistroCursoComponent } from '../registro-curso/registro-curso.component';
import { EditarCursoComponent } from '../editar-curso/editar-curso.component';
import { EliminarCursoComponent } from '../eliminar-curso/eliminar-curso.component';
import { DetalleComisionComponent } from '../detalle-comision/detalle-comision.component';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent{

  dataSource: MatTableDataSource<Curso>;

  displayedColumns: string[] = ['id_cursos', 'nombre', 'habilita_inscripcion', 'estado_publicacion', 'precio_inscripcion','precio_cuota','acciones'];

  cursos: Array<Curso>;

  inscripcion!: any;

  public usuario: Usuario;

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  constructor(
    private cursosService: CursosService,
    public dialog: MatDialog
  ) {
    this.cursos = new Array<Curso>();
    this.dataSource = new MatTableDataSource();

  }


  ngOnInit(): void {

    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    
    this.cursos = new Array<Curso>();
    this.cursosService.getCursosByInstructor(this.usuario.instructor.id_instructores).subscribe(
      response => {
        // console.log(response.rows);
        this.cursos = response.rows;
        this.dataSource = new MatTableDataSource(this.cursos)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }
    )
  }

  // ngAfterViewInit() {
  //   setTimeout(() => this.dataSource.sort = this.sort);
  //   setTimeout(() => this.dataSource.paginator = this.paginator);
  //   console.log(this.sort);
  // }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  registrarCurso(){
    this.dialog.open(
      RegistroCursoComponent,
        {
          width: '40%',
        }
      )
  }

  editarCurso(curso: Curso){
    this.dialog.open(
      EditarCursoComponent,
      {
        data: {curso},
      }
    )
  }

  eliminarCurso(curso: Curso){
    this.dialog.open(
      EliminarCursoComponent,
      {
        data: {
          curso
        },
      }
    )
  }

  verComisiones(curso: Curso){
    this.dialog.open(
      DetalleComisionComponent,
      {
        data: {
          curso
        },
        width: '40%'
      }
    )
  }

  habilitarInscripcion(curso: Curso){
    // console.log('antes',curso)
    curso.habilita_inscripcion = (curso.habilita_inscripcion == 1) ? 0 : 1;
    // console.log('despues',curso)
    this.cursosService.putCurso(curso).subscribe(
      response => {
        console.log(response)
      }
    )
  }

  publicarCurso(curso: Curso){
    curso.estado_publicacion = (curso.estado_publicacion == 1) ? 0 : 1;
    this.cursosService.putCurso(curso).subscribe(
      response => {
        console.log(response)
      }
    )
  }

}
