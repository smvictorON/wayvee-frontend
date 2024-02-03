export default interface ILesson {
  _id?: string;
  date: string;
  hour_start: string;
  hour_end: string;
  teacher: string;
  students: Array<string>;
  class?: string;
  subject?: string;
  observation?: string;
  status: 'Active' | 'Cancelled' | 'Done';
  createdAt?: Date;
  updatedAt?: Date;
}


