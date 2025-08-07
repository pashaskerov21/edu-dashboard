import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LessonService } from '../lesson.service';
import Swal from 'sweetalert2';
import { Lesson } from '../lesson.model';
import { FormsModule, NgModel } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-lesson',
  imports: [TranslateModule, FormsModule, NgClass, NgIf],
  templateUrl: './add-lesson.html',
  styleUrl: './add-lesson.scss'
})
export class AddLesson {
  name = '';
  code = '';
  classNumber: number | null = null;
  teacherFirstName = '';
  teacherLastName = '';

  submitted = false;

  constructor(public lessonService: LessonService, private translate: TranslateService, private router: Router) { }

  addLesson(event: Event): void {
    event.preventDefault();
    this.submitted = true;

    const isValid = this.name.trim().length >= 2 && this.code.trim().length >= 2 && !!this.classNumber && this.classNumber > 1 && this.classNumber < 99 && this.teacherFirstName.trim().length >= 2 && this.teacherLastName.trim().length >= 2;

    if (!isValid) return;

    const currentLessons = this.lessonService.getLessons();
    const isDuplicate = currentLessons.some(lesson =>
      lesson.code.toLocaleLowerCase().trim() === this.code.toLocaleLowerCase().trim() ||
      (lesson.name.toLocaleLowerCase().trim() === this.name.toLocaleLowerCase().trim() && lesson.class === this.classNumber)
    );

    if (isDuplicate) {
      Swal.fire({
        icon: 'warning',
        title: this.translate.instant('attention'),
        text: this.translate.instant('duplicate-message'),
      });
      return;
    }

    const lastId = currentLessons.length > 0 ? currentLessons[currentLessons.length - 1].id : 0;
    const newId = lastId + 1;
    const slug = `${this.name.trim().toLocaleLowerCase().replace(/\s+/g, '-')}-${this.classNumber}`;

    const newLesson: Lesson = {
      id: newId,
      name: this.name.trim(),
      code: this.code.trim(),
      class: this.classNumber!,
      teacherFirstName: this.teacherFirstName.trim(),
      teacherLastName: this.teacherLastName.trim(),
      slug: slug
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
    this.code = '';
    this.classNumber = null;
    this.teacherFirstName = '';
    this.teacherLastName = '';
    this.submitted = false;
  }
}
