import { Course } from './../../../../Model/Course';

import { Component, Inject, OnInit } from '@angular/core';
import { Department } from '../../../../Model/Department';
import { AdminService } from '../../../../Service/AdminService/admin.service';
import { NgForm } from '@angular/forms';
import { DataService } from '../../../../Service/DataService/Data.service';
import { retry } from 'rxjs';
import { Major } from '../../../../Model/Major';
import { NotifiService } from '../../../../notifi.service';
import { Location } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
interface CourseRequest {
  courseId: string;
  courseName: string;
  credits: number;
  coefficient: number;
  type: string;
  departmentId: string[];
  majorId: string[];
  reqiId: string[];
  requestCredits: number;
}
@Component({
  selector: 'app-addCourse',
  templateUrl: './addCourse.component.html',
  styleUrls: ['./addCourse.component.css'],
})
export class AddCourseComponent implements OnInit {
  Close() {
    this.dialogRef.close();
  }
  unPickMajor(i: Major) {
    this.Majors = this.Majors.filter((data: Major) => {
      return data.majorId != i.majorId;
    });
  }
  AddInfor() {
    if (this.type == 'CHUYENNGANH') {
      if (!this.Majors.includes(this.Pickmajor)) {
        this.Majors.push(this.Pickmajor);
      }
    } else {
      if (!this.Departments.includes(this.Pickdepartment))
        this.Departments.push(this.Pickdepartment);
    }
  }
  pickMajor() {
    console.log(this.MajorId);
    this.Pickmajor = this.Pickdepartment.listMajor.find((data: Major) => {
      return data.majorId == this.MajorId;
    })!;
    console.log(this.Pickmajor);
    this.adminService
      .getAllCourseByMajor(this.Pickmajor.majorId)
      .subscribe((data: any) => {
        this.MajorCourse = data;
        this.ListCourseRequi = this.baseCourse.concat(
          this.DepartmentCourse.concat(this.MajorCourse)
        );
        console.log(this.ListCourseRequi.length);
      });
  }
  Departments: Department[] = [];
  Majors: Major[] = [];
  DepartmentId!: string;
  MajorId!: string;
  Pickdepartment!: Department;
  Pickmajor!: Major;
  ItemList: Course[] = [];
  baseCourse: Course[] = [];
  DepartmentCourse: Course[] = [];
  MajorCourse: Course[] = [];
  undoItem(item: any) {
    this.ItemList = this.ItemList.filter((data: any) => {
      return data != item;
    });
    this.ListCourseRequi.push(item);
    this.Search();
  }
  unPickDepartment(i: any) {
    this.Departments = this.Departments.filter((de: Department) => {
      return de.departmentId != i.departmentId;
    });
  }
  listSearch = new Array();
  PickCourse(item: any) {
    this.requestCourse = item;
    this.ItemList.push(item);
    console.log(this.requestCourse);
    this.removeItem(item);
    console.log(this.ItemList);
  }
  removeItem(i: Course) {
    this.ListCourseRequi = this.ListCourseRequi.filter((item: Course) => {
      return item.courseId != i.courseId;
    });
    this.Search();
  }
  requestCourse: any;
  Search() {
    console.log(this.key);
    console.log(this.baseCourse);
    this.listSearch = this.key == '' ? [] : this.filter(this.key);
    console.log(this.listSearch);
  }
  ListCourseRequi: Course[] = [];
  key: any;
  pickDepartment() {
    console.log(this.DepartmentId);
    this.listDepartment.forEach((de: Department) => {
      if (de.departmentId == this.DepartmentId) {
        this.Pickdepartment = de;
      }
    });
    console.log(this.Pickdepartment);
    this.adminService
      .getAllCourseByDepartment(this.DepartmentId)
      .subscribe((data: Course[]) => {
        this.DepartmentCourse = data;
        this.ListCourseRequi = this.baseCourse.concat(this.DepartmentCourse);
        console.log(this.ListCourseRequi.length);
      });
  }
  submit(c: NgForm) {
    console.log(c.value);
    this.course = {
      courseId: c.value.courseId,
      courseName: c.value.courseName,
      credits: c.value.credits,
      coefficient: c.value.coefficient,
      departmentId: [],
      majorId: [],
      type: c.value.type,
      requestCredits: c.value.requestCredits,
      reqiId: [],
    };
    this.course.departmentId = this.Departments.map((c: Department) => {
      return c.departmentId;
    });
    this.course.majorId = this.Majors.map((c: Major) => {
      return c.majorId;
    });
    // this.course.reqiId= [];
    this.ItemList.forEach((i) => {
      this.course.reqiId.push(i.courseId);
    });
    console.log(this.course);
    this.adminService.AddNewCourse(this.course).subscribe({
      next: (res: any) => {
        this.dataService.sendCourse(res);
        this.noti.setNotifi('Thêm Môn Học Thành Công', 'Close');
        this.course = {
          courseId: '',
          courseName: '',
          credits: 1,
          coefficient: 1,
          type: 'COSO',
          departmentId: new Array(),
          majorId: new Array(),
          reqiId: new Array(),
          requestCredits: 0,
        };
      },
      error: (err: any) => {
        this.noti.setNotifi('Điền Đủ Thông Tin', 'Close');
      },
    });
  }
  TypePick() {
    this.type = this.course.type;
    console.log(this.type);
    if (this.type == 'COSONGANH' || this.type == 'CHUYENNGANH') {
      this.adminService.getDepartment().subscribe((data: any) => {
        this.listDepartment = data.body;
        console.log(this.listDepartment);
      });
    }

    console.log(this.listDepartment);
  }
  type!: string;

  course: CourseRequest = {
    courseId: '',
    courseName: '',
    credits: 1,
    coefficient: 1,
    type: 'COSO',
    departmentId: new Array(),
    majorId: new Array(),
    reqiId: new Array(),
    requestCredits: 0,
  };
  listDepartment: Department[] = new Array();
  constructor(
    private adminService: AdminService,
    private dataService: DataService,
    private noti: NotifiService,
    private location: Location,
    private dialogRef: MatDialogRef<AddCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data.course.length);
    this.baseCourse = data.course;
    this.ListCourseRequi = this.baseCourse;
  }
  ngOnInit(): void {}
  filter(text: string): any {
    text = text.toLowerCase();
    return this.ListCourseRequi.filter((it: Course) => {
      return (
        it.courseId.toLowerCase().includes(text) ||
        it.courseName.toLowerCase().includes(text)
      );
    });
  }
}
