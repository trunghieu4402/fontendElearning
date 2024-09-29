import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-AddDepartment',
  templateUrl: './AddDepartment.component.html',
  styleUrls: ['./AddDepartment.component.css']
})
export class AddDepartmentComponent implements OnInit {
Close() {
 this.location.back();
}

  constructor(private location:Location) { }

  ngOnInit() {
  }

}
