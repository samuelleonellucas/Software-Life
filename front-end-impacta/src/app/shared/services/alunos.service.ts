import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  url: any = '';

  constructor(private http: HttpClient) {
    this.url = `${environment.urls.baseuUrl}`;
  }

  list(query: any = {}) {
    const url = `${this.url}/users`;
    return this.http.get(url).toPromise();
  }
  create(body: any, query: any = {}) {
    const url = `${this.url}/user`;
    return this.http.get(url).toPromise();
  }

}
