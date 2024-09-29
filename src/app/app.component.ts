import { Route, Router } from '@angular/router';
import { UserStorageService } from './Service/LocalStorage/UserStorage.service';
import { Course } from './Model/Course';
import { Component, OnInit } from '@angular/core';
import { DataService } from './Service/DataService/Data.service';
import { AdminService } from './Service/AdminService/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'E-learning';
  constructor(
    private dataService: DataService,
    private adminService: AdminService,
    private UserService: UserStorageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    console.log(this.UserService.getUserRole());
  }
  checkUserRole() {
    const role = this.UserService.getUserRole();
    if (role === 'ADMIN') {
      // Điều hướng đến trang quản trị
      window.location.href = '/admin-dashboard';
    } else if (role === 'STUDENT') {
      // Điều hướng đến trang người dùng
      window.location.href = '/student';
      this.router.navigate(['student']);
    } else {
      // Điều hướng đến trang đăng nhập nếu không có vai trò
      window.location.href = '/login';
    }
  }
}
