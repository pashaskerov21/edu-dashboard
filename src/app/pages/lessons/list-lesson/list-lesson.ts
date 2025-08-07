import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { LessonService } from '../lesson.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-lesson',
  imports: [NgClass, NgFor, NgIf, TranslateModule, RouterLink],
  templateUrl: './list-lesson.html',
  styleUrl: './list-lesson.scss'
})
export class ListLesson {
  constructor(public lessonService: LessonService, private translate: TranslateService) { }

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
    const allIds = this.lessonService.lessons().map(lesson => lesson.id);
    if (this.selectedRowIDs.length === allIds.length) {
      // Əgər hamısı seçilibsə, hamısını təmizlə
      this.selectedRowIDs = [];
    } else {
      // Əks halda hamısını seç
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
        this.selectedRowIDs.forEach(id => this.lessonService.deleteLesson(id));
        this.selectedRowIDs = []; // seçimləri sıfırla
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
        this.lessonService.deleteLesson(id);
        Swal.fire(this.translate.instant('congrulations'), this.translate.instant('delete-success-message'), 'success');
      }
    });
  }
}
