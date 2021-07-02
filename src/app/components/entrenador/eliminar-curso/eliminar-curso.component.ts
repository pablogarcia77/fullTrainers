import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-eliminar-curso',
  templateUrl: './eliminar-curso.component.html',
  styleUrls: ['./eliminar-curso.component.scss']
})
export class EliminarCursoComponent implements OnInit {

  public nombre: string;
  public estado: boolean = false;
  public id: number;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {nombre: string,id:number},
    private cursosService: CursosService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.nombre = this.data.nombre;
    this.id = this.data.id;
  }

  ngOnInit(): void {
    
  }

  eliminarCurso(){
    
    this.cursosService.deleteCurso(this.id).subscribe(
      () => {
        this.estado = true;
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
