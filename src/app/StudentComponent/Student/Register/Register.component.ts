import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Service/StudentService/Student.service';
import { AdminService } from '../../../Service/AdminService/admin.service';
import { CourseSemesterGroup } from '../../../Model/CourseSemesterGroup';
import { Class } from '../../../Model/Class';
import { ClassDetail } from '../../../Model/ClassDetail';
import { NotifiService } from '../../../notifi.service';
type schedule = {
  start: number;
  finish: number;

  room: string;

  classId: string;
  className: string;
  teacher: string;
  courseId: string;
};
@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css'],
})
export class RegisterComponent implements OnInit {
  check!: boolean;
  slectedClass(value: Class, event: Event) {
    if (this.selectedClass[this.CoursePick.id] === value.ClassId) {
      delete this.selectedClass[this.CoursePick.id];
      this.schedule = this.schedule.filter((data: schedule) => {
        return data.classId != value.ClassId;
      });
      this.loadListNumberSchedule();
      this.noti.setNotifi('Hủy Môn Thành Công', 'Close');
    } else {
      console.log(value);
      this.AddToSchedule(value, event);
    }

    console.log(this.selectedClass);
  }
  isClassSelected(courseId: string, classId: string): boolean {
    return this.selectedClass[courseId] === classId;
  }
  selectedClass: { [courseId: string]: string } = {};
  classPick!: Class;
  AddToSchedule(cl: Class, event: any) {
    const oldClass = this.selectedClass[this.CoursePick.id];
    const old = this.schedule;
    this.schedule = this.schedule.filter((data: schedule) => {
      return data.courseId != this.CoursePick.courseId;
    });
    cl.ClassDetail.forEach((c: ClassDetail) => {
      this.check = this.schedule.some((data: schedule) => {
        return data.start <= c.finish && data.finish >= c.start;
      });
      if (!this.check) {
        this.selectedClass[this.CoursePick.id] = cl.ClassId;
        this.schedule.push({
          classId: cl.ClassId,
          className: cl.ClassId,
          room: c.roomId,
          start: c.start,
          finish: c.finish,
          teacher: c.teacherName,
          courseId: this.CoursePick.courseId,
        });
        this.noti.setNotifi('Đăng Ký Thành Công', 'Close');
        this.loadListNumberSchedule();
      } else {
        this.selectedClass[this.CoursePick.id] = oldClass;
        this.schedule = old;
        event.target.checked = false;
        this.noti.setNotifi('Lớp Đăng Ký Bị Trùng', 'Close');

        return;
      }
      if (cl.currentSlot === cl.maxSlot) {
        this.noti.setNotifi('Lớp đã đầy', 'Close');
      }
    });
  }
  SelectCourse(course: CourseSemesterGroup) {
    this.CoursePick = course;
    this.ListClass = this.CoursePick.ListClass;
    console.log(this.CoursePick);
  }
  classId!: string;
  ListCourse: CourseSemesterGroup[] = [];
  CoursePick: CourseSemesterGroup = {
    courseId: '',
    courseName: '',
    id: '',
    ListClass: [],
    Semester: '',
  };
  ListClass: Class[] = [];
  Semester: string = '';
  RegisterStatus!: any;
  breakLoop = false;
  resetBreakLoop() {
    this.breakLoop = false;
  }
  setBreakLoop(value: boolean) {
    this.breakLoop = value;
  }
  constructor(
    private studentService: StudentService,
    private adminService: AdminService,
    private noti: NotifiService
  ) {}

  ngOnInit() {
    this.studentService.getAllCourseRegister().subscribe((data: any) => {
      data.forEach((r: any) => {
        this.ListCourse.push(this.configToCourseSemester(r));
        this.Semester = this.ListCourse[0].Semester;
      });
    });
    console.log(this.ListCourse);
    this.loadListNumberSchedule();
    console.log(this.danhsachHoc);

    this.studentService.checkRegisterTime().subscribe((data: any) => {
      this.RegisterStatus = data;
      console.log(this.RegisterStatus);
    });
    if (this.RegisterStatus) {
    }
    this.schedule = [];
  }
  rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  columns = [0, 1, 2, 3, 4, 5]; // 7 ngày trong tuần

  danhsachHoc: number[] = [];
  schedule: schedule[] = [];
  //kiểm tra xem vị trí hiện tại có nằm trong danh sách học hay ko
  hasClass(rowIndex: number, colIndex: number): boolean {
    return this.danhsachHoc.some(
      (i) => i === colIndex * this.rows.length + rowIndex
    );
  }
  configToCourseSemester(data: any) {
    let courseSemester: CourseSemesterGroup = {
      courseId: data.courseId,
      id: data.id,
      courseName: data.courseName,
      Semester: data.semesterGroupId,
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
  loadListNumberSchedule() {
    this.danhsachHoc = [];
    for (let i of this.schedule) {
      for (let j = i.start; j <= i.finish; j++) {
        this.danhsachHoc.push(j);
      }
    }
  }
  checkTimeRegister(cl: Class) {
    cl.ClassDetail.forEach((c: ClassDetail) => {
      this.check = this.schedule.some((data: schedule) => {
        return data.start <= c.finish && data.finish >= c.start;
      });
    });
  }
}
