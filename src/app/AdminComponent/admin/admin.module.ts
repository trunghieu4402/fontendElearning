import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './Teacher/Teacher.component';
import { StudentComponent } from './Student/Student.component';
import { CourseComponent } from './Course/Course.component';
import { CourseSemesterGroupComponent } from './courseSemesterGroup/courseSemesterGroup.component';
import { SemesterGroupComponent } from './SemesterGroup/SemesterGroup.component';
import { ClassComponent } from './Class/Class.component';
import { AdminComponent } from './admin.component';
import { DepartmentComponent } from './Department/Department.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import { MaterialModule } from '../../material.module';
import { AddStudentComponent } from './Student/AddStudent/AddStudent.component';
import { AddDepartmentComponent } from './Department/AddDepartment/AddDepartment.component';
import { AddTeacherComponent } from './Teacher/addTeacher/addTeacher.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddCourseComponent } from './Course/addCourse/addCourse.component';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AddSemesterGroupComponent } from './SemesterGroup/AddSemesterGroup/AddSemesterGroup.component';
import { SemesterGroupDetailComponent } from './SemesterGroupDetail/SemesterGroupDetail.component';
import { AddCourseSemesterComponent } from './SemesterGroupDetail/AddCourseSemester/AddCourseSemester.component';
import { AddNewClassComponent } from './SemesterGroupDetail/AddNewClass/AddNewClass.component';

@NgModule({
  declarations: [
    TeacherComponent,
    StudentComponent,
    DepartmentComponent,
    CourseComponent,
    CourseSemesterGroupComponent,
    SemesterGroupComponent,
    ClassComponent,
    AdminComponent,
    AddStudentComponent,
    AddDepartmentComponent,
    AddTeacherComponent,
    AddCourseComponent,
    AddSemesterGroupComponent,
    SemesterGroupDetailComponent,
    AddCourseSemesterComponent,
    AddNewClassComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,

    // DepartmentModule,
  ],
  providers: [],
})
export class AdminModule {}
