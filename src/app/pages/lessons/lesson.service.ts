import { Injectable, signal } from "@angular/core";
import { Lesson } from "./lesson.model";

@Injectable({ providedIn: 'root' })
export class LessonService {
    private lessonsSignal = signal<Lesson[]>([
        {
            id: 1,
            slug: 'mathematics-10',
            code: 'MAT',
            name: 'Riyaziyyat',
            class: 10,
            teacherFirstName: 'Aqil',
            teacherLastName: 'Əliyev'
        },
        {
            id: 2,
            slug: 'physics-11',
            code: 'FIZ',
            name: 'Fizika',
            class: 11,
            teacherFirstName: 'Leyla',
            teacherLastName: 'Hüseynova'
        },
        {
            id: 3,
            slug: 'chemistry-9',
            code: 'KMY',
            name: 'Kimya',
            class: 9,
            teacherFirstName: 'Kamran',
            teacherLastName: 'Quliyev'
        },
        {
            id: 4,
            slug: 'biology-8',
            code: 'BIO',
            name: 'Biologiya',
            class: 8,
            teacherFirstName: 'Sevda',
            teacherLastName: 'Məmmədova'
        },
        {
            id: 5,
            slug: 'history-7',
            code: 'TAR',
            name: 'Tarix',
            class: 7,
            teacherFirstName: 'Ramin',
            teacherLastName: 'Əhmədov'
        }
    ]);


    lessons = this.lessonsSignal.asReadonly();

    deleteLesson(id: number) {
        this.lessonsSignal.update(lessons => lessons.filter(lesson => lesson.id !== id));
    }
}