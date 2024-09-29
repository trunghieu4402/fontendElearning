import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../Service/AdminService/admin.service';
import { Location } from '@angular/common';
import { Department } from '../../../../Model/Department';
import { NgForm } from '@angular/forms';
import { NotifiService } from '../../../../notifi.service';
import { DataService } from '../../../../Service/DataService/Data.service';
import { MatDialogRef } from '@angular/material/dialog';
interface Teacher {
  fullName: string;
  phoneNumber: string;
  sex: boolean;
  dateOfBirth: string;
  email: string;
  departmentId: string;
}
@Component({
  selector: 'app-addTeacher',
  templateUrl: './addTeacher.component.html',
  styleUrls: ['./addTeacher.component.css'],
})
export class AddTeacherComponent implements OnInit {
  Close() {
    this.dialogRef.close();
  }
  studentForm: any;
  Submit(a: NgForm) {
    console.log(a.value);
    this.adminService.AddTeacher(a.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.dataService.sendData(data);
        this.noti.setNotifi('Thêm Giáo Viên Thanh Công', 'Close');
      },
      error: (err: any) => {
        this.noti.setNotifi('Điền Đủ Thông Tin', 'Close');
        this.teacher = {
          fullName: '',
          phoneNumber: '',
          sex: true,
          dateOfBirth: '',
          email: '',
          departmentId: '',
        };
      },
    });
  }
  teacher: Teacher = {
    fullName: '',
    phoneNumber: '',
    sex: true,
    dateOfBirth: '',
    email: '',
    departmentId: '',
  };
  constructor(
    private adminService: AdminService,
    private location: Location,
    private noti: NotifiService,
    private dataService: DataService,
    private dialogRef: MatDialogRef<AddTeacherComponent>
  ) {}
  ListDepartment!: Department[];
  ngOnInit() {
    this.adminService.getDepartment().subscribe((data: any) => {
      console.log(data);
      this.ListDepartment = data.body;
      console.log(this.ListDepartment);
    });
  }
}
