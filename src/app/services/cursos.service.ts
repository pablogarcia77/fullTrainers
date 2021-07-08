import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Curso } from '../interfaces/curso';


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
export class CursosService {

  // URL Base
  private urlBase = environment.url_servicios_base;

  // Variables de URL API REST
  private apiGetCursos = this.urlBase + '/cursos/';
  private apiGetCursosPagos = this.urlBase + '/pagos/';
  private apiGetCursosByInstructor = this.urlBase + '/cursos/instructor/';
  private apiGetCursosComisionesByInstructor = this.urlBase + '/curso/comisiones/instructor/';
  private apiPostCursos = this.urlBase + '/cursos/';
  private apiPutCursos = this.urlBase + '/cursos/';
  private apiDeleteCursos = this.urlBase + '/cursos/';

  constructor(
    public http: HttpClient
  ) { }

  getCursos():Observable<any>{
    return this.http.get(this.apiGetCursos);
  }

  getCurso(id: number):Observable<any>{
    return this.http.get(this.apiGetCursos + id);
  }

  getCursosByInstructor(id: number):Observable<any>{
    return this.http.get(this.apiGetCursosByInstructor + id)
  }

  getCursosComisionesByInstructor(id: number):Observable<any>{
    return this.http.get(this.apiGetCursosComisionesByInstructor + id)
  }

  postCursos(curso: any): Observable<any>{
    const newSession = Object.assign({},curso);
    return this.http.post<any[]>(this.apiPostCursos,newSession,cudOptions);
  }

  putCurso(curso: Curso): Observable<any>{
    const newSession = Object.assign({},curso);
    return this.http.put<any[]>(this.apiPutCursos + curso.id_cursos, newSession, cudOptions);
  }

  deleteCurso(curso: Curso):Observable<any>{
    curso.estado_eliminacion = 1;
    const newSession = Object.assign({},curso);
    return this.http.put<any[]>(this.apiPutCursos + curso.id_cursos, newSession, cudOptions);
  }

  getCursosPagos():Observable<any>{
    return this.http.get(this.apiGetCursosPagos);
  }


}
