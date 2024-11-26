
export interface Chapter {
    title: string;
    videoUrl: string;
    duration: number;
    score: number;
}
  
export interface Lesson {
    title: string;
    chapters: Chapter[];
    quiz: Quiz
}

export type UpdateChapterValue = (
    lessonIndex: number,
    chapterIndex: number,
    field: keyof Chapter,
    value: string | number
) => void;

export type Course = {
    title: string;
    price: number;
    language: string;
    difficulty: string;
    image: string | ArrayBuffer | null
    description: string;
    category: string;
};

export type Quiz = {
    title: string;
    questions: Question[];
}

export type Question = {
    content: string;
    answer: string
    max_score: number;
}

export type UpdateCourseDetail = (field: keyof Course, value: string | number | ArrayBuffer | null) => void;
export type UpdateQuizQuestionValue = (lessonIndex: number, questionIndex: number, field: keyof Question, value: string | number) => void;
