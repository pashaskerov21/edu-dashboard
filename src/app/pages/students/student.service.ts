import { Injectable, signal } from "@angular/core";
import { Student } from "./student.model";

@Injectable({ providedIn: 'root' })
export class StudentService {
    private studentsSignal = signal<Student[]>([
        {
            id: 1,
            slug: 'ferid-haciyev-1',
            firstname: "Fərid",
            lastname: "Hacıyev",
            class: 9,
        },
        {
            id: 2,
            slug: 'leyla-rzayeva-2',
            firstname: "Leyla",
            lastname: "Rzayeva",
            class: 9,
        },
        {
            id: 3,
            slug: 'elvin-qasimov-3',
            firstname: "Elvin",
            lastname: "Qasımov",
            class: 10,
        },
        {
            id: 4,
            slug: 'aysel-eliyeva-4',
            firstname: "Aysel",
            lastname: "Əliyeva",
            class: 10,
        },
        {
            id: 5,
            slug: 'nihat-memmedov-5',
            firstname: "Nihat",
            lastname: "Məmmədov",
            class: 11,
        },
        {
            id: 6,
            slug: 'mehdi-orucov-6',
            firstname: "Mehdi",
            lastname: "Orucov",
            class: 11,
        },
        {
            id: 7,
            slug: 'teymur-eliyev-7',
            firstname: "Teymur",
            lastname: "Əliyev",
            class: 11,
        },
    ]);

    students = this.studentsSignal.asReadonly();
    getStudents(): Student[]{
        return this.studentsSignal();
    }

    deleteStudent(id: number){
        this.studentsSignal.update(students => students.filter(student => student.id !== id));
    }

    addStudent(newStudent: Student){
        this.studentsSignal.update(students => [
            ...students,
            {
                ...newStudent,
            }
        ])
    }
    updateStudent(id: number,slug: string, updated: Omit<Student, 'id' | 'slug'>){
        this.studentsSignal.update(students => 
            students.map(student => 
                student.id === id ? {...student, ...updated, slug: slug} : student
            )
        )
    }
}