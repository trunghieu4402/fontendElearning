import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './Student.component';
import { InformationComponent } from './Information/Information.component';

import { TrainingProgramComponent } from './TrainingProgram/TrainingProgram.component';
import { TranscriptComponent } from './Transcript/Transcript.component';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './Register/Register.component';
import { ScheduleComponent } from './Schedule/Schedule.component';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    StudentComponent,
    InformationComponent,

    TrainingProgramComponent,
    TranscriptComponent,
    RegisterComponent,
    ScheduleComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
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
  ],
})
export class StudentModule {}
