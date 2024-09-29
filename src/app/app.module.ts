import { TeacherComponent } from './AdminComponent/admin/Teacher/Teacher.component';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticateComponentComponent } from './AuthenticateComponent/AuthenticateComponent.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './AdminComponent/admin/admin.module';
import { CommonModule, DatePipe } from '@angular/common';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { StudentModule } from './StudentComponent/Student/student.module';
// import { DepartmentModule } from './AdminComponent/admin/Department/department.module';

@NgModule({
  declarations: [AppComponent, AuthenticateComponentComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AdminModule,
    StudentModule,
    AppRoutingModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [provideClientHydration(), provideAnimationsAsync(), DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
