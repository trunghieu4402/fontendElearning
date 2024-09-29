import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../../../../Model/Course';
import { DataService } from '../../../../Service/DataService/Data.service';
import { AdminService } from '../../../../Service/AdminService/admin.service';
import { NotifiService } from '../../../../notifi.service';
import { DialogRef } from '@angular/cdk/dialog';
import { SemesterGroup } from '../../../../Model/SemesterGroup';
interface CourseGroup {
  courseId: String;
  semesterGroupId: String;
}
@Component({
  selector: 'app-AddCourseSemester',
  templateUrl: './AddCourseSemester.component.html',
  styleUrls: ['./AddCourseSemester.component.css'],
})
export class AddCourseSemesterComponent implements OnInit {
  Close() {
    this.dialogRef.close();
  }

  response!: {
    courseId: string;
    courseName: string;
    id: string;
    classRoomDtos: [];
    semesterGroupId: string;
  };
  Save() {
    console.log(this.request);
    this.adminService.AddNewCourseSemesterGroup(this.request).subscribe({
      next: (res: any) => {
        this.noti.setNotifi('Thêm Thành Công', 'Close');
        console.log(res);
        this.response = {
          id: res.courseSemesterGroupId,
          semesterGroupId: this.data.semesterGroupId,
          courseName: this.pick.courseName,
          classRoomDtos: [],
          courseId: this.pick.courseId,
        };
        this.dataService.sendCourseSemesterGroup(this.response);
      },
      error: (er: any) => {
        this.noti.setNotifi(er.error, 'Close');
        console.log(er);
      },
    });
  }
  Search() {
    console.log(this.key);
    this.listSearch = this.key == '' ? [] : this.filter(this.key);
    console.log(this.listSearch);

    console.log(this.listSearch);
  }
  pick!: any;
  PickCourse(item: any) {
    this.pick = item;
    this.request.courseId = item.courseId;
    this.request.semesterGroupId = this.semester;
    this.key = item.courseId;
    console.log(this.request);
  }
  semester: String = '';
  listCourse: Course[] = [];
  key: any;
  listSearch: Course[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SemesterGroup,
    private dataService: DataService,
    private adminService: AdminService,
    private noti: NotifiService,
    private dialogRef: DialogRef<AddCourseSemesterComponent>
  ) {
    console.log(data);
    this.semester = data.semesterGroupId;
  }
  request: CourseGroup = {
    courseId: '',
    semesterGroupId: this.semester,
  };

  ngOnInit() {
    this.dataService.Listcourse$.subscribe((data: any) => {
      console.log(data);
      this.listCourse = data;
    });
  }
  filter(text: string): any {
    text = text.toLowerCase();
    return this.listCourse.filter((it: Course) => {
      return (
        it.courseId.toLowerCase().includes(text) ||
        it.courseName.toLowerCase().includes(text)
      );
    });
  }
}
