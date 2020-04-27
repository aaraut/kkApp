import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient) { }

  getPostings() {
    const url = 'http://www.kolhapuritians.com/api/jobposting';
    return this.http.get(url);
  }
  callPostApi(url, param) {
    return this.http.post(url, param);
  }

  callGetApi(url){
    return this.http.get(url)
  }
  callPutApi(url, param){
    return this.http.put(url, param)
  }
}
