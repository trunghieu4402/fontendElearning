import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
baseURL="http://localhost:8081/authenticate";
constructor(private http: HttpClient, private fb:FormBuilder) { }
public Sigin (signupRequest : any): any
{
  // console.
  return this.http.post(this.baseURL+"/signin",signupRequest);
}

}
