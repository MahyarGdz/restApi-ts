// lesson.dto.ts
export class LessonDTO {
  id: number;
  title: string;
  duration: string; // Assuming there's a duration property in your Lesson entity
  // Add more properties if needed

  constructor(lesson: LessonDTO) {
    this.id = lesson.id;
    this.title = lesson.title;
    this.duration = lesson.duration;
    // Initialize more properties as needed
  }
}
