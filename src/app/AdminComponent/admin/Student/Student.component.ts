import { Student } from './../../../Model/Student';
import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../Service/AdminService/admin.service';
import { DataService } from '../../../Service/DataService/Data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from './AddStudent/AddStudent.component';

@Component({
  selector: 'app-Student',
  templateUrl: './Student.component.html',
  styleUrls: ['./Student.component.css'],
})
export class StudentComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(AddStudentComponent, {
      height: '500px',
      width: '1500px',
    });
  }
  onStudentAdded(student: any) {
    this.ListStudent.push(student);
  }
  input!: string;
  AllStudent!: Student[];
  Search(event: KeyboardEvent) {
    this.input = (event.target as HTMLInputElement).value;
    console.log(this.input);
    this.ListStudent = this.filter(this.input);
    // console.log(arr);
  }
  ListStudent!: Student[];
  trangthai!: string;
  constructor(
    private adminService: AdminService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.adminService.getAllStudent().subscribe((data: Student[]) => {
      this.ListStudent = data;
      console.log(this.ListStudent);
      this.AllStudent = data;
    });
    this.dataService.data$.subscribe((data) => {
      console.log(data);
      this.ListStudent.push(data);
    });
  }

  filter(text: string): any {
    text = text.toLowerCase();
    return this.AllStudent.filter((it) => {
      return (
        it.personId.toLowerCase().includes(text) ||
        it.fullName.toLowerCase().includes(text)
      );
    });
  }
}
