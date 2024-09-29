import { Person } from "./Person";

export class Student extends Person {
    score!: number;
    majorId!: string;
    status!: boolean;
    startStudyTime!: string;
    finishStudyTime!: string;
    totalCredits!: number;
}
