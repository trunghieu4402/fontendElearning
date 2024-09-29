import { Component, OnInit } from '@angular/core';
import { SemesterGroup } from '../../../Model/SemesterGroup';
import { AdminService } from '../../../Service/AdminService/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSemesterGroupComponent } from './AddSemesterGroup/AddSemesterGroup.component';
import { DataService } from '../../../Service/DataService/Data.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-SemesterGroup',
  templateUrl: './SemesterGroup.component.html',
  styleUrls: ['./SemesterGroup.component.css'],
})
export class SemesterGroupComponent implements OnInit {
  Update(item: SemesterGroup) {}
  Delete(item: SemesterGroup) {}
  Detail(item: SemesterGroup) {
    console.log(item.semesterGroupId);
    this.dataService.sendData(item.semesterGroupId);
    this.router.navigateByUrl('admin/semesterGroupDetail');
  }
  pickGroup() {
    console.log(this.filter);
    if (this.filter == 'all') {
      this.listSemester = this.AllSemester;
    } else {
      this.listSemester = this.AllSemester.filter((data: any) => {
        return data.groupId == this.filter;
      });
    }
  }
  filter: String = 'all';
  OpentDialog() {
    this.diaglog.open(AddSemesterGroupComponent, {
      height: '80vh',
      width: '50vw',
      maxHeight: '80vh',
      maxWidth: '100vw',

      panelClass: 'custom-dialog-container',
    });
  }
  listSemester: SemesterGroup[] = [];
  AllSemester: SemesterGroup[] = [];
  constructor(
    private adminService: AdminService,
    private diaglog: MatDialog,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.adminService.GetAllSemester().subscribe((data: any) => {
      console.log(data);
      this.listSemester = data;
      this.AllSemester = data;
      console.log(this.listSemester);
    });
    this.dataService.semester$.subscribe((data: any) => {
      // this.AllSemester.push(data);
      this.listSemester.push(data);
    });
  }
}
