import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from '../../AdminComponent/admin/Teacher/Teacher.component';
import { AdminComponent } from './admin.component';
import { ClassComponent } from './Class/Class.component';
import { CourseComponent } from './Course/Course.component';
import { CourseSemesterGroupComponent } from './courseSemesterGroup/courseSemesterGroup.component';
import { DepartmentComponent } from './Department/Department.component';
import { MajorComponent } from './Department/Major/Major.component';
import { SemesterGroupComponent } from './SemesterGroup/SemesterGroup.component';
import { AddStudentComponent } from './Student/AddStudent/AddStudent.component';
import { AddTeacherComponent } from './Teacher/addTeacher/addTeacher.component';
import { StudentComponent } from './Student/Student.component';
import { AddDepartmentComponent } from './Department/AddDepartment/AddDepartment.component';
import { AddCourseComponent } from './Course/addCourse/addCourse.component';
import { SemesterGroupDetailComponent } from './SemesterGroupDetail/SemesterGroupDetail.component';
import { AddNewClassComponent } from './SemesterGroupDetail/AddNewClass/AddNewClass.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'department',
        component: DepartmentComponent,
        children: [
          { path: 'major', component: MajorComponent },
          { path: 'addDepartment', component: AddDepartmentComponent },
        ],
      },
      {
        path: 'student',
        component: StudentComponent,
        children: [{ path: 'addStudent', component: AddStudentComponent }],
      },
      {
        path: 'teacher',
        component: TeacherComponent,
        children: [{ path: 'addTeacher', component: AddTeacherComponent }],
      },
      {
        path: 'course',
        component: CourseComponent,
        children: [{ path: 'addCourse', component: AddCourseComponent }],
      },
      { path: 'class', component: ClassComponent },
      {
        path: 'semestergroup',
        component: SemesterGroupComponent,
      },
      {
        path: 'semesterGroupDetail',
        component: SemesterGroupDetailComponent,
      },
      { path: 'coursesemestergroup', component: CourseSemesterGroupComponent },
    ],
  },
];

export const AdminRoutes = RouterModule.forChild(routes);
