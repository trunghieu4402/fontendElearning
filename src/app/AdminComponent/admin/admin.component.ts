import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Course } from '../../Model/Course';
import { AdminService } from '../../Service/AdminService/admin.service';
import { DataService } from '../../Service/DataService/Data.service';
// import { Router } from 'express';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  Logout() {
    localStorage.clear();
  }
  activeLink!: string;
  isActive($event: any) {
    console.log($event);
  }
  url: string = 'admin/department';
  Nhan(event: Event) {
    const target = event.target as HTMLElement;
    this.title = target.innerText;
    window.localStorage.setItem('title', this.title);
  }

  constructor(
    private router: Router,
    private adminService: AdminService,
    private dataService: DataService
  ) {
    let course: Course[] = [];
    course = this.adminService.getAllCourse().subscribe((data: any) => {
      console.log(data);
      course = data;
      this.dataService.sendListCourse(data);
    });
  }
  title: string | null = null;
  UserId: string = 'A40531';
  role: string = 'Sinh Vien';
  ngOnInit() {
    this.title = window.localStorage.getItem('title') ?? null;
  }
}
