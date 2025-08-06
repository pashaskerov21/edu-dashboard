import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Lessons } from './pages/lessons/lessons';
import { Students } from './pages/students/students';
import { Exams } from './pages/exams/exams';
import { Deleted } from './pages/deleted/deleted';
import { AddLesson } from './pages/lessons/add/add';
import { AddStudent } from './pages/students/add/add';
import { AddExam } from './pages/exams/add/add';
import { LessonList } from './pages/lessons/list/list';
import { StudentList } from './pages/students/list/list';
import { ExamList } from './pages/exams/list/list';
import { EditLesson } from './pages/lessons/edit/edit';

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
        component: LessonList,
        data: { breadcrumb: 'all' },
      },
      {
        path: 'add',
        component: AddLesson,
        data: { breadcrumb: 'add-lesson' },
      }
    ]
  },
  {
    path: 'students',
    component: Students,
    data: { breadcrumb: 'students' },
    children: [
      {
        path: '',
        component: StudentList,
        data: { breadcrumb: 'all' },
      },
      {
        path: 'add',
        component: AddStudent,
        data: { breadcrumb: 'add-student' },
      },
      {
        path: ':id',
        component: EditLesson,
        data: { breadcrumb: 'edit-lesson' },
      }
    ]
  },
  {
    path: 'exams',
    component: Exams,
    data: { breadcrumb: 'exams' },
    children: [
      {
        path: '',
        component: ExamList,
        data: { breadcrumb: 'all' },
      },
      {
        path: 'add',
        component: AddExam,
        data: { breadcrumb: 'add-exam' },
      }
    ]
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
