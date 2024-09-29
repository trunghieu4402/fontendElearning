import { Component, inject, OnInit } from '@angular/core';
import { SemesterGroup } from '../../../Model/SemesterGroup';
import { AdminService } from '../../../Service/AdminService/admin.service';
import { CourseSemesterGroup } from '../../../Model/CourseSemesterGroup';
import { ClassDetail } from '../../../Model/ClassDetail';
import { Class } from '../../../Model/Class';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseSemesterComponent } from './AddCourseSemester/AddCourseSemester.component';
import { DataService } from '../../../Service/DataService/Data.service';
import { Router } from '@angular/router';
import { AddNewClassComponent } from './AddNewClass/AddNewClass.component';
import { Department } from '../../../Model/Department';

@Component({
  selector: 'app-SemesterGroupDetail',
  templateUrl: './SemesterGroupDetail.component.html',
  styleUrls: ['./SemesterGroupDetail.component.css'],
})
export class SemesterGroupDetailComponent implements OnInit {
  AddNewClass(id: any): void {
    let dialogClass = this.dialog.open(AddNewClassComponent, {
      width: '90vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {
        course: id,
        semester: this.semesterPick,
      },
    });
    dialogClass.afterClosed().subscribe((res) => {});
  }

  AddNewCourse() {
    let AddCourseDialog = this.dialog.open(AddCourseSemesterComponent, {
      width: '40vw',
      height: '70vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: this.semesterPick,
    });
  }
  pick!: CourseSemesterGroup;
  swap: boolean = false;
  Nhan(item: CourseSemesterGroup) {
    if (this.swap && this.pick.id == item.id) {
      this.swap = false;
      // this.pick=null;
    } else {
      this.swap = true;
      this.pick = item;
    }
  }
  Change() {
    console.log(this.semesterPick);
    console.log(this.listSemesterGroup);
    this.listSemesterGroup.forEach((data: SemesterGroup) => {
      if (data.semesterGroupId === this.semesterPick.semesterGroupId) {
        this.semesterPick = data;
      }
    });

    // console.log(a);
    // this.semesterPick = {
    //   baseCost: a.baseCost,
    //   finish: a.finish,
    //   groupId: a.groupId,
    //   semesterGroupId: a.semesterGroupId,
    //   start: a.start,
    //   status: a.status,
    //   timeDangKyHoc: a.timeDangKyHoc,
    // };
    console.log(this.semesterPick);
    this.listCourse = [];
    this.adminService
      .GetDetailSemesterGroup(this.semesterPick.semesterGroupId)
      .subscribe((items: any) => {
        items.forEach((e: any) => {
          this.listCourse.push(this.configToCourseSemester(e));
        });
        console.log(this.listCourse);
      });
  }
  listSemesterGroup: SemesterGroup[] = [];
  semesterPick: SemesterGroup;
  listCourse!: CourseSemesterGroup[];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private dataService: DataService,
    private router: Router
  ) {
    this.semesterPick = {
      semesterGroupId: '',
      baseCost: 0,
      finish: '',
      timeDangKyHoc: '',
      groupId: '',
      start: '',
      status: '',
    };
  }

  ngOnInit() {
    this.listCourse = [];
    this.adminService.GetAllSemester().subscribe((data: any) => {
      this.listSemesterGroup = data;
      console.log(this.listSemesterGroup);
      let n = this.listSemesterGroup.length - 1;
      this.semesterPick = {
        baseCost: this.listSemesterGroup[n].baseCost,
        finish: this.listSemesterGroup[n].finish,
        groupId: this.listSemesterGroup[n].groupId,
        semesterGroupId: this.listSemesterGroup[n].semesterGroupId,
        start: this.listSemesterGroup[n].start,
        status: this.listSemesterGroup[n].status,
        timeDangKyHoc: this.listSemesterGroup[n].timeDangKyHoc,
      };
      console.log(this.semesterPick);
      this.adminService
        .GetDetailSemesterGroup(this.semesterPick.semesterGroupId)
        .subscribe((res: any) => {
          console.log(res);
          res.forEach((r: any) => {
            this.listCourse.push(this.configToCourseSemester(r));
          });
        });
    });
    this.dataService.class$.subscribe((data: any) => {
      console.log(data);
      let cl: Class = {
        maxSlot: data.maxSlot,
        ClassId: data.classRoomId,
        currentSlot: data.currentSlot,
        ClassDetail: [],
      };
      data.lichHocList.forEach((lh: any) => {
        {
          let dt: ClassDetail = {
            start: lh.start,
            finish: lh.finish,
            roomId: lh.roomId,
            teacherName: lh.teacher.fullName,
            Schedule: '',
          };
          dt.Schedule = this.convertSchedule(dt.start, dt.finish);
          cl.ClassDetail.push(dt);
        }
      });
      this.pick.ListClass.push(cl);
    });
    this.dataService.courseSemesterGroup$.subscribe((data: any) => {
      this.listCourse.push(this.configToCourseSemester(data));
    });
  }
  configToCourseSemester(data: any) {
    let courseSemester: CourseSemesterGroup = {
      courseId: data.courseId,
      id: data.id,
      Semester: data.semesterGroupId,
      courseName: data.courseName,
      ListClass: [],
    };
    data.classRoomDtos.forEach((e: any) => {
      let cl: Class = {
        ClassId: e.classRoomId,
        currentSlot: e.currentSlot,
        maxSlot: e.maxSlot,
        ClassDetail: [],
      };
      e.lichHocList.forEach((lh: any) => {
        let dt: ClassDetail = {
          start: lh.start,
          finish: lh.finish,
          roomId: lh.roomId,
          teacherName: lh.teacher.fullName,
          Schedule: '',
        };
        dt.Schedule = this.convertSchedule(dt.start, dt.finish);

        cl.ClassDetail.push(dt);
      });
      courseSemester.ListClass.push(cl);
    });
    return courseSemester;
  }
  convertSchedule(start: number, finish: number): string {
    let Schedule: string = '';
    let length = finish - start;
    let thu: string = 'Thứ ' + (Math.floor(start / 5 / 2) + 2);
    let ca: string =
      'Ca Học :' + ((start % 10) + 1) + '-' + ((start % 10) + 1 + length);
    Schedule = thu + ' : ' + ca;
    return Schedule;
  }
}
