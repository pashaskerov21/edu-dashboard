import { Component } from '@angular/core';
import { StudentService } from '../../students/student.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { ExamService } from '../exam.service';
import { LessonService } from '../../lessons/lesson.service';
import { Exam } from '../exam.model';
import Swal from 'sweetalert2';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Lesson } from '../../lessons/lesson.model';
import { Student } from '../../students/student.model';

@Component({
  selector: 'app-add-exam',
  imports: [TranslateModule, FormsModule, RouterLink],
  templateUrl: './add-exam.html',
  styleUrl: './add-exam.scss'
})
export class AddExam {
  lessonCode = '';
  studentId: number | null = null;
  date = '';
  score: number | null = null;

  submitted = false;

  lessons: Lesson[] = [];
  students: Student[] = [];

  constructor(
    public lessonService: LessonService,
    public studentService: StudentService,
    public examService: ExamService,
    private translate: TranslateService,
    private router: Router
  ) {
    this.lessons = this.lessonService.getLessons();
    this.students = this.studentService.getStudents();
  }

  formatDate(dateString: string): string {
    return new Intl.DateTimeFormat('en-US').format(new Date(dateString));
  }
  addExam(event: Event): void {
    event.preventDefault();
    this.submitted = true;

    const isValid = this.lessonCode && this.studentId && this.date && this.score && this.score > 0 && this.score < 10;
    if (!isValid) return;

    const currentExams = this.examService.getExams();
    const currentLesson = this.lessonService.getLessons().find(lesson => lesson.code === this.lessonCode);
    const currentStudent = this.studentService.getStudents().find(student => student.id === Number(this.studentId));


    const isDuplicate = currentExams.some(exam =>
      exam.lessonCode === this.lessonCode && this.studentId &&
      +exam.studentId === +this.studentId &&
      exam.date === this.date
    );
    if (isDuplicate) {
      Swal.fire({
        icon: 'warning',
        title: this.translate.instant('attention'),
        text: this.translate.instant('duplicate-message'),
      });
      return;
    }

    if (currentLesson && currentStudent && Number(currentLesson.class) !== Number(currentStudent.class)) {
      Swal.fire({
        icon: 'warning',
        title: this.translate.instant('attention'),
        text: this.translate.instant('exam-class-warning-message'),
      });
      return;
    }

    const lastId = currentExams.length > 0 ? currentExams[currentExams.length - 1].id : 0;
    const newId = lastId + 1;
    const slug = `${currentStudent?.firstname.toLocaleLowerCase().trim().replace(/\s+/g, '-')}-${currentStudent?.lastname.toLocaleLowerCase().trim().replace(/\s+/g, '-')}-${currentLesson?.name.toLocaleLowerCase().trim().replace(/\s+/g, '-')}-${newId}`;

    const newExam: Exam = {
      id: newId,
      slug: slug,
      lessonCode: this.lessonCode,
      studentId: this.studentId!,
      date: this.formatDate(this.date),
      score: this.score!,
      delete: 0,
    }

    this.examService.addExam(newExam);
    Swal.fire({
      title: this.translate.instant('congrulations'),
      text: this.translate.instant('save-message'),
      icon: 'success',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/exams']);
      }
    });

    // Form reset
    this.lessonCode = '';
    this.studentId = null;
    this.date = '';
    this.score = null;
    this.submitted = false;
  }

}
