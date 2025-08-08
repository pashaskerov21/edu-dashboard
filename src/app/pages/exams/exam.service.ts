import { Injectable, signal } from "@angular/core";
import { Exam } from "./exam.model";


@Injectable({ providedIn: 'root' })
export class ExamService {

    private examsSignal = signal<Exam[]>([
        {
            id: 1,
            lessonCode: 'a3c',
            studentId: 3,
            score: 5,
            date: '2025-08-07T09:00',
            slug: 'riyaziyyat-ferid-haciyev-1',
            delete: 0,
        },
        {
            id: 2,
            lessonCode: 't5g',
            studentId: 2,
            score: 4,
            date: '2025-08-07T11:00',
            slug: 'kimya-leyla-rzayeva-2',
            delete: 0,
        },
    ]);

    getRealLength(): number {
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
            exams.filter(exam => exam.lessonCode !== code)
        );
    }

    deleteExamsByStudentId(id: number) {
        this.examsSignal.update(exams =>
            exams.filter(exam => exam.studentId !== id)
        );
    }


}