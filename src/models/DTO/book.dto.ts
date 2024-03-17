// course.dto.ts
import { LessonDTO } from './auhtor.dto';

export class CourseDTO {
  id: number;
  seqNo: number;
  title: string;
  iconUrl: string;
  longDescription: string;
  category: string;
  lessons: LessonDTO[];
  createdAt: Date;
  updatedAt: Date;

  constructor(course: CourseDTO) {
    this.id = course.id;
    this.seqNo = course.seqNo;
    this.title = course.title;
    this.iconUrl = course.iconUrl;
    this.longDescription = course.longDescription;
    this.category = course.category;
    this.lessons = course.lessons ? course.lessons.map(lesson => new LessonDTO(lesson)) : [];
    this.createdAt = course.createdAt;
    this.updatedAt = course.updatedAt;
  }
}
