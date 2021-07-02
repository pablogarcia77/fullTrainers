import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Inscripcion } from 'src/app/interfaces/inscripcion';
import { InscripcionesService } from 'src/app/services/inscripciones.service';

@Component({
  selector: 'app-comision',
  templateUrl: './comision.component.html',
  styleUrls: ['./comision.component.scss']
})
export class ComisionComponent implements OnInit {

  public inscripciones: Array<Inscripcion>

  public dataSource: MatTableDataSource<Inscripcion>;

  public displayedColumns: string[] = ['apellidos','nombres','dni','celular','mail','fecha','direccion_calle','direccion_numero','direccion_barrio','direccion_localidad','estado_pago'];

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private inscripcionesService: InscripcionesService
  ) {
    this.inscripciones = new Array<Inscripcion>();
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
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

}
