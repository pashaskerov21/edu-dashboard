import { RenderMode, ServerRoute } from '@angular/ssr';
import { LessonService } from './pages/lessons/lesson.service';
import { StudentService } from './pages/students/student.service';
import { ExamService } from './pages/exams/exam.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'lessons/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const lessonService = new LessonService();
      const lessons = lessonService.getLessons();

      return lessons.map(lesson => ({ slug: lesson.slug }));
    }
  },
  {
    path: 'students/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const studentService = new StudentService();
      const students = studentService.getStudents();

      return students.map(student => ({ slug: student.slug }));
    }
  },
  {
    path: 'exams/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const examService = new ExamService();
      const exams = examService.getExams();

      return exams.map(exam => ({ slug: exam.slug }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
