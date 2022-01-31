import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url = environment.api;
  constructor(private http: HttpClient) {}

  getData(path: string) {
    return this.http.get(`${this.url}/${path}`);
  }

  postData(path: string, data: any) {
    return this.http.post(`${this.url}/${path}`, data);
  }

  patchData(path: string, data: any) {
    return this.http.patch(`${this.url}/${path}`, data);
  }

  deleteData(path: string) {
    return this.http.delete(`${this.url}/${path}`);
  }
}
