import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ExamService } from '../exam.service';
import Swal from 'sweetalert2';
import { LessonService } from '../../lessons/lesson.service';
import { StudentService } from '../../students/student.service';
import { Lesson } from '../../lessons/lesson.model';
import { Student } from '../../students/student.model';
import { Exam } from '../exam.model';

@Component({
  selector: 'app-list-exam',
  imports: [TranslateModule, RouterLink],
  templateUrl: './list-exam.html',
  styleUrl: './list-exam.scss'
})
export class ListExam implements OnInit {
  exams: Exam[] = [];
  constructor(
    public examService: ExamService,
    public lessonService: LessonService,
    public studentService: StudentService,
    private translate: TranslateService
  ) {

  }

  ngOnInit(): void {
    this.exams = this.examService.getExams();
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


  formatDate(input: string): string {
    const date = new Date(input);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Aylar 0-dan başlayır
    const year = date.getFullYear();

    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hour}:${minute}`;
  }

  selectedRowIDs: number[] = [];

  selectRow(id: number) {
    if (this.selectedRowIDs.includes(id)) {
      this.selectedRowIDs = this.selectedRowIDs.filter(rowId => rowId !== id);
    } else {
      this.selectedRowIDs = [...this.selectedRowIDs, id];
    }
  }

  isSelected(id: number): boolean {
    return this.selectedRowIDs.includes(id);
  }
  selectAll() {
    const allIds = this.examService.getExams().map(exam => exam.id);
    if (this.selectedRowIDs.length === allIds.length) {

      this.selectedRowIDs = [];
    } else {

      this.selectedRowIDs = allIds;
    }
  }

  deleteSelected() {

    Swal.fire({
      title: this.translate.instant('attention'),
      text: this.translate.instant('delete-warning-message'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('yes'),
      cancelButtonText: this.translate.instant('no'),
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {

        this.selectedRowIDs.forEach(id => {
          const exam = this.examService.getExams().find(l => l.id === id);
          if (exam) {
            this.examService.updateDeleteValue(id)
          }
        })
        this.selectedRowIDs = [];
        Swal.fire(
          this.translate.instant('congrulations'),
          this.translate.instant('delete-success-message'),
          'success'
        );
        this.ngOnInit();
      }
    });
  }

  delete(id: number) {
    Swal.fire({
      title: this.translate.instant('attention'),
      text: this.translate.instant('delete-warning-message'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('yes'),
      cancelButtonText: this.translate.instant('no'),
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.examService.deleteExam(id);
        Swal.fire(this.translate.instant('congrulations'), this.translate.instant('delete-success-message'), 'success');
        this.ngOnInit();
      }
    });
  }
}
