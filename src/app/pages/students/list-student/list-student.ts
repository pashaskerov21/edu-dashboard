import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StudentService } from '../student.service';
import Swal from 'sweetalert2';
import { Student } from '../student.model';
import Sortable from 'sortablejs';

@Component({
  selector: 'app-list-student',
  imports: [TranslateModule, RouterLink],
  templateUrl: './list-student.html',
  styleUrl: './list-student.scss'
})
export class ListStudent implements OnInit {
  students: Student[] = [];
  isDraggingActive = false;
  sortableInstance: Sortable | null = null;


  constructor(public studentService: StudentService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.students = this.studentService.getStudents();
    this.students.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
  }

  toggleDrag() {
    this.isDraggingActive = !this.isDraggingActive;

    const el = document.getElementById('tbody');
    if (!el) return;

    if (this.isDraggingActive) {
      Sortable.create(el, {
        animation: 150,
        handle: ".sort-btn",
        onChoose: (evt) => {
          const btn = evt.item.querySelector('.sort-btn') as HTMLElement;
          if (btn) btn.classList.add('active');
        },
        onUnchoose: (evt) => {
          const btn = evt.item.querySelector('.sort-btn') as HTMLElement;
          if (btn) btn.classList.remove('active');
        },
        onEnd: (evt) => {
          const item = this.students.splice(evt.oldIndex!, 1)[0];
          this.students.splice(evt.newIndex!, 0, item);

          this.students.forEach((student, index) => {
            student.sort = index + 1;
          })
        }
      })
    } else {
      if (this.sortableInstance) {
        this.sortableInstance.destroy();
        this.sortableInstance = null;
      }
    }
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
    const allIds = this.studentService.getStudents().map(student => student.id);
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
          const student = this.studentService.getStudents().find(l => l.id === id);
          if (student) {
            this.studentService.updateDeleteValue(id)
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
        this.studentService.deleteStudent(id);
        Swal.fire(this.translate.instant('congrulations'), this.translate.instant('delete-success-message'), 'success');
        this.ngOnInit();
      }
    });
  }
}
