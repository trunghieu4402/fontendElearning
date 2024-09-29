export class Course {
  courseId!: string;
  courseName!: string;
  credits!: number;
  coefficient!: number;
  type!: string;
  requestCredits!: number;
  prerequisites: string[] = new Array();
  constructor(
    id: string,
    name: string,
    cre: number,
    coe: number,
    type: string,
    recre: number,
    pre: string[]
  ) {
    this.courseId = id;
    this.courseName = name;
    this.credits = cre;
    this.coefficient = coe;
    this.type = type;
    this.requestCredits = recre;
    this.prerequisites = pre;
  }
}
