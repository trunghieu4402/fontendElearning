import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../Service/AdminService/admin.service';
import { Department } from '../../../Model/Department';

@Component({
  selector: 'app-Department',
  templateUrl: './Department.component.html',
  styleUrls: ['./Department.component.css'],
})
export class DepartmentComponent implements OnInit {
  [x: string]: any;
  selectedDepartment!: Department;
  isActive($event: boolean) {
    throw new Error('Method not implemented.');
  }
  selectDepartment(item: Department) {
    this.selectedDepartment = item;
  }

  listDepartment!: Department[];
  constructor(private service: AdminService) {}
  ngOnInit() {
    this.service.getDepartment().subscribe((data: any) => {
      console.log(data.body);
      this.listDepartment = data.body.map((a: any) => a);
      console.log(this.listDepartment);
    });
  }
  UpdateMajor(major: any) {}
  DeleteMajor(major: any) {}
}
