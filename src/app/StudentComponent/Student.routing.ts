import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './Student/Student.component';
import { InformationComponent } from './Student/Information/Information.component';

import { TrainingProgramComponent } from './Student/TrainingProgram/TrainingProgram.component';
import { TranscriptComponent } from './Student/Transcript/Transcript.component';
import { RegisterComponent } from './Student/Register/Register.component';
import { ScheduleComponent } from './Student/Schedule/Schedule.component';

const routes: Routes = [
  {
    path: 'student',
    component: StudentComponent,
    children: [
      { path: 'information', component: InformationComponent },

      { path: 'studyprograms', component: TrainingProgramComponent },
      { path: 'transcript', component: TranscriptComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'schedule', component: ScheduleComponent },
    ],
  },
];

export const StudentRoutes = RouterModule.forChild(routes);
