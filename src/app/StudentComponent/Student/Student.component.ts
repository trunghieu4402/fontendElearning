import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Student',
  templateUrl: './Student.component.html',
  styleUrls: ['./Student.component.css'],
})
export class StudentComponent implements OnInit {
  UserId: any;
  role: any;

  Nhan(event: Event) {
    const target = event.target as HTMLElement;
    this.title = target.innerText;
    window.localStorage.setItem('title', this.title);
  }
  Logout() {
    throw new Error('Method not implemented.');
  }
  title: any;

  constructor() {
    this.title = window.localStorage.getItem('title');
  }

  ngOnInit() {}
}
