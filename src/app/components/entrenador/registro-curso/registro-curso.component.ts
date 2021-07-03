import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subrubro } from 'src/app/interfaces/subrubro';
import { CursosService } from 'src/app/services/cursos.service';
import { ImageService } from 'src/app/services/image.service';
import { SubrubrosService } from 'src/app/services/subrubros.service';

@Component({
  selector: 'app-registro-curso',
  templateUrl: './registro-curso.component.html',
  styleUrls: ['./registro-curso.component.scss']
})
export class RegistroCursoComponent implements OnInit {

  cursoForm: any;

  selected: any;

  public progress: number = 0;

  public foto: string;

  public image!:any;

  public subrubros!: Array<Subrubro>

  constructor(
    private cursosService: CursosService,
    private subrubrosService: SubrubrosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private imageService: ImageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

    this.subrubrosService.getSubrubros().subscribe(
      response => {
        this.subrubros = response;
        // console.log(this.subrubros)
      }
    )


    this.cursoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      publico_destinado: ['', [Validators.required]],
      requisitos: ['', [Validators.required]],
      url_imagen_presentacion: ['', [Validators.required]],
      url_video_presentacion: ['', [Validators.required]],
      habilita_inscripcion: false,
      precio_inscripcion: ['', [Validators.required]],
      precio_cuota: ['', [Validators.required]],
      cantidad_cuotas: ['', [Validators.required]],
      subrubro: ['']
    })
  }

  nuevo() {
    // console.log(this.cursoForm.value);
    // console.log(this.selected);


    // console.log('Campos llenos OK');

    let curso = {
        nombre: this.cursoForm.get('nombre').value,
        descripcion: this.cursoForm.get('descripcion').value,
        publico_destinado: this.cursoForm.get('publico_destinado').value,
        requisitos: this.cursoForm.get('requisitos').value,
        url_imagen_presentacion: this.foto,
        url_video_presentacion: this.cursoForm.get('url_video_presentacion').value,
        precio_inscripcion: this.cursoForm.get('precio_inscripcion').value,
        precio_cuota: this.cursoForm.get('precio_cuota').value,
        cantidad_cuotas: this.cursoForm.get('cantidad_cuotas').value,
        id_subrubros: this.selected.id_subrubros
    };
    // console.log(curso);

    this.cursosService.postCursos(curso).subscribe( 
      () => {
        this.snackBar.open('Curso creado correctamente','Aceptar',
          {
            duration: 5000,
            horizontalPosition: 'end'
          }
        )
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        setTimeout(() => {
          this.router.navigate([currentUrl]);
          this.dialog.closeAll();
        }, 1200);
      }
    );


        
  }

  readThis(event: any): void {
    let file: File = event.target.files[0];
    let myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = e => {
      this.image = myReader.result;
      let imageSinDescripcion = '';
      if(this.image.includes('data:image/png;base64,')){
        imageSinDescripcion = this.image.replace('data:image/png;base64,','');
      }
      if(this.image.includes('data:image/jpeg;base64,/9j/')){
        console.log('jpg/jpeg')
        imageSinDescripcion = this.image.replace('data:image/jpeg;base64,/9j/','');
      }
      if(this.image.includes('data:image/gif;base64,')){
        imageSinDescripcion = this.image.replace('data:image/gif;base64,','');
      }
      this.imageService.uploadImage(imageSinDescripcion).subscribe(

        (event: HttpEvent<any>) =>{
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);

              break;
            case HttpEventType.Response:
              this.foto = event.body.data.url;
              this.progress = 0;
          }
        }
      )
    }
  }

}
