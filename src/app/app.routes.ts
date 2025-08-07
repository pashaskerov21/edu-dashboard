import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Lessons } from './pages/lessons/lessons';
import { Students } from './pages/students/students';
import { Exams } from './pages/exams/exams';
import { Deleted } from './pages/deleted/deleted';
import { AddLesson } from './pages/lessons/add-lesson/add-lesson';
import { ListLesson } from './pages/lessons/list-lesson/list-lesson';
import { EditLesson } from './pages/lessons/edit-lesson/edit-lesson';
import { LessonService } from './pages/lessons/lesson.service';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    data: { breadcrumb: 'dashboard' },
  },
  {
    path: 'lessons',
    component: Lessons,
    data: { breadcrumb: 'lessons' },
    children: [
      {
        path: '',
        component: ListLesson,
        data: { breadcrumb: 'all' },
      },
      {
        path: 'add',
        component: AddLesson,
        data: { breadcrumb: 'add-lesson' },
      },
      {
        path: ':slug',
        component: EditLesson,
        data: { breadcrumb: 'edit' },
      }
    ]
  },
  {
    path: 'students',
    component: Students,
    data: { breadcrumb: 'students' },
    // children: [
    //   {
    //     path: '',
    //     component: StudentList,
    //     data: { breadcrumb: 'all' },
    //   },
    //   {
    //     path: 'add',
    //     component: AddStudent,
    //     data: { breadcrumb: 'add-student' },
    //   },
    // ]
  },
  {
    path: 'exams',
    component: Exams,
    data: { breadcrumb: 'exams' },
    // children: [
    //   {
    //     path: '',
    //     component: ExamList,
    //     data: { breadcrumb: 'all' },
    //   },
    //   {
    //     path: 'add',
    //     component: AddExam,
    //     data: { breadcrumb: 'add-exam' },
    //   }
    // ]
  },
  {
    path: 'deleted',
    component: Deleted,
    data: { breadcrumb: 'deleted' },
  },
  {
    path: '**',
    redirectTo: ''
  }
];
