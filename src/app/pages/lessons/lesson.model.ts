export interface Lesson{
    id: number,
    slug: string,
    code: string,
    name: string,
    class: number,
    teacherFirstName: string;
    teacherLastName: string,
    delete: 0 | 1;
    sort: number,
}