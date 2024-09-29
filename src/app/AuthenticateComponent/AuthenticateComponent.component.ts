import { AuthenticateService } from '../Service/AuthenticateService/Authenticate.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NotifiService } from '../notifi.service';
import { UserStorageService } from '../Service/LocalStorage/UserStorage.service';

@Component({
  selector: 'app-AuthenticateComponent',
  templateUrl: './AuthenticateComponent.component.html',
  styleUrls: ['./AuthenticateComponent.component.css'],
})
export class AuthenticateComponentComponent implements OnInit {
  LoginForm!: FormGroup;
  constructor(
    private router: Router,
    private UserStorage: UserStorageService,
    // private authService: AuthService,
    private fb: FormBuilder,
    private noti: NotifiService,
    private authService: AuthenticateService
  ) {}
  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  Login() {
    const username = this.LoginForm.controls['userName'].value;
    const password = this.LoginForm.controls['password'].value;
    // console.log(this.LoginForm.value)
    this.authService.Sigin(this.LoginForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.authenticateActive) {
          this.noti.setNotifi('Đăng Nhập thành Công', 'Close');
          this.UserStorage.setTokent(res.token);
          if (this.UserStorage.getUserRole() === 'ADMIN') {
            this.router.navigate(['admin/department']);
          } else if (this.UserStorage.getUserRole() === 'STUDENT') {
            this.router.navigate(['student']);
          }
        }
      },
      error: (err: any) => {
        console.log(err);
        this.noti.setNotifi(err.error, 'close');
        this.LoginForm.controls['userName'].setValue(null);
        this.LoginForm.controls['password'].setValue(null);
      },
    });
  }
}
