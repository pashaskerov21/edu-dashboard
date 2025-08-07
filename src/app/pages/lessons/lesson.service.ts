import { inject, Injectable, signal } from "@angular/core";
import { Lesson } from "./lesson.model";
import { ExamService } from "../exams/exam.service";

@Injectable({ providedIn: 'root' })
export class LessonService {

    private lessonsSignal = signal<Lesson[]>([
        {
            id: 1,
            slug: 'riyaziyyat-10',
            code: 'MAT',
            name: 'Riyaziyyat',
            class: 10,
            teacherFirstName: 'Aqil',
            teacherLastName: 'Əliyev',
            delete: 0,
        },
        {
            id: 2,
            slug: 'fizika-11',
            code: 'FIZ',
            name: 'Fizika',
            class: 11,
            teacherFirstName: 'Leyla',
            teacherLastName: 'Hüseynova',
            delete: 0,
        },
        {
            id: 3,
            slug: 'kimya-9',
            code: 'KMY',
            name: 'Kimya',
            class: 9,
            teacherFirstName: 'Kamran',
            teacherLastName: 'Quliyev',
            delete: 0,
        },
        {
            id: 4,
            slug: 'biologiya-8',
            code: 'BIO',
            name: 'Biologiya',
            class: 8,
            teacherFirstName: 'Sevda',
            teacherLastName: 'Məmmədova',
            delete: 0,
        },
        {
            id: 5,
            slug: 'tarix-7',
            code: 'TAR',
            name: 'Tarix',
            class: 7,
            teacherFirstName: 'Ramin',
            teacherLastName: 'Əhmədov',
            delete: 0,
        }
    ]);


    private examService = inject(ExamService);

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

    addLesson(newLesson: Lesson) {
        this.lessonsSignal.update(lessons => [
            ...lessons,
            {
                ...newLesson,
            }
        ])
    }
    updateLesson(id: number, slug: string, updated: Omit<Lesson, 'id' | 'slug' | 'delete'>) {
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
}