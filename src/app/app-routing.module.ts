import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateComponentComponent } from './AuthenticateComponent/AuthenticateComponent.component';
import { AdminComponent } from './AdminComponent/admin/admin.component';
import { StudentComponent } from './AdminComponent/admin/Student/Student.component';
import { TeacherComponent } from './AdminComponent/admin/Teacher/Teacher.component';
import { CourseComponent } from './AdminComponent/admin/Course/Course.component';
import { ClassComponent } from './AdminComponent/admin/Class/Class.component';
import { SemesterGroupComponent } from './AdminComponent/admin/SemesterGroup/SemesterGroup.component';
import { CourseSemesterGroupComponent } from './AdminComponent/admin/courseSemesterGroup/courseSemesterGroup.component';
import { DepartmentComponent } from './AdminComponent/admin/Department/Department.component';
import { MajorComponent } from './AdminComponent/admin/Department/Major/Major.component';
import { AddStudentComponent } from './AdminComponent/admin/Student/AddStudent/AddStudent.component';
import { AddTeacherComponent } from './AdminComponent/admin/Teacher/addTeacher/addTeacher.component';
import { AdminRoutes } from './AdminComponent/admin/Admin.routing';
import { StudentRoutes } from './StudentComponent/Student.routing';

const routes: Routes = [
  { path: '', redirectTo: '/authenticate', pathMatch: 'full' },
  { path: 'authenticate', component: AuthenticateComponentComponent },
  // {path: 'admin',component: AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AdminRoutes, StudentRoutes],
  exports: [RouterModule],
})
export class AppRoutingModule {}
