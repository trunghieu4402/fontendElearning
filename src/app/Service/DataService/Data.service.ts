import { Injectable } from '@angular/core';
import { listenerCount } from 'node:process';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataSubject = new Subject<any>();

  private course = new Subject<any>();
  private Semeater = new Subject<any>();
  private Class = new Subject<any>();
  private courseSemesterGroup = new Subject<any>();
  class$ = this.Class.asObservable();
  courseSemesterGroup$ = this.courseSemesterGroup.asObservable();
  data$ = this.dataSubject.asObservable();
  semester$ = this.Semeater.asObservable();

  course$ = this.course.asObservable();
  private listCourseSubject = new BehaviorSubject<any[]>([]);
  Listcourse$ = this.listCourseSubject.asObservable();

  sendData(data: any) {
    console.log(data);
    this.dataSubject.next(data);
  }
  sendListCourse(data: any) {
    this.listCourseSubject.next(data);
  }
  sendCourse(data: any) {
    this.course.next(data);
  }
  setSemester(data: any) {
    this.Semeater.next(data);
  }
  sendClass(data: any) {
    this.Class.next(data);
  }
  sendCourseSemesterGroup(data: any) {
    this.courseSemesterGroup.next(data);
  }

  constructor() {}
}
