import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ExamService } from '../exam.service';
import Swal from 'sweetalert2';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { LessonService } from '../../lessons/lesson.service';
import { StudentService } from '../../students/student.service';
import { Lesson } from '../../lessons/lesson.model';
import { Student } from '../../students/student.model';

@Component({
  selector: 'app-list-exam',
  imports: [NgClass, NgFor, NgIf, TranslateModule, RouterLink],
  templateUrl: './list-exam.html',
  styleUrl: './list-exam.scss'
})
export class ListExam {
  constructor(
    public examService: ExamService, 
    public lessonService: LessonService,
    public studentService: StudentService,
    private translate: TranslateService
  ) { }

  getCurrentLesson(code: string): Lesson | null{
    const currentLesson = this.lessonService.getLessons().find(lesson => lesson.code === code);
    if(currentLesson){
      return currentLesson;
    }
    return null;
  }
  getCurrentStudent(id: number): Student | null{
    const currentStudent = this.studentService.getStudents().find(st => st.id === Number(id));
    if(currentStudent){
      return currentStudent;
    }
    return null;
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
      }
    });
  }
}
