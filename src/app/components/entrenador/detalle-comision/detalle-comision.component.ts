import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comision } from 'src/app/interfaces/comision';
import { Curso } from 'src/app/interfaces/curso';
import { ComisionesService } from 'src/app/services/comisiones.service';
import { RegistroComisionComponent } from '../registro-comision/registro-comision.component';

@Component({
  selector: 'app-detalle-comision',
  templateUrl: './detalle-comision.component.html',
  styleUrls: ['./detalle-comision.component.scss']
})
export class DetalleComisionComponent implements OnInit {

  public comisiones!: Array<Comision>;
  public curso!: Curso;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {curso: Curso},
    private comisionesService: ComisionesService,
    public dialog: MatDialog
  ) {
    this.comisiones = new Array<Comision>();
    this.curso = this.data.curso;
  }

  ngOnInit(): void {

    this.comisionesService.getComision(this.curso).subscribe(
      response => {
        this.comisiones = response.rows;
      }
    )
  }

  nuevaComision(){
    this.dialog.open(
      RegistroComisionComponent,
      {
        data: {
          curso: this.curso
        },
        width: '40%'
      }
    )
  }
  closeDialog(){
    this.dialog.closeAll();
  }
}
