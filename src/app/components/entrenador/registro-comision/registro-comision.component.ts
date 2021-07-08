import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Curso } from 'src/app/interfaces/curso';
import { ComisionesService } from 'src/app/services/comisiones.service';

@Component({
  selector: 'app-registro-comision',
  templateUrl: './registro-comision.component.html',
  styleUrls: ['./registro-comision.component.scss']
})
export class RegistroComisionComponent implements OnInit {

  comisionForm: any;
  curso!: Curso;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {curso: Curso},
    private comisionesService: ComisionesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.curso = this.data.curso;
  }

  ngOnInit(): void {
    this.comisionForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      horario_dias: ['', [Validators.required]],
      cupo: ['', [Validators.required]],
      id_cursos: [this.data.curso.id_cursos]
    })
  }

  nuevo(){
    let comision = {
      nombre: this.comisionForm.get('nombre').value,
      descripcion: this.comisionForm.get('descripcion').value,
      horario_dias: this.comisionForm.get('horario_dias').value,
      cupo: this.comisionForm.get('cupo').value,
      id_cursos: this.comisionForm.get('id_cursos').value,
    };

    this.comisionesService.postComision(comision).subscribe(
      response => {
        if(response.ok){
          this.snackBar.open("Comision agregada correctamente",'Aceptar',{
            duration: 1000,
            horizontalPosition: 'end'
          })
        }
        setTimeout(() => {
          this.dialog.closeAll()
        }, 1500);
      }
    )
  }

}
