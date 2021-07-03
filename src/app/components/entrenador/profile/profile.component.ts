import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Instructor } from 'src/app/interfaces/instructor';
import { Usuario } from 'src/app/interfaces/usuario';
import { ImageService } from 'src/app/services/image.service';
import { InstructoresService } from 'src/app/services/instructores.service';
import { LoginService } from 'src/app/services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public usuario: Usuario;
  public userForm: any;
  public instructor: Instructor;
  public image: any;
  public foto: string;
  public progress: number = 0;
  public password!: string;

  constructor(
    private formBuilder: FormBuilder,
    private imageService: ImageService,
    private instructoresService: InstructoresService,
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    this.instructor = this.usuario.instructor
    this.userForm = this.formBuilder.group({
      usuario: [{value: this.usuario.usuario, disabled: true}, [Validators.required]],
      password: [this.usuario.password, [Validators.required]],
      nombres: [this.instructor.nombres, [Validators.required]],
      apellidos: [this.instructor.apellidos, [Validators.required]],
      dni: [this.instructor.dni, [Validators.required]],
      celular: [this.instructor.celular, [Validators.required]],
      titulo: [this.instructor.titulo, [Validators.required]],
      cv_corto: [this.instructor.cv_corto, [Validators.required]],
      mp_access_token: [this.instructor.mp_access_token, [Validators.required]],
      mp_public_key: [this.instructor.mp_public_key, [Validators.required]],
    })
  }

  editar(){
    if(this.password === this.usuario.password){
      let instructor = {
        id_instructores: this.instructor.id_instructores,
        id_usuarios: null,
        estado_eliminacion: null,
        email: this.instructor.email,
        nombres: this.userForm.get('nombres').value,
        apellidos: this.userForm.get('apellidos').value,
        dni: this.userForm.get('dni').value,
        celular: this.userForm.get('celular').value,
        titulo: this.userForm.get('titulo').value,
        cv_corto: this.userForm.get('cv_corto').value,
        mp_access_token: this.userForm.get('mp_access_token').value,
        mp_public_key: this.userForm.get('mp_public_key').value,
        foto_perfil: (this.foto) ? this.foto : this.instructor.foto_perfil
      }
      let usuario = {
        instructor: instructor,
        usuario: this.userForm.get('usuario').value,
        password: this.userForm.get('password').value,
      }
      if(usuario.password != this.usuario.password){
        let user = {
          id_usuarios: this.usuario.id_usuarios,
          password: usuario.password,
          activo: 1
        }
        this.usuariosService.putUsuario(user).subscribe(
          response => {
            if(response.ok){
              this.snackBar.open(
                'Datos actualizados correctamente, debe entrar de nuevo al sistema',
                'Aceptar',
                {
                  horizontalPosition: 'end',
                  duration: 2000
                }
              )
              setTimeout(() => {
                localStorage.removeItem('usuario')
                this.router.navigate(['login'])
              }, 3000);
            }else{
              this.snackBar.open(
                'Ocurrio un error, intente más tarde',
                'Aceptar',
                {
                  horizontalPosition: 'end',
                  duration: 5000
                }
              )
            }
          }
        )
      }else{
        this.instructoresService.putInstructor(instructor).subscribe(
          response => {
            if(response.ok){
              this.snackBar.open(
                'Datos actualizados correctamente',
                'Aceptar',
                {
                  horizontalPosition: 'end',
                  duration: 5000
                }
              )
              this.reLogin()
            }else{
              this.snackBar.open(
                'Ocurrio un error, intente más tarde',
                'Aceptar',
                {
                  horizontalPosition: 'end',
                  duration: 5000
                }
              )
            }
            
          }
        )
      }
    }else{
      this.snackBar.open(
        'Contraseña incorrecta!',
        'Aceptar',
        {
          horizontalPosition: 'end',
          duration: 5000
        }
      )
    }
    
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
              this.foto = event.body.data.thumb.url;
              this.progress = 0;
          }
        }
      )
    }
  }

  openDialog(templateRef: TemplateRef<any>){
    this.password = null
    this.dialog.open(templateRef)
  }

  reLogin(){
    let usuario = {
      id_usuarios: this.usuario.id_usuarios,
      usuario: this.usuario.usuario,
      password: this.usuario.password,
      token: null,
      instructor: null
    }

    this.loginService.login(usuario).subscribe(
      response => {
        usuario.token = response.token
        usuario.instructor = response.instructor
        usuario.password = response.password
        localStorage.setItem('usuario',JSON.stringify(usuario))
        window.location.reload();
      }
    )
  }

}
