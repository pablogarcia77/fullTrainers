import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';

// Encabezados HTTP
const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // URL Base
  private urlBase = environment.url_servicios_base;

  // Variables de URL API REST
  private apiLogin = this.urlBase + '/login/';

  constructor(
    public http: HttpClient
  ) { }

  login(usuario: Usuario):Observable<any>{
    const newSession = Object.assign({},usuario);
    return this.http.post(this.apiLogin,newSession,cudOptions)
  }
}
