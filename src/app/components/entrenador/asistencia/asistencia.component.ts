import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Asistencia } from 'src/app/interfaces/asistencia';
import { Inscripcion } from 'src/app/interfaces/inscripcion';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { InscripcionesService } from 'src/app/services/inscripciones.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss']
})
export class AsistenciaComponent implements OnInit {

  public inscripciones: Array<Inscripcion>

  public dataSource: MatTableDataSource<Inscripcion>;

  public asistencia: Array<Asistencia>

  public comision!: number;

  public selected!: Date;

  public present!: Asistencia;

  public displayedColumns: string[] = ['apellidos','nombres','acciones'];  

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  
  constructor(
    private route: ActivatedRoute,
    private inscripcionesService: InscripcionesService,
    private asistenciaService: AsistenciaService
  ) {
    this.inscripciones = new Array<Inscripcion>();
    this.dataSource = new MatTableDataSource();
    this.asistencia = new Array<Asistencia>();
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.comision = params.id_comisiones;
        this.inscripcionesService.getInscripciones(params.id_comisiones).subscribe(
          response => {
            this.inscripciones = response
            this.dataSource = new MatTableDataSource(this.inscripciones)
            this.dataSource.sort = this.sort
            this.dataSource.paginator = this.paginator
          }
        )
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

  presente(event, alumno: any){

    let asist = {
      alumnos_id: alumno.alumnos_id,
      id_comisiones: this.comision
    }

    if(event.checked){
      this.asistencia.push(asist)
    }else{

      this.asistencia.forEach(
        (alumn,index) => {
          if(alumn.alumnos_id == alumno.alumnos_id){
            this.asistencia.splice(index,1)
          }
        }
      )
    }
  }

  saveAsistencia(){
    this.asistenciaService.postAsistencias(this.asistencia).subscribe(
      response => {
        console.log(response)
      }
    )
  }
}
