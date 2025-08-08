import { inject, Injectable, signal } from "@angular/core";
import { Lesson } from "./lesson.model";
import { ExamService } from "../exams/exam.service";

@Injectable({ providedIn: 'root' })
export class LessonService {

    private lessonsSignal = signal<Lesson[]>([
        {
            id: 1,
            slug: 'riyaziyyat-10',
            code: 'a3c',
            name: 'Riyaziyyat',
            class: 10,
            teacherFirstName: 'Aqil',
            teacherLastName: 'Əliyev',
            delete: 0,
        },
        {
            id: 2,
            slug: 'fizika-11',
            code: 'v42',
            name: 'Fizika',
            class: 11,
            teacherFirstName: 'Leyla',
            teacherLastName: 'Hüseynova',
            delete: 0,
        },
        {
            id: 3,
            slug: 'kimya-9',
            code: 't5g',
            name: 'Kimya',
            class: 9,
            teacherFirstName: 'Kamran',
            teacherLastName: 'Quliyev',
            delete: 0,
        },
        {
            id: 4,
            slug: 'biologiya-10',
            code: 'dg2',
            name: 'Biologiya',
            class: 10,
            teacherFirstName: 'Sevda',
            teacherLastName: 'Məmmədova',
            delete: 0,
        },
        {
            id: 5,
            slug: 'tarix-9',
            code: 'r5g',
            name: 'Tarix',
            class: 9,
            teacherFirstName: 'Ramin',
            teacherLastName: 'Əhmədov',
            delete: 0,
        },
        {
            id: 6,
            slug: 'ingilis-dili-11',
            code: 'gb3',
            name: 'Ingilis dili',
            class: 11,
            teacherFirstName: 'Fəridə',
            teacherLastName: 'Nağıyeva',
            delete: 0,
        }
    ]);


    private examService = inject(ExamService);

    getRealLength(): number{
        return this.lessonsSignal().length;
    }
    getLessons(): Lesson[] {
        return this.lessonsSignal().filter(lesson => lesson.delete === 0);
    }
    getDeletedLessons(): Lesson[] {
        return this.lessonsSignal().filter(lesson => lesson.delete === 1);
    }

    deleteLesson(id: number) {
        const deletedLesson = this.getLessons().find(lesson => lesson.id === id);
        if (deletedLesson) {
            this.lessonsSignal.update(lessons =>
                lessons.map(lesson =>
                    lesson.id === id ? { ...lesson, delete: 1 } : lesson
                )
            );

            this.examService.deleteExamsByLessonCode(deletedLesson.code);
        }
    }
    restoreLesson(id: number) {
        const deletedLesson = this.getDeletedLessons().find(lesson => lesson.id === id);
        if (deletedLesson) {
            const isHave = this.getLessons().find(lesson => 
                lesson.name.toLocaleLowerCase().trim() === deletedLesson.name.toLocaleLowerCase().trim() &&
                lesson.teacherFirstName.toLocaleLowerCase().trim() === deletedLesson.teacherFirstName.toLocaleLowerCase().trim() &&
                lesson.teacherLastName.toLocaleLowerCase().trim() === deletedLesson.teacherLastName.toLocaleLowerCase().trim() &&
                lesson.class && deletedLesson.class
            );
            if(isHave){
                return false;
            }
            this.lessonsSignal.update(lessons =>
                lessons.map(lesson =>
                    lesson.id === id ? { ...lesson, delete: 0 } : lesson
                )
            );
            return true
        }
        return false;
    }

    addLesson(newLesson: Lesson) {
        this.lessonsSignal.update(lessons => [
            ...lessons,
            {
                ...newLesson,
            }
        ])
    }
    updateLesson(id: number, slug: string, updated: Omit<Lesson, 'id' | 'code' | 'slug' | 'delete'>) {
        this.lessonsSignal.update(lessons =>
            lessons.map(lesson =>
                lesson.id === id
                    ? { ...lesson, ...updated, slug: slug }
                    : lesson
            )
        );
    }
    updateDeleteValue(id: number) {
        const deletedLesson = this.getLessons().find(lesson => lesson.id === id);
        if (deletedLesson) {
            this.lessonsSignal.update(lessons =>
                lessons.map(lesson =>
                    lesson.id === id ? { ...lesson, delete: 1 } : lesson
                )
            );

            this.examService.deleteExamsByLessonCode(deletedLesson.code);
        }
    }

    generateUniqueCode(): string {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const existingCodes = this.getLessons().map(lesson => lesson.code);

        while (true) {
            const allChars = letters + numbers;
            let code = '';

            for (let i = 0; i < 3; i++) {
                const randIndex = Math.floor(Math.random() * allChars.length);
                code += allChars[randIndex];
            }

            const hasLetter = /[A-Z]/.test(code);
            const hasNumber = /[0-9]/.test(code);

            if (hasLetter && hasNumber && !existingCodes.includes(code)) {
                return code;
            }
        }
    }
}