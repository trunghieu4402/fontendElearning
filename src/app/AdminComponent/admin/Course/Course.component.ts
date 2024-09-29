import { Component, OnInit } from '@angular/core';
import { Course } from '../../../Model/Course';
import { AdminService } from '../../../Service/AdminService/admin.service';
import { NotifiService } from '../../../notifi.service';
import { DataService } from '../../../Service/DataService/Data.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AddCourseComponent } from './addCourse/addCourse.component';

@Component({
  selector: 'app-Course',
  templateUrl: './Course.component.html',
  styleUrls: ['./Course.component.css'],
})
export class CourseComponent implements OnInit {
  listCourselet: any;
  index: any;
  openDialog(): void {
    this.dialog.open(AddCourseComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { course: this.courseBase },
    });
  }
  Search(event: KeyboardEvent) {
    console.log((event.target as HTMLInputElement).value);
    this.listCourse = this.filter((event.target as HTMLInputElement).value);
    console.log(this.listCourse);
    console.log(this.AllCourse);
  }
  listCourse!: Course[];
  AllCourse!: Course[];
  p: number = 1;
  courseBase: Course[] = [];

  constructor(
    private adminService: AdminService,
    private noti: NotifiService,
    private dataService: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.adminService.getAllCourse().subscribe((data: any) => {
      this.listCourse = data.map((i: any) => {
        return this.convertCourse(i);
      });
      this.AllCourse = data.map((i: any) => {
        return this.convertCourse(i);
      });
      console.log(this.AllCourse);
      this.dataService.course$.subscribe((data: any) => {
        this.listCourse.push(this.convertCourse(data));
      });
      this.courseBase = this.listCourse.filter((data: Course) => {
        return data.type == 'COSO';
      });
      console.log(this.courseBase);
      // this.dataService.sendListCourse(courseBase);
    });
  }
  convertCourse(data: any): Course {
    let course: Course = {
      courseId: data.courseId,
      courseName: data.courseName,
      credits: data.credits,
      coefficient: data.coefficient,
      type: data.type,
      requestCredits: data.requestCredits,
      prerequisites: [],
    };
    if (data.prerequisites != null) {
      course.prerequisites = data.prerequisites.map((i: any) => {
        console.log(i);
        return i.courseId;
      });
    }
    return course;
  }
  filter(text: string): any {
    text = text.toLowerCase();
    return this.AllCourse.filter((it) => {
      return (
        it.courseId.toLowerCase().includes(text) ||
        it.courseName.toLowerCase().includes(text)
      );
    });
  }
}
