import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { LessonService } from '../lesson.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Lesson } from '../lesson.model';

@Component({
  selector: 'app-list-lesson',
  imports: [ TranslateModule, RouterLink],
  templateUrl: './list-lesson.html',
  styleUrl: './list-lesson.scss'
})
export class ListLesson implements OnInit {
  lessons: Lesson[] = [];
  constructor( public lessonService: LessonService, private translate: TranslateService, public router: Router) { 
    
  }
  ngOnInit(): void {
    this.lessons = this.lessonService.getLessons();
  }
  
  // lessons = this.lessonService.getLessons();
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
    const allIds = this.lessonService.getLessons().map(lesson => lesson.id);
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
          const lesson = this.lessonService.getLessons().find(l => l.id === id);
          if(lesson){
            this.lessonService.updateDeleteValue(id)
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
        this.lessonService.deleteLesson(id);
        Swal.fire(this.translate.instant('congrulations'), this.translate.instant('delete-success-message'), 'success');
        this.ngOnInit();
      }
    });
  }
}
