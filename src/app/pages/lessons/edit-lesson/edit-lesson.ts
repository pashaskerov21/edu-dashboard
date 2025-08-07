import { Component } from '@angular/core';
import { Lesson } from '../lesson.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../lesson.service';
import Swal from 'sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-lesson',
  imports: [NgClass, TranslateModule, FormsModule, NgIf],
  templateUrl: './edit-lesson.html',
  styleUrl: './edit-lesson.scss'
})
export class EditLesson {
  lesson!: Lesson;

  name = '';
  code = '';
  classNumber: number = 1;
  teacherFirstName = '';
  teacherLastName = '';

  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private router: Router,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      const found = this.lessonService.getLessons().find(lesson => lesson.slug === slug);
      if (found) {
        this.lesson = found;

        this.name = found.name;
        this.code = found.code;
        this.classNumber = found.class;
        this.teacherFirstName = found.teacherFirstName;
        this.teacherLastName = found.teacherLastName;
      } else {
        this.router.navigate(['/lessons']);
      }
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted = true;

    const isValid = this.name.trim().length >= 2 && this.code.trim().length >= 2 && !!this.classNumber && this.classNumber > 1 && this.classNumber < 99 && this.teacherFirstName.trim().length >= 2 && this.teacherLastName.trim().length >= 2;

    if (!isValid) return;


    const updatedLesson: Omit<Lesson, 'id' | 'slug' | 'delete'> = {
      name: this.name.trim(),
      code: this.code.trim(),
      class: this.classNumber,
      teacherFirstName: this.teacherFirstName.trim(),
      teacherLastName: this.teacherLastName.trim(),
    };

    const newSlug = `${updatedLesson.name.toLowerCase().replace(/\s+/g, '-')}-${updatedLesson.class}`;
    const existing = this.lessonService.getLessons().find(l =>
      (l.slug === newSlug || (l.code === updatedLesson.code && l.class === updatedLesson.class)) &&
      l.id !== this.lesson.id
    );

    if (existing) {
      Swal.fire({
        icon: 'warning',
        title: this.translate.instant('attention'),
        text: this.translate.instant('duplicate-message'),
      });
      return;
    }

    this.lessonService.updateLesson(this.lesson.id, newSlug, updatedLesson);
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
  }
}
