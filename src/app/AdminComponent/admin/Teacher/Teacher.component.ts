import { Person } from './../../../Model/Person';

import { Component, OnInit, Inject, inject } from '@angular/core';
import { AdminService } from '../../../Service/AdminService/admin.service';
import { DataService } from '../../../Service/DataService/Data.service';
import { AddTeacherComponent } from './addTeacher/addTeacher.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
@Component({
  selector: 'app-Teacher',
  templateUrl: './Teacher.component.html',
  styleUrls: ['./Teacher.component.css'],
})
export class TeacherComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  OpenDialog() {
    this.dialog.open(AddTeacherComponent);
  }
  Search($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }
  teacherList!: Person[];
  constructor(
    private adminservice: AdminService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.adminservice.GetAllTeacher().subscribe((data: any) => {
      console.log(data);
      this.teacherList = data;
    });
    this.dataService.data$.subscribe((data) => {
      // console.log(data);
      let p: Person = data;
      p.departmentId = data.department.departmentId;

      this.teacherList.push(p);
    });
  }
}
