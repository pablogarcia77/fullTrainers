import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/interfaces/alumno';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { EditarAlumnoComponent } from '../editar-alumno/editar-alumno.component';
import { EliminarAlumnoComponent } from '../eliminar-alumno/eliminar-alumno.component';
import { RegistroAlumnoComponent } from '../registro-alumno/registro-alumno.component';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent{

  dataSource: MatTableDataSource<Alumno>;

  alumnos: Array<Alumno>;

  displayedColumns: string[] = ['id_alumno', 'nombres', 'apellidos', 'dni', 'celular','mail','direccion_calle','direccion_numero','direccion_barrio','direccion_localidad', 'acciones'];

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  
  constructor(
    private alumnoService: AlumnosService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
    this.alumnos = new Array<Alumno>();
  }

  ngOnInit(): void {
    this.alumnoService.getAlumnos().subscribe(
      response => {
        this.alumnos = response;
        this.dataSource = new MatTableDataSource(this.alumnos);
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        // console.log(this.alumnos);
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  registrarAlumno(){
    this.dialog.open(
      RegistroAlumnoComponent,
      {
        width: '40%',
      }
    )
  }

  editarAlumno(alumno: Alumno){
    this.dialog.open(
      EditarAlumnoComponent,
      {
        data: {
          alumno
        }
      }
      )
  }

  eliminarAlumno(alumno: Alumno){
    this.dialog.open(
      EliminarAlumnoComponent,
      {
        data: {
          alumno
        }
      }
      )
  }
}
