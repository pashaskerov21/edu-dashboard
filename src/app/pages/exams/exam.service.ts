import { Injectable, signal } from "@angular/core";
import { Exam } from "./exam.model";


@Injectable({ providedIn: 'root' })
export class ExamService {

    private examsSignal = signal<Exam[]>([
        { id: 1, slug: "elvin-qasımov-riyaziyyat-1", lessonCode: "a3c", studentId: 3, date: "2025-08-05T09:00", score: 5, delete: 0, sort: 1 }, 
        { id: 3, slug: "aysel-əliyeva-riyaziyyat-3", lessonCode: "a3c", studentId: 4, date: "2025-08-05T09:00", score: 4, delete: 0, sort: 2 }, 
        { id: 4, slug: "nihat-məmmədov-fizika-4", lessonCode: "v42", studentId: 5, date: "2025-08-06T10:30", score: 5, delete: 0, sort: 3 }, 
        { id: 5, slug: "mehdi-orucov-fizika-5", lessonCode: "v42", studentId: 6, date: "2025-08-06T10:30", score: 3, delete: 0, sort: 4 }, 
        { id: 6, slug: "teymur-əliyev-fizika-6", lessonCode: "v42", studentId: 7, date: "2025-08-06T10:30", score: 5, delete: 0, sort: 5 }, 
        { id: 7, slug: "ceyhun-mehdiyev-fizika-7", lessonCode: "v42", studentId: 8, date: "2025-08-06T10:30", score: 3, delete: 0, sort: 6 }, 
        { id: 8, slug: "fərid-hacıyev-tarix-8", lessonCode: "r5g", studentId: 1, date: "2025-08-08T11:30", score: 5, delete: 0, sort: 7 }, 
        { id: 9, slug: "teymur-əliyev-ingilis-dili-9", lessonCode: "gb3", studentId: 7, date: "2025-08-07T08:30", score: 5, delete: 0, sort: 8 }]);

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
    updateExam(id: number, slug: string, updated: Omit<Exam, 'id' | 'slug' | 'delete' | 'sort'>) {
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