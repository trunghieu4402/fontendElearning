import { Injectable } from '@angular/core';
import { UserStorageService } from '../LocalStorage/UserStorage.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl: string = 'http://localhost:8081/admin/';

  constructor(
    private userStorage: UserStorageService,
    private http: HttpClient
  ) {}
  public getDepartment(): any {
    const headers = this.userStorage.createAuthorizationHeader();
    return this.http.get(this.baseUrl + 'Department', { headers });
  }
  public getAllStudent(): any {
    const headers = this.userStorage.createAuthorizationHeader();
    return this.http.get(this.baseUrl + 'User', { headers });
  }
  AddStudent(Student: any) {
    const headers = this.userStorage.createAuthorizationHeader();
    return this.http.post(this.baseUrl + 'User/createStudent', Student, {
      headers,
    });
  }
  GetAllTeacher(): any {
    const headers = this.userStorage.createAuthorizationHeader();
    return this.http.get(this.baseUrl + 'User/getAllTeacher', { headers });
  }
  AddTeacher(teacher: any) {
    const headers = this.userStorage.createAuthorizationHeader();
    return this.http.post(this.baseUrl + 'User/createTeacher', teacher, {
      headers,
    });
  }
  getAllCourse(): any {
    const headers = this.userStorage.createAuthorizationHeader();
    return this.http.get(this.baseUrl + 'Course/getAllCourse', { headers });
  }
  getAllCourseByMajor(id: string): any {
    const headers = this.userStorage.createAuthorizationHeader();
    return this.http.get(this.baseUrl + 'Course/getCourseByMajor?id=' + id, {
      headers,
    });
  }
  getAllCourseByDepartment(id: string): any {
    const headers = this.userStorage.createAuthorizationHeader();
    return this.http.get(
      this.baseUrl + 'Course/getAllCoursebyDepartment?id=' + id,
      { headers }
    );
  }
  AddNewCourse(course: any) {
    const headers = this.userStorage.createAuthorizationHeader();
    console.log(course);
    return this.http.post(this.baseUrl + 'Course/addCourse', course, {
      headers,
    });
  }
  GetAllSemester() {
    const headers = this.userStorage.createAuthorizationHeader();
    return this.http.get(this.baseUrl + 'SemesterGroup/getAllSemesterGroup', {
      headers,
    });
  }
  AddSemesterGroup(data: any) {
    const headers = this.userStorage.createAuthorizationHeader();
    return this.http.post(
      this.baseUrl + 'SemesterGroup/addSemesterGroup',
      data,
      {
        headers,
      }
    );
  }
  GetDetailSemesterGroup(id: any) {
    const headers = this.userStorage.createAuthorizationHeader();
    return this.http.get(
      this.baseUrl + 'CourseSemester/getAllCourseSemesterGroup?id=' + id,
      {
        headers,
      }
    );
  }
  AddNewCourseSemesterGroup(data: any) {
    const headers = this.userStorage.createAuthorizationHeader();
    return this.http.post(
      this.baseUrl + 'CourseSemester/addNewCourseSemesterGroup',
      data,
      {
        headers,
      }
    );
  }
  GetAllRoomBySemester(id: String) {
    const headers = this.userStorage.createAuthorizationHeader();
    return this.http.get(this.baseUrl + 'Room/getAllRoom?id=' + id, {
      headers,
    });
  }
  GetAllTeacherBySemester(id: String) {
    const headers = this.userStorage.createAuthorizationHeader();
    return this.http.get(this.baseUrl + 'getTeacherBySemester?semester=' + id, {
      headers,
    });
  }
  AddNewClass(data: any) {
    const headers = this.userStorage.createAuthorizationHeader();
    return this.http.post(this.baseUrl + 'ClassRoom/addClassroom', data, {
      headers,
    });
  }
}
