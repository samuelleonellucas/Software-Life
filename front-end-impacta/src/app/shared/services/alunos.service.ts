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

  list() {
    const url = `${this.url}/users`;
    return this.http.get(url).toPromise();
  }
  create(body: any) {
    const url = `${this.url}/users`;
    return this.http.post(url, body).toPromise();
  }
  getById(id: string) {
    const url = `${this.url}/users/${id}`;
    return this.http.get(url).toPromise();
  }
  update(id: string, body: any) {
    const url = `${this.url}/users/${id}`;
    return this.http.put(url, body).toPromise();
  }
  delete(id: string) {
    const url = `${this.url}/users/${id}`;
    return this.http.delete(url);
  }

}
