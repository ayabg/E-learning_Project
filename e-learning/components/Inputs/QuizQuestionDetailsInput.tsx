import { Question, UpdateQuizQuestionValue } from '@/types/types'
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { HashIcon, MessageSquareQuoteIcon } from 'lucide-react'

function QuizQuestionDetailsInput({question, changeQuestionValue, lessonindex, questionIndex}: {question: Question, changeQuestionValue: UpdateQuizQuestionValue, lessonindex: number, questionIndex: number}) {
    return (
        <div className="grid gap-4 md:px-4 px-2">
            <div className="flex max-sm:flex-col gap-4 items-center w-full">
                <p className="whitespace-nowrap sm:w-[25%]">
                    Question Content
                </p>
                <div className="relative w-full">
                    <input
                    value={question.content}
                    onChange={(e) => changeQuestionValue(lessonindex, questionIndex, "content", e.target.value)}
                    type="text"
                    className="outline-none peer focus:border-blue-500 text-sm border-2 rounded-xl h-[2.6rem] pl-10 focus:caret-indigo-500 w-full"
                    />
                    <QuestionMarkCircledIcon className="top-0 translate-y-[11px] translate-x-2 absolute w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100" />
                </div>
            </div>
            <div className="flex max-sm:flex-col gap-4 items-center w-full">
                <p className="whitespace-nowrap sm:w-[25%]">
                    Answer
                </p>
                <div className="relative w-full">
                    <input
                    value={question.answer}
                    onChange={(e) => changeQuestionValue(lessonindex, questionIndex, "answer", e.target.value)}
                    type="text"
                    className="outline-none peer focus:border-blue-500 text-sm border-2 rounded-xl h-[2.6rem] pl-10 focus:caret-indigo-500 w-full"
                    />
                    <MessageSquareQuoteIcon className="top-0 translate-y-[11px] translate-x-2 absolute w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100" />
                </div>
            </div>
            <div className="flex max-sm:flex-col gap-4 items-center w-full">
                <p className="whitespace-nowrap sm:w-[25%]">
                    Max Score
                </p>
                <div className="relative w-full">
                    <input
                    value={question.max_score}
                    onChange={(e) => changeQuestionValue(lessonindex, questionIndex, "max_score", e.target.value)}
                    type="number"
                    className="outline-none peer appearance-none no-arrows focus:border-blue-500 text-sm border-2 rounded-xl h-[2.6rem] pl-10 focus:caret-indigo-500 w-full"
                    />
                    <HashIcon className="top-0 translate-y-[11px] translate-x-2 absolute w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100" />
                </div>
            </div>
        </div>
    )
}

export default QuizQuestionDetailsInput