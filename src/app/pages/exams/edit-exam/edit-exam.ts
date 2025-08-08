import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Exam } from '../exam.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../exam.service';
import { LessonService } from '../../lessons/lesson.service';
import { StudentService } from '../../students/student.service';
import Swal from 'sweetalert2';
import { Lesson } from '../../lessons/lesson.model';
import { Student } from '../../students/student.model';

@Component({
  selector: 'app-edit-exam',
  imports: [TranslateModule, FormsModule],
  templateUrl: './edit-exam.html',
  styleUrl: './edit-exam.scss'
})
export class EditExam {
  exam!: Exam;

  lessonCode = '';
  studentId: number = 1;
  date = '';
  score: number = 1;

  submitted = false;


  constructor(
    private route: ActivatedRoute,
    public examService: ExamService,
    public lessonService: LessonService,
    public studentService: StudentService,
    private router: Router,
    private translate: TranslateService,
  ) { }


  lessons: Lesson[] = [];
  students: Student[] = [];

  ngOnInit(): void {

    this.lessons = this.lessonService.getLessons();
    this.students = this.studentService.getStudents();

    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      const found = this.examService.getExams().find(exam => exam.slug === slug);
      if (found) {
        this.exam = found;

        this.lessonCode = found.lessonCode;
        this.studentId = found.studentId;
        this.date = found.date;
        this.score = found.score
      } else {
        this.router.navigate(['/exams']);
      }
    }
  }


  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted = true;

    const isValid = this.lessonCode && this.studentId && this.date && this.score && this.score > 0 && this.score < 10;
    if (!isValid) return;

    const updateExam: Omit<Exam, 'id' | 'slug' | 'delete'> = {
      lessonCode: this.lessonCode,
      studentId: this.studentId,
      date: this.date,
      score: this.score,
    }


    const currentLesson = this.lessonService.getLessons().find(lesson => lesson.code === this.lessonCode);
    const currentStudent = this.studentService.getStudents().find(student => student.id === Number(this.studentId));

    const newSlug = `${currentStudent?.firstname.toLocaleLowerCase().trim().replace(/\s+/g, '-')}-${currentStudent?.lastname.toLocaleLowerCase().trim().replace(/\s+/g, '-')}-${currentLesson?.name.toLocaleLowerCase().trim().replace(/\s+/g, '-')}-${this.exam.id}`;
    const existing = this.examService.getExams().find(ex =>
      (ex.slug === newSlug || (ex.lessonCode === updateExam.lessonCode && ex.studentId === updateExam.studentId)) &&
      ex.id !== this.exam.id
    );

    if (existing) {
      Swal.fire({
        icon: 'warning',
        title: this.translate.instant('attention'),
        text: this.translate.instant('duplicate-message'),
      });
      return;
    }
    if (currentLesson && currentStudent && Number(currentLesson.class) !== Number(currentStudent.class)) {
      Swal.fire({
        icon: 'warning',
        title: this.translate.instant('attention'),
        text: this.translate.instant('exam-class-warning-message'),
      });
      return;
    }
    
    this.examService.updateExam(this.exam.id, newSlug, updateExam);
    Swal.fire({
      title: this.translate.instant('congrulations'),
      text: this.translate.instant('save-message'),
      icon: 'success',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/exams']);
      }
    });

  }
}
