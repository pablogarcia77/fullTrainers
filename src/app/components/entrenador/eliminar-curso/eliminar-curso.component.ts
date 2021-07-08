import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Curso } from 'src/app/interfaces/curso';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-eliminar-curso',
  templateUrl: './eliminar-curso.component.html',
  styleUrls: ['./eliminar-curso.component.scss']
})
export class EliminarCursoComponent implements OnInit {

  public curso: Curso;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {curso: Curso},
    private cursosService: CursosService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.curso = this.data.curso;
  }

  ngOnInit(): void {
    
  }

  eliminarCurso(){
    
    this.cursosService.deleteCurso(this.curso).subscribe(
      () => {
        this.snackBar.open("Curso eliminado",'Aceptar',{
          duration: 1000,
          horizontalPosition: 'end'
        })
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
