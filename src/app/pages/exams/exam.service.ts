import { Injectable, signal } from "@angular/core";
import { Exam } from "./exam.model";


@Injectable({ providedIn: 'root' })
export class ExamService {

    private examsSignal = signal<Exam[]>([
        {
            id: 1,
            lessonCode: 'a3c',
            studentId: 3,
            score: 3,
            date: '7/18/2001',
            slug: 'riyaziyyat-ferid-haciyev-1',
            delete: 0,
        }
    ]);

    getRealLength(): number{
        return this.examsSignal().length;
    }
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
    restoreExam(id: number) {
        const deletedExam = this.getDeletedExams().find(exam => exam.id === id);
        if (deletedExam) {
            const isHave = this.getExams().find(exam =>
                exam.lessonCode === deletedExam.lessonCode &&
                exam.studentId === deletedExam.studentId &&
                exam.date && deletedExam.date
            );
            if (isHave) {
                return false;
            }
            this.examsSignal.update(exams =>
                exams.map(exam =>
                    exam.id === id ? { ...exam, delete: 0 } : exam
                )
            );
            return true
        }
        return false;
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