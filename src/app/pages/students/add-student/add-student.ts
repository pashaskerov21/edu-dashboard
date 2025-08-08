import { Component } from '@angular/core';
import { StudentService } from '../student.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Student } from '../student.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  imports: [TranslateModule, FormsModule],
  templateUrl: './add-student.html',
  styleUrl: './add-student.scss'
})
export class AddStudent {
  firstname = '';
  lastname = '';
  class: number | null = null;

  submitted = false;

  constructor(public studentService: StudentService, private translate: TranslateService, private router: Router) { }

  addStudent(event: Event): void {
    event.preventDefault();
    this.submitted = true;

    const isValid = this.firstname.trim().length >= 2 && this.lastname.trim().length >= 2 && !!this.class && this.class > 1 && this.class < 99;
    if (!isValid) return;

    const currentStudents = this.studentService.getStudents();

    const lastId = currentStudents.length > 0 ? currentStudents[currentStudents.length - 1].id : 0;
    const newId = lastId + 1;
    const slug = `${this.firstname.toLocaleLowerCase().trim().replace(/\s+/g, '-')}-${this.lastname.toLocaleLowerCase().trim().replace(/\s+/g, '-')}-${newId}`;

    const newStudent: Student = {
      id: newId,
      slug: slug,
      firstname: this.firstname.trim(),
      lastname: this.lastname.trim(),
      class: this.class!,
      delete: 0,
    }

    this.studentService.addStudent(newStudent);
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

    //Form reset
    this.firstname = '';
    this.lastname = '';
    this.class = null;
    this.submitted = false;
  }
}
