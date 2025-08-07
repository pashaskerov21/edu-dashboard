export interface Exam {
    id: number,
    slug: string,
    lessonCode: string,
    studentId: number,
    date: string,
    score: number,
    delete: 0 | 1;
}