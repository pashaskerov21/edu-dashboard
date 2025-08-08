import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Lesson } from '../lessons/lesson.model';
import { LessonService } from '../lessons/lesson.service';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Student } from '../students/student.model';
import { StudentService } from '../students/student.service';
import { ExamService } from '../exams/exam.service';
import { Exam } from '../exams/exam.model';

@Component({
  selector: 'app-search',
  imports: [TranslateModule, RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search {
  noResult = false;
  keyword: string = '';
  lessonResults: Lesson[] = [];
  studentResults: Student[] = [];
  examResults: Exam[] = [];
  constructor(
    private route: ActivatedRoute,
    public lessonService: LessonService,
    public studentService: StudentService,
    public examService: ExamService,
    private sanitizer: DomSanitizer
  ) { }

  highlightMatch(text: string): SafeHtml {
    if (!this.keyword) return text;
    const regex = new RegExp(`(${this.keyword})`, 'gi');
    const highlighted = text.replace(regex, `<span class="highlight">$1</span>`);
    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }

  getCurrentLesson(code: string): Lesson | null {
    const currentLesson = this.lessonService.getLessons().find(lesson => lesson.code === code);
    if (currentLesson) {
      return currentLesson;
    }
    return null;
  }
  getCurrentStudent(id: number): Student | null {
    const currentStudent = this.studentService.getStudents().find(st => st.id === Number(id));
    if (currentStudent) {
      return currentStudent;
    }
    return null;
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.keyword = params.get('key') || '';

      this.lessonResults = this.lessonService.getLessons().filter(lesson =>
        lesson.name.toLocaleLowerCase().trim().includes(this.keyword.toLocaleLowerCase().trim()) ||
        lesson.code.toLocaleLowerCase().trim().includes(this.keyword.toLocaleLowerCase().trim()) ||
        lesson.teacherFirstName.toLocaleLowerCase().trim().includes(this.keyword.toLocaleLowerCase().trim()) ||
        lesson.teacherLastName.toLocaleLowerCase().trim().includes(this.keyword.toLocaleLowerCase().trim())
      );
      this.studentResults = this.studentService.getStudents().filter(student =>
        student.firstname.toLocaleLowerCase().trim().includes(this.keyword.toLocaleLowerCase().trim()) ||
        student.lastname.toLocaleLowerCase().trim().includes(this.keyword.toLocaleLowerCase().trim())
      );
      if (this.lessonResults.length > 0) {
        this.examResults = this.examService.getExams().filter(exam =>
          this.lessonResults.some(lesson => lesson.code === exam.lessonCode)
        );
      }
      if (this.studentResults.length > 0) {
        this.examResults = this.examService.getExams().filter(exam =>
          this.studentResults.some(student => student.id === exam.studentId)
        );
      }

      if (this.lessonResults.length === 0 && this.studentResults.length === 0 && this.examResults.length === 0) {
        this.noResult = true;
      }else{
        this.noResult = false;
      }
    });
  }
}
