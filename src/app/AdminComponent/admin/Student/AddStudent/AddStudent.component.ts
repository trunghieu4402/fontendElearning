import { Department } from './../../../../Model/Department';
import { AdminService } from '../../../../Service/AdminService/admin.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { NotifiService } from '../../../../notifi.service';
import { DataService } from '../../../../Service/DataService/Data.service';
import { Student } from '../../../../Model/Student';
import { MatDialogRef } from '@angular/material/dialog';
interface Students {
  fullName: string;
  phoneNumber: string;
  sex: boolean;
  dateOfBirth: string;
  email: string;
  departmentId: string;
  majorId: string;
}

@Component({
  selector: 'app-AddStudent',
  templateUrl: './AddStudent.component.html',
  styleUrls: ['./AddStudent.component.css'],
})
export class AddStudentComponent implements OnInit {
  [x: string]: any;
  Submit(studentform: NgForm) {
    this.adminService.AddStudent(this.Student).subscribe({
      next: (data: any) => {
        console.log(data);
        let stu: Student = data;
        stu.departmentId = data.department.departmentId;
        stu.majorId = data.major.majorId;
        console.log(stu);
        this.noti.setNotifi('Thêm Sinh Viên Thành công', 'Close');

        this.dataService.sendData(stu);

        this.Student = {
          fullName: '',
          phoneNumber: '',
          sex: true,
          dateOfBirth: '',
          email: '',
          departmentId: '',
          majorId: '',
        };
      },
      error: (data: any) => {
        this.noti.setNotifi('Thêm Sinh Viên Thất Bại', 'Close');
      },
    });
  }
  selectedGender: boolean;
  Close() {
    this.dialogRef.close();
  }
  Save() {
    var name: any = document.querySelector('#name');
    console.log(name.value);
  }
  DeppartmentPick: Department | null = null;
  Change(department: Department) {
    this.DeppartmentPick = department;
    console.log(this.DeppartmentPick);
    console.log(department);
  }

  constructor(
    private adminService: AdminService,
    private noti: NotifiService,
    private location: Location,
    private dataService: DataService,
    private dialogRef: MatDialogRef<AddStudentComponent>
  ) {
    this.selectedGender = true;
  }
  Student: Students = {
    fullName: '',
    phoneNumber: '',
    sex: true,
    dateOfBirth: '',
    email: '',
    departmentId: '',
    majorId: '',
  };
  ListDepartment!: Department[];
  ngOnInit() {
    this.adminService.getDepartment().subscribe((data: any) => {
      console.log(data);
      this.ListDepartment = data.body;
      console.log(this.ListDepartment);
      this.DeppartmentPick = this.ListDepartment.at(0) ?? null;
    });
  }
  pickDepartment() {
    var departmentId: any = document.querySelector('#department');
    console.log(departmentId.value);
    this.DeppartmentPick =
      this.ListDepartment.find((de) => {
        return de.departmentId == departmentId.value;
      }) ?? null;
    // console.log(de);
  }
}
