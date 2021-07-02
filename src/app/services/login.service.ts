import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login():any{
    let instructor = {
      usuario: "pablo73",
      id_instructores: 1,
      apellidos: "Garcia",
      nombres: "Pablo",
      foto_perfil: "none",
      activo: 1
    }
    localStorage.setItem("usuario",JSON.stringify(instructor))
  }
}
