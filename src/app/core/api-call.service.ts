import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient) { }

  getPostings() {
    const url = 'http://www.kolhapuritians.com/api/values';
    return this.http.get(url);
  }
}
