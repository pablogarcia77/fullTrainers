import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
export class InstructoresService {

  // URL Base
  private urlBase = environment.url_servicios_base;

  // Variables de URL API REST
  private apiPutInstructores = this.urlBase + '/instructores/';

  constructor(
    public http: HttpClient
  ) { }

  putInstructor(instructor: Instructor):Observable<any>{
    const newSession = Object.assign({},instructor);
    return this.http.put<any[]>(this.apiPutInstructores + instructor.id_instructores, newSession, cudOptions);
  }
}
