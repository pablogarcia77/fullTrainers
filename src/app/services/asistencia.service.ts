import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
export class AsistenciaService {
 
  // URL Base
  private urlBase = environment.url_servicios_base;

  // Variables de URL API REST
  private apiGetAsistencias = this.urlBase + '/asistencias/';
  private apiPostAsistencias = this.urlBase + '/asistencias/';
  private apiPutAsistencias = this.urlBase + '/asistencias/';
  private apiDeleteAsistencias = this.urlBase + '/asistencias/';

  constructor(
    public http: HttpClient
  ) { }

  getAsistencias():Observable<any>{
    return this.http.get(this.apiGetAsistencias);
  }

  postAsistencias(arrayAlumnos: any):Observable<any>{
    return this.http.post<any[]>(this.apiPostAsistencias,arrayAlumnos,cudOptions);
  }

}
