import { Component, OnInit } from '@angular/core';
import { LessonService } from '../lessons/lesson.service';
import { StudentService } from '../students/student.service';
import { ExamService } from '../exams/exam.service';
import { Lesson } from '../lessons/lesson.model';
import { Student } from '../students/student.model';
import { Exam } from '../exams/exam.model';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  lessons: Lesson[] = [];
  students: Student[] = [];
  exams: Exam[] = [];
  constructor(public lessonService: LessonService, public studentService: StudentService, public examService: ExamService ){}

  ngOnInit(): void {
    this.lessons = this.lessonService.getLessons();
    this.students = this.studentService.getStudents();
    this.exams = this.examService.getExams();
  }
}
