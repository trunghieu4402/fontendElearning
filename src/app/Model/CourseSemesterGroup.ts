import { Class } from './Class';

export class CourseSemesterGroup {
  courseId!: string;
  courseName!: string;
  Semester!: string;
  id!: string;
  ListClass: Class[] = [];
}
