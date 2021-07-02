import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private API_KEY = "7d1a50f555fe717b15052f2acfacd602";

  // URL Base
  private urlBase = "https://api.imgbb.com/1/upload";


  constructor(
    public http: HttpClient
  ) { }

  uploadImage(image: string):Observable<any>{
    const fd = new FormData();
    fd.append("image",image);
    return this.http.post(this.urlBase + '?key=' + this.API_KEY,fd,{reportProgress: true,observe: 'events'})
  }
}
