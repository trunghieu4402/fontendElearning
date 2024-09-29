import { start } from 'repl';
import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifiService } from '../../../../notifi.service';
import { AdminService } from '../../../../Service/AdminService/admin.service';
import { DataService } from '../../../../Service/DataService/Data.service';
import { AddCourseSemesterComponent } from '../AddCourseSemester/AddCourseSemester.component';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { cloneDeep } from 'lodash';
import { SemesterGroup } from '../../../../Model/SemesterGroup';
import { MatDialogClose } from '@angular/material/dialog';

interface lichHocRequestList {
  teacher: string;
  roomId: string;
  start: number;
  finish: number;
}

type Room = {
  roomId: string;
  lichday: { start: number; finish: number }[];
  status: boolean;
};
type Teacher = {
  personId: string;
  fullname: string;
  teachingScheduleList: {
    start: number;
    finish: number;
  }[];
};
type Lich = {
  room: string;
  teacher: string;
  schedule: string;
  start: number;
  finish: number;
};

@Component({
  selector: 'app-AddNewClass',
  templateUrl: './AddNewClass.component.html',
  styleUrls: ['./AddNewClass.component.css'],
})
export class AddNewClassComponent implements OnInit {
  DeleteItem(i: any) {
    this.ListSchedule = this.ListSchedule.filter((data: any) => {
      return data != i;
    });
    for (let j = i.start; j <= i.finish; j++) {
      this.Locate[j].passStatus = false;
      this.Locate[j].status = false;
    }
    this.Rooms = this.Rooms.map((t: any) => {
      if (i.roomId == t.roomId) {
        t.status = false;
      }
      return t;
    });
  }
  @ViewChild('stepper') stepper!: MatStepper;
  AddNewClass() {
    this.ListSchedule.push(this.Lich);

    console.log(this.ListSchedule);
    this.request.courseSemesterGroupId = this.data.course.id;
    this.ListSchedule.forEach((res: Lich) => {
      for (let i = res.start; i <= res.finish; i++) {
        this.Locate[i].status = false;
        this.Locate[i].passStatus = false;
      }
      this.listRoom.filter((data: Room) => {
        if (data.roomId === res.room) {
          data.lichday.push({ start: res.start, finish: res.finish });
        }
      });
      this.listTeacher.filter((data: Teacher) => {
        if (data.personId == res.teacher) {
          data.teachingScheduleList.push({
            start: res.start,
            finish: res.finish,
          });
        }
      });
      this.request.lichHocRequestList.push({
        roomId: res.room,
        teacher: res.teacher,
        start: res.start,
        finish: res.finish,
      });
    });
    console.log(this.request);

    this.SaveClass(this.request);
    this.resetData();
    this.request.lichHocRequestList = [];
    this.ListSchedule = [];

    this.stepper.selectedIndex = 0;
  }
  Submit() {
    // console.log(this.Lich);
    console.log(this.Lich);
    this.ListSchedule.push(this.Lich);

    console.log(this.ListSchedule);
    this.request.courseSemesterGroupId = this.data.course.id;
    this.ListSchedule.forEach((res: Lich) => {
      this.request.lichHocRequestList.push({
        roomId: res.room,
        teacher: res.teacher,
        start: res.start,
        finish: res.finish,
      });
    });
    console.log(this.request);

    this.SaveClass(this.request);
    this.dialogRef.close();
  }

  Addmore() {
    this.Locate[this.start].status = true;
    this.Locate[this.finsh].status = true;
    for (let i = this.start; i <= this.finsh; i++) {
      this.Locate[i].passStatus = true;
    }
    this.key = '';
    this.ListSchedule.push(this.Lich);
    this.start = -1;
    this.finsh = -1;
    this.Lich = {
      room: '',
      schedule: '',
      teacher: '',
      start: -1,
      finish: -1,
    };
    this.stepper.selectedIndex = 0;
  }
  Search() {
    console.log(this.key);

    console.log(this.key);
    this.filterTeacher();
    this.TeacherFilter = this.Teachers.filter((v: Teacher) => {
      this.key = this.key.toLowerCase();
      return (
        v.personId.toLowerCase().includes(this.key) ||
        v.fullname.toLowerCase().includes(this.key)
      );
    });
    console.log(this.TeacherFilter);
  }
  PickTeacher(t: any) {
    this.Lich.teacher = t;
  }

  ListSchedule: Lich[] = [];
  lvt: number = -1;
  key: string = '';
  TeacherFilter: Teacher[] = [];
  PickRoom(i: number) {
    if (this.Lich.room) {
      this.Rooms[this.lvt].status = false;
    }
    this.Rooms[i].status = true;
    this.lvt = i;
    this.Lich.room = this.Rooms[i].roomId;
    console.log(this.Lich);
  }
  next() {
    this.filterTeacher();
  }
  request!: {
    courseSemesterGroupId: String;
    lichHocRequestList: lichHocRequestList[];
  };
  Rooms!: any[];
  Teachers: Teacher[] = [];

  listTeacher: Teacher[] = [];
  listRoom: Room[] = [];
  start: number = -1;
  finsh: number = -1;
  Nhan(i: any) {
    console.log(i);
    if (this.Locate[i].status) {
      for (let k = i; k <= this.finsh; k++) {
        this.Locate[k].status = false;
      }
      if (this.start == i) {
        this.finsh = -1;
        this.start = -1;
      } else {
        this.finsh = i - 1;
      }
    } else {
      this.Check(i);
    }
    this.Lich.start = this.start;
    this.Lich.finish = this.finsh;
    this.Lich.schedule = this.convertSchedule(this.start, this.finsh);
    this.loadRoom();
    this.filterTeacher();
    console.log(this.listTeacher);
    console.log(this.Teachers);
  }
  Lich: Lich;
  semester!: String;
  Thu: String[] = [];
  Locate: { locate: number; status: boolean; passStatus: boolean }[] = [];
  rows: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  colums: number[] = [0, 1, 2, 3, 4, 5];
  room: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  renderData() {
    for (let i = 0; i < 6; i++) {
      this.Thu.push('Thứ ' + (i + 2));
    }
    for (let i = 0; i <= 59; i++) {
      this.Locate.push({ locate: i, status: false, passStatus: false });
    }
  }

  private _formBuilder = inject(FormBuilder);
  name!: String;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private adminService: AdminService,
    private noti: NotifiService,
    private dialogRef: DialogRef<AddCourseSemesterComponent>
  ) {
    this.request = {
      courseSemesterGroupId: '',
      lichHocRequestList: [],
    };
    console.log(data);
    this.semester = data.semester.semesterGroupId;
    this.Lich = {
      teacher: '',
      room: '',
      schedule: '',
      start: -1,
      finish: -1,
    };

    console.log(data);
  }

  ngOnInit() {
    this.adminService
      .GetAllRoomBySemester(this.semester)
      .subscribe((data: any) => {
        data.forEach((e: any) => {
          let r: Room = { roomId: e.roomId, status: false, lichday: [] };
          if (e.lopList.length) {
            e.lopList.forEach((lop: any) =>
              r.lichday.push({
                start: lop.start,
                finish: lop.finish,
              })
            );
          }
          this.listRoom.push(r);
        });
        console.log(this.listRoom);
      });
    this.adminService
      .GetAllTeacherBySemester(this.semester)
      .subscribe((data: any) => {
        data.forEach((e: any) => {
          let t: Teacher = {
            personId: e.personId,
            fullname: e.fullName,
            teachingScheduleList: [],
          };
          if (e.teachingScheduleList.length) {
            e.teachingScheduleList.forEach((c: any) => {
              t.teachingScheduleList.push({ start: c.start, finish: c.finish });
            });
          }
          this.listTeacher.push(t);
        });
        console.log(this.listTeacher);
      });
    this.renderData();
  }
  Check(i: number) {
    if (this.start == -1) {
      this.start = i;
      this.finsh = i;
      this.Locate[this.start].status = true;
      return;
    } else {
      if (this.start != -1) {
        if (Math.floor(this.start / 5) != Math.floor(i / 5)) {
          for (let k = this.start; k <= this.finsh; k++) {
            this.Locate[k].status = false;
          }
          this.finsh = i;
          this.start = i;
          this.Locate[i].status = true;
          return;
        }
        if (i < this.start) {
          this.start = i;
        }
        if (i > this.finsh) {
          this.finsh = i;
        }
        for (let k = this.start; k <= this.finsh; k++) {
          if (this.Locate[k].passStatus) {
            for (let j = this.start; j <= this.finsh; j++) {
              this.Locate[j].status = false;
            }
            this.start = i;
            this.finsh = i;
            this.Locate[k].status = true;
            this.Locate[i].status = true;
          } else {
            this.Locate[k].status = true;
          }
        }
      }
    }
  }
  convertSchedule(start: number, finish: number): string {
    if (start == -1) {
      return '';
    }
    let Schedule: string = '';
    let length = finish - start;
    let thu: string = 'Thứ ' + Math.floor(start / 5 / 2 + 2);
    let ca: string =
      'Ca Học :' + ((start % 10) + 1) + '-' + ((start % 10) + 1 + length);
    Schedule = thu + ' : ' + ca;
    return Schedule;
  }
  filterTeacher(): void {
    this.Teachers = this.listTeacher.filter((teacher) => {
      return !teacher.teachingScheduleList.some(
        (schedule: any) =>
          schedule.start <= this.finsh && schedule.finish >= this.start
      );
    });
  }
  loadRoom() {
    this.Rooms = this.listRoom.map((r: Room) => {
      let bien = cloneDeep(r);
      if (bien.lichday) {
        r.lichday.map((e: any) => {
          if (e.start <= this.finsh && e.finish >= this.start) {
            bien.status = true;
          }
        });
      }
      return bien;
    });
  }
  resetData() {
    this.Lich = {
      teacher: '',
      room: '',
      schedule: '',
      start: -1,
      finish: -1,
    };
    this.key = '';
    this.start = -1;
    this.finsh = -1;
  }
  SaveClass(data: any) {
    this.adminService.AddNewClass(data).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res) {
          this.dataService.sendClass(res);

          this.noti.setNotifi('Thêm Mới Lớp Thành Công', 'Close');
          this.resetData();
        }
      },
      error: (err: any) => {
        this.noti.setNotifi(err.error, 'Close');
        this.resetData();
      },
    });
  }
}
