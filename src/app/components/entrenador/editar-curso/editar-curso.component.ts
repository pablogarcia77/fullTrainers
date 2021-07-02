import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Curso } from 'src/app/interfaces/curso';
import { Subrubro } from 'src/app/interfaces/subrubro';
import { CursosService } from 'src/app/services/cursos.service';
import { ImageService } from 'src/app/services/image.service';
import { SubrubrosService } from 'src/app/services/subrubros.service';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.scss']
})
export class EditarCursoComponent implements OnInit {

  public curso: Curso;

  public progress: number = 0;

  public image!:any;

  cursoForm: any;

  estado: boolean | undefined;

  selected: any;

  public subrubros!: Array<Subrubro>

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {curso: Curso},
    private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private subrubrosService: SubrubrosService,
    private router: Router,
    public dialog: MatDialog,
    private imageService: ImageService
  ) {
    this.curso = this.data.curso;
    this.subrubros = new Array<Subrubro>();

   
  }
  
  ngOnInit(): void {

    // this.subrubrosService.getSubrubros().subscribe(
    //   response => {
    //     this.subrubros = response;
    //     this.selected = this.subrubros.find(
    //       (element: Subrubro) => element.id_subrubros == this.curso.id_subrubros
    //     )
    //     console.log(this.selected)
    //   }
    // ) 


    this.selected = this.obtainSelected().then(
      res => {
        this.selected = res
        console.log(this.selected)
        this.cursoForm = this.formBuilder.group({
          nombre: [this.curso.nombre, [Validators.required]],
          descripcion: [this.curso.descripcion, [Validators.required]],
          publico_destinado: [this.curso.publico_destinado, [Validators.required]],
          requisitos: [this.curso.requisitos, [Validators.required]],
          url_imagen_presentacion: [this.curso.url_imagen_presentacion, [Validators.required]],
          url_video_presentacion: [this.curso.url_video_presentacion, [Validators.required]],
          precio_inscripcion: [this.curso.precio_inscripcion, [Validators.required]],
          precio_cuota: [this.curso.precio_cuota, [Validators.required]],
          cantidad_cuotas: [this.curso.cantidad_cuotas, [Validators.required]],
          subrubro: [this.selected.id_subrubros]
        })
      }
    )
    console.log(this.selected)
    
    
    
  }

  async getCurso():Promise<any>{
    return await this.subrubrosService.getSubrubros().toPromise();
  }

  async obtainSelected(): Promise<Subrubro>{
    let array = new Array<Subrubro>();
    array = await this.getCurso();
    return array.find(
      (element: Subrubro) => element.id_subrubros == this.curso.id_subrubros
    )
  }

  editarCurso(){
    this.curso.nombre = this.cursoForm.get('nombre').value,
    this.curso.descripcion = this.cursoForm.get('descripcion').value,
    this.curso.publico_destinado = this.cursoForm.get('publico_destinado').value,
    this.curso.requisitos = this.cursoForm.get('requisitos').value,
    this.curso.url_imagen_presentacion = this.cursoForm.get('url_imagen_presentacion').value,
    this.curso.url_video_presentacion = this.cursoForm.get('url_video_presentacion').value,
    this.curso.precio_inscripcion = this.cursoForm.get('precio_inscripcion').value,
    this.curso.precio_cuota = this.cursoForm.get('precio_cuota').value,
    this.curso.cantidad_cuotas = this.cursoForm.get('cantidad_cuotas').value,
    this.curso.id_subrubros = this.selected.id_subrubros,
    // console.log(this.curso);
    this.cursosService.putCurso(this.curso).subscribe(
      response => {
        // console.log(response.ok);
        this.estado = (response.ok) ? true : false;
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

  setSubrubro(id:number){
    this.curso.id_subrubros = Number(id);
  }

  readThis(event: any): void {
    let file: File = event.target.files[0];
    let myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = e => {
      this.image = myReader.result;
      // console.log(this.image);
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
      // console.log(imageSinDescripcion);
      this.imageService.uploadImage(imageSinDescripcion).subscribe(

        (event: HttpEvent<any>) =>{
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              // console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              // console.log(event.body);
              this.curso.url_imagen_presentacion = event.body.data.url;
              this.progress = 0;
          }
        }
      )
    }
  }
}
