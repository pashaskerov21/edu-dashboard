import { inject, Injectable, signal } from "@angular/core";
import { Student } from "./student.model";
import { ExamService } from "../exams/exam.service";

@Injectable({ providedIn: 'root' })
export class StudentService {
    private studentsSignal = signal<Student[]>([
        {
            id: 1,
            slug: 'ferid-haciyev-1',
            firstname: "Fərid",
            lastname: "Hacıyev",
            class: 9,
            delete: 0,
        },
        {
            id: 2,
            slug: 'leyla-rzayeva-2',
            firstname: "Leyla",
            lastname: "Rzayeva",
            class: 9,
            delete: 0,
        },
        {
            id: 3,
            slug: 'elvin-qasimov-3',
            firstname: "Elvin",
            lastname: "Qasımov",
            class: 10,
            delete: 0,
        },
        {
            id: 4,
            slug: 'aysel-eliyeva-4',
            firstname: "Aysel",
            lastname: "Əliyeva",
            class: 10,
            delete: 0,
        },
        {
            id: 5,
            slug: 'nihat-memmedov-5',
            firstname: "Nihat",
            lastname: "Məmmədov",
            class: 11,
            delete: 0,
        },
        {
            id: 6,
            slug: 'mehdi-orucov-6',
            firstname: "Mehdi",
            lastname: "Orucov",
            class: 11,
            delete: 0,
        },
        {
            id: 7,
            slug: 'teymur-eliyev-7',
            firstname: "Teymur",
            lastname: "Əliyev",
            class: 11,
            delete: 0,
        },
    ]);

    private examService = inject(ExamService);

    getStudents(): Student[] {
        return this.studentsSignal().filter(student => student.delete === 0);
    }
    getDeletedStudents(): Student[] {
        return this.studentsSignal().filter(student => student.delete === 1);
    }

    deleteStudent(id: number) {
        const deletedStudent = this.getStudents().find(student => student.id === id);
        if (deletedStudent) {
            this.studentsSignal.update(students =>
                students.map(student =>
                    student.id === id ? { ...student, delete: 1 } : student
                )
            );

            this.examService.deleteExamsByStudentId(deletedStudent.id);
        }
    }

    addStudent(newStudent: Student) {
        this.studentsSignal.update(students => [
            ...students,
            {
                ...newStudent,
            }
        ])
    }
    updateStudent(id: number, slug: string, updated: Omit<Student, 'id' | 'slug' | 'delete'>) {
        this.studentsSignal.update(students =>
            students.map(student =>
                student.id === id ? { ...student, ...updated, slug: slug } : student
            )
        )
    }

    updateDeleteValue(id: number) {
        const deletedStudent = this.getStudents().find(student => student.id === id);
        if (deletedStudent) {
            this.studentsSignal.update(students =>
                students.map(student =>
                    student.id === id ? { ...student, delete: 1 } : student
                )
            );

            this.examService.deleteExamsByStudentId(deletedStudent.id);
        }
    }
}