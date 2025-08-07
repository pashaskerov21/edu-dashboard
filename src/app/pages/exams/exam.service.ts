import { Injectable, signal } from "@angular/core";
import { Exam } from "./exam.model";

@Injectable({ providedIn: 'root' })
export class ExamService {
    private examsSignal = signal<Exam[]>([
        {
            id: 1,
            lessonCode: 'MAT',
            studentId: 1,
            score: 3,
            date: '07/18/2001',
            slug: 'riyaziyyat-ferid-haciyev-1',
            delete: 0,
        }
    ]);


    getExams(): Exam[] {
        return this.examsSignal().filter(exam => exam.delete === 0);
    }
    getDeletedExams(): Exam[] {
        return this.examsSignal().filter(exam => exam.delete === 1);
    }
    deleteExam(id: number) {
        this.examsSignal.update(exams =>
            exams.map(exam =>
                exam.id === id ? { ...exam, delete: 1 } : exam
            )
        );
    }
    addExam(newExam: Exam) {
        this.examsSignal.update(exams => [
            ...exams,
            {
                ...newExam,
            }
        ])
    }
    updateExam(id: number, slug: string, updated: Omit<Exam, 'id' | 'slug' | 'delete'>) {
        this.examsSignal.update(exams =>
            exams.map(exam =>
                exam.id === id ? { ...exam, ...updated, slug: slug } : exam
            )
        )
    }
    updateDeleteValue(id: number) {
        this.examsSignal.update(exams =>
            exams.map(exam => exam.id === id ? { ...exam, delete: 1 } : exam)
        )
    }

    deleteExamsByLessonCode(code: string) {
        this.examsSignal.update(exams =>
            exams.map(exam =>
                exam.lessonCode === code ? { ...exam, delete: 1 } : exam
            )
        );
    }
    deleteExamsByStudentId(id: number) {
        this.examsSignal.update(exams =>
            exams.map(exam =>
                exam.studentId === id ? { ...exam, delete: 1 } : exam
            )
        )
    }
}