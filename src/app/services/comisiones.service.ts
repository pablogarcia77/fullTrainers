import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comision } from '../interfaces/comision';
import { Curso } from '../interfaces/curso';
import { Instructor } from '../interfaces/instructor';

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
export class ComisionesService {

  // URL Base
  private urlBase = environment.url_servicios_base;

  // Variables de URL API REST
  private apiGetComisiones = this.urlBase + '/comisiones/';
  private apiGetComisionesCurso = this.urlBase + '/comisiones/curso/';
  private apiPostComisiones = this.urlBase + '/comisiones/';
  private apiPutComisiones = this.urlBase + '/comisiones/';
  private apiDeleteComisiones = this.urlBase + '/comisiones/';

  constructor(
    public http: HttpClient
  ) { }

  getComisiones():Observable<any>{
    return this.http.get(this.apiGetComisiones);
  }

  getComision(curso: Curso):Observable<any>{
    return this.http.get(this.apiGetComisionesCurso + curso.id_cursos);
  }
  postComision(comision: any):Observable<any>{
    const newSession = Object.assign({},comision);
    return this.http.post<any[]>(this.apiPostComisiones,newSession,cudOptions);
  }

}
