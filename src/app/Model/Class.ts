import { ClassDetail } from './ClassDetail';

export class Class {
  ClassId!: string;
  ClassDetail: ClassDetail[] = [];
  currentSlot!: number;
  maxSlot!: number;
}
