import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from '../LocalStorage/UserStorage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  baseURL: string = 'http://localhost:8081/student/';

  constructor(
    private http: HttpClient,
    private userStorage: UserStorageService
  ) {}
  checkRegisterTime(): any {
    const headers = this.userStorage.createAuthorizationHeader();
    return this.http.get(this.baseURL + 'register/checkRegisterTime', {
      headers,
    });
  }
  getAllCourseRegister() {
    const headers = this.userStorage.createAuthorizationHeader();
    return this.http.get(this.baseURL + 'register', {
      headers,
    });
  }
}
