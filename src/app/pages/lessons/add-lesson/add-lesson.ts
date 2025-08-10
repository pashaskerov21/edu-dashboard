import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LessonService } from '../lesson.service';
import Swal from 'sweetalert2';
import { Lesson } from '../lesson.model';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-lesson',
  imports: [TranslateModule, FormsModule],
  templateUrl: './add-lesson.html',
  styleUrl: './add-lesson.scss'
})
export class AddLesson {
  name = '';
  classNumber: number | null = null;
  teacherFirstName = '';
  teacherLastName = '';

  submitted = false;

  constructor(public lessonService: LessonService, private translate: TranslateService, private router: Router) { }

  addLesson(event: Event): void {
    event.preventDefault();
    this.submitted = true;

    const isValid = this.name.trim().length >= 2 && !!this.classNumber && this.classNumber > 1 && this.classNumber < 99 && this.teacherFirstName.trim().length >= 2 && this.teacherLastName.trim().length >= 2;

    if (!isValid) return;

    const currentLessons = this.lessonService.getLessons();
    const isDuplicate = currentLessons.some(lesson =>
      lesson.name.toLocaleLowerCase().trim() === this.name.toLocaleLowerCase().trim() && 
      lesson.teacherFirstName.toLocaleLowerCase().trim() === this.teacherFirstName.toLocaleLowerCase().trim() && 
      lesson.teacherLastName.toLocaleLowerCase().trim() === this.teacherLastName.toLocaleLowerCase().trim() && 
      lesson.class === this.classNumber
    );

    if (isDuplicate) {
      Swal.fire({
        icon: 'warning',
        title: this.translate.instant('attention'),
        text: this.translate.instant('duplicate-message'),
      });
      return;
    }

    
    const newId = this.lessonService.getRealLength() + 1;
    const newCode = this.lessonService.generateUniqueCode();
    const slug = `${this.name.trim().toLocaleLowerCase().replace(/\s+/g, '-')}-${newCode}${this.classNumber}`;


    const newLesson: Lesson = {
      id: newId,
      name: this.name.trim(),
      code: newCode,
      class: this.classNumber!,
      teacherFirstName: this.teacherFirstName.trim(),
      teacherLastName: this.teacherLastName.trim(),
      slug: slug,
      delete: 0,
      sort: newId,
    };

    this.lessonService.addLesson(newLesson);

    Swal.fire({
      title: this.translate.instant('congrulations'),
      text: this.translate.instant('save-message'),
      icon: 'success',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/lessons']);
      }
    });

    // Form reset
    this.name = '';
    this.classNumber = null;
    this.teacherFirstName = '';
    this.teacherLastName = '';
    this.submitted = false;
  }
}
