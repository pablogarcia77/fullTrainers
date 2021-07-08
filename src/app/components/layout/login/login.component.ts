import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    public router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
    this.checkLogged()
  }

  login(){
    let usuario = {
      id_usuarios: null,
      usuario: this.loginForm.get('usuario').value,
      password: this.loginForm.get('password').value,
      token: null,
      instructor: null
    }

    this.loginService.login(usuario).subscribe(
      response => {
        usuario.id_usuarios = response.id_usuarios
        usuario.token = response.token
        usuario.instructor = response.instructor
        usuario.password = response.password
        localStorage.setItem('usuario',JSON.stringify(usuario))
        this.router.navigate(['panel/dashboard'])
      },
      () => {
        this.snackBar.open("Usuario o Contraseña incorrecto",'Aceptar',{
          duration: 5000
        })
      }
    )
  }

  checkLogged(){
    if(JSON.parse(localStorage.getItem('usuario'))){
      this.router.navigate(['panel/dashboard'])
    }
  }

  volver(){
    window.open('http://localhost/trainers/','_self')
  }
}
