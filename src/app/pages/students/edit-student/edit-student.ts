import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Student } from '../student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-student',
  imports: [NgClass, TranslateModule, FormsModule, NgIf],
  templateUrl: './edit-student.html',
  styleUrl: './edit-student.scss'
})
export class EditStudent {
  student!: Student;
  firstname = '';
  lastname = '';
  class: number = 1;

  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      const found = this.studentService.getStudents().find(student => student.slug === slug);
      if (found) {
        this.student = found;
        this.firstname = found.firstname;
        this.lastname = found.lastname;
        this.class = found.class;
      } else {
        this.router.navigate(['/students']);
      }
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted = true;

    const isValid = this.firstname.trim().length >= 2 && this.lastname.trim().length >= 2 && !!this.class && this.class > 1 && this.class < 99;
    if (!isValid) return;

    const updateStudent: Omit<Student, 'id' | 'slug'> = {
      firstname: this.firstname.trim(),
      lastname: this.lastname.trim(),
      class: this.class,
    }

    const newSlug = `${updateStudent.firstname.toLowerCase().replace(/\s+/g, '-')}-${updateStudent.lastname.toLowerCase().replace(/\s+/g, '-')}-${this.student.id}`;

    this.studentService.updateStudent(this.student.id, newSlug, updateStudent);
    Swal.fire({
      title: this.translate.instant('congrulations'),
      text: this.translate.instant('save-message'),
      icon: 'success',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/students']);
      }
    });
  }
}
