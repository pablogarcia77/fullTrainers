import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  login(){
    this.loginService.login()
    this.router.navigate(['panel/dashboard'])
  }
}
