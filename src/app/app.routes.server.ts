import { RenderMode, ServerRoute } from '@angular/ssr';
import { LessonService } from './pages/lessons/lesson.service';

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
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
