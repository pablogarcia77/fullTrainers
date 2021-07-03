import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';

// Encabezados HTTP
const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const cudOptionsXWWForm = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})
};
const cudOptionsHtml = {
  headers: new HttpHeaders({ 'Content-Type': 'text/html; charset=utf-8'})
};


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  // URL Base
  private urlBase = environment.url_servicios_base;

  // Variables de URL API REST
  private apiPutUsuarios = this.urlBase + '/Usuarios/';

  constructor(
    public http: HttpClient
  ) { }

  putUsuario(usuario: any): Observable<any>{
    const newSession = Object.assign({},usuario);
    return this.http.put<any[]>(this.apiPutUsuarios + usuario.id_usuarios, newSession, cudOptions);
  }
}
