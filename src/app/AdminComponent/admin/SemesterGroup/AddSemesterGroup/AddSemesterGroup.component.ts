import { SemesterGroup } from './../../../../Model/SemesterGroup';
import { DataService } from './../../../../Service/DataService/Data.service';
import { DialogRef } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { randomBytes } from 'crypto';
import { AdminService } from '../../../../Service/AdminService/admin.service';
import { NotifiService } from '../../../../notifi.service';

interface SemesterGroupRequest {
  groupId: string;
  baseCost: number;
  start: string;
  end: string;
  timeDKHoc: string;
}
@Component({
  selector: 'app-AddSemesterGroup',
  templateUrl: './AddSemesterGroup.component.html',
  styleUrls: ['./AddSemesterGroup.component.css'],
})
export class AddSemesterGroupComponent implements OnInit {
  Save() {
    this.SemesterGroup.start = this.datePipe.transform(
      this.SemesterGroup.start,
      'yyyy-MM-dd'
    )!;
    this.SemesterGroup.end = this.datePipe.transform(
      this.SemesterGroup.end,
      'yyyy-MM-dd'
    )!;
    this.SemesterGroup.timeDKHoc = this.datePipe.transform(
      this.SemesterGroup.timeDKHoc,
      'yyyy-MM-dd'
    )!;
    console.log(this.SemesterGroup);
    this.adminService.AddSemesterGroup(this.SemesterGroup).subscribe({
      next: (data: any) => {
        console.log(data);
        this.noti.setNotifi('Thêm Thành Công', 'Close');
        let da: SemesterGroup = data;
        da.groupId = this.SemesterGroup.groupId;
        this.dataService.setSemester(da);
      },
      error: (err: any) => {
        console.log(err);
        this.noti.setNotifi(err.error, 'Close');
      },
    });
    // this.SemesterGroup.timeDKHoc!=
  }
  SemesterGroup: SemesterGroupRequest = {
    groupId: '',
    baseCost: 0,
    start: '',
    end: '',
    timeDKHoc: '',
  };
  Close() {
    this.dialogRef.close();
  }

  constructor(
    private dialogRef: DialogRef<AddSemesterGroupComponent>,
    private datePipe: DatePipe,
    private adminService: AdminService,
    private noti: NotifiService,
    private dataService: DataService
  ) {}

  ngOnInit() {}
}
