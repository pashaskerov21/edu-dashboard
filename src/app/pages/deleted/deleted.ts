import { Component, OnInit } from '@angular/core';
import { Lesson } from '../lessons/lesson.model';
import { Student } from '../students/student.model';
import { Exam } from '../exams/exam.model';
import { LessonService } from '../lessons/lesson.service';
import { ExamService } from '../exams/exam.service';
import { StudentService } from '../students/student.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deleted',
  imports: [TranslateModule],
  templateUrl: './deleted.html',
  styleUrl: './deleted.scss'
})
export class Deleted implements OnInit {
  deletedLessons: Lesson[] = [];
  deletedStudents: Student[] = [];
  deletedExams: Exam[] = [];

  constructor(public lessonService: LessonService, public studentService: StudentService, public examService: ExamService, public translate: TranslateService) {

  }

  ngOnInit(): void {
    this.deletedLessons = this.lessonService.getDeletedLessons();
    this.deletedStudents = this.studentService.getDeletedStudents();
    this.deletedExams = this.examService.getDeletedExams();
  }


  getCurrentLesson(code: string): Lesson | null {
    const currentLesson = this.lessonService.getLessons().find(lesson => lesson.code === code);
    if (currentLesson) {
      return currentLesson;
    }
    return null;
  }
  getCurrentStudent(id: number): Student | null {
    const currentStudent = this.studentService.getStudents().find(st => st.id === Number(id));
    if (currentStudent) {
      return currentStudent;
    }
    return null;
  }

  restoreLessonFunction(id: number) {
    const status: boolean = this.lessonService.restoreLesson(id);
    if (status) {
      Swal.fire({
        title: this.translate.instant('congrulations'),
        text: this.translate.instant('restore-success-message'),
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.ngOnInit();
    } else {
      Swal.fire({
        icon: 'warning',
        title: this.translate.instant('attention'),
        text: this.translate.instant('restore-warning-message'),
      });
    }
  }
  restoreStudenFunction(id: number) {
    const status: boolean = this.studentService.restoreStudent(id);
    if (status) {
      Swal.fire({
        title: this.translate.instant('congrulations'),
        text: this.translate.instant('restore-success-message'),
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.ngOnInit();
    } else {
      Swal.fire({
        icon: 'warning',
        title: this.translate.instant('attention'),
        text: this.translate.instant('restore-warning-message'),
      });
    }
  }
  restoreExamFunction(id: number) {
    const exam = this.examService.getDeletedExams().find(exam => exam.id === id);
    if (exam) {
      const lesson = this.lessonService.getLessons().find(l => l.code === exam.lessonCode);
      const student = this.studentService.getStudents().find(s => s.id === exam.studentId);
      if (lesson && student) {
        const status: boolean = this.examService.restoreExam(id);
        if (status) {
          Swal.fire({
            title: this.translate.instant('congrulations'),
            text: this.translate.instant('restore-success-message'),
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.ngOnInit();
        } else {
          Swal.fire({
            icon: 'warning',
            title: this.translate.instant('attention'),
            text: this.translate.instant('restore-warning-message'),
          });
        }
      } else {
        Swal.fire({
          icon: 'warning',
          title: this.translate.instant('attention'),
          text: this.translate.instant('bu-melumat-berpa-oluna-bilmez'),
        });
      }
    }

  }
}
