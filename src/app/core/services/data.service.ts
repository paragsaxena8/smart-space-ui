import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  host = environment.host;
  url = `${environment.host}/api/v1`;
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(`${this.host}`);
  }

  getData(path: string) {
    return this.http.get(`${this.url}/${path}`);
  }

  getDataWithParams(path: string, params: { name: string; value: string }) {
    return this.http.get(`${this.url}/${path}`, {
      params: new HttpParams().set(params.name, params.value),
    });
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
