import { Chapter, UpdateChapterValue } from '@/types/types'
import { Link1Icon } from '@radix-ui/react-icons'
import { BoltIcon, CaptionsIcon, Clock10Icon } from 'lucide-react'

function ChapterDetailsInput({chapter, changeChapterValue, lessonindex, chapterindex}: {chapter: Chapter, changeChapterValue: UpdateChapterValue, lessonindex: number, chapterindex: number}) {
  return (
    <div className="grid gap-4 md:px-4 px-2">
        <div className="flex max-sm:flex-col gap-4 items-center w-full">
            <p className="whitespace-nowrap sm:w-[25%]">
                Chapter Title
            </p>
            <div className="relative w-full">
                <input
                value={chapter.title}
                onChange={(e) => changeChapterValue(lessonindex, chapterindex, "title", e.target.value)}
                type="text"
                className="outline-none peer focus:border-blue-500 text-sm border-2 rounded-xl h-[2.6rem] pl-10 focus:caret-indigo-500 w-full"
                />
                <CaptionsIcon className="top-0 translate-y-[11px] translate-x-2 absolute w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100" />
            </div>
        </div>
        <div className="flex max-sm:flex-col gap-4 items-center w-full">
            <p className="whitespace-nowrap sm:w-[25%]">
                Video URL
            </p>
            <div className="relative w-full">
                <input
                value={chapter.videoUrl}
                onChange={(e) => changeChapterValue(lessonindex, chapterindex, 'videoUrl', e.target.value)}
                type="text"
                className="outline-none peer focus:border-blue-500 text-sm border-2 rounded-xl h-[2.6rem] pl-10 focus:caret-indigo-500 w-full"
                />
                <Link1Icon className="top-0 translate-y-[11px] translate-x-2 absolute w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100" />
            </div>
        </div>
        <div className="flex max-sm:flex-col gap-4 items-center w-full">
            <p className="whitespace-nowrap sm:w-[25%]">
                Chapter Duration
            </p>
            <div className="relative w-full">
                <input
                value={chapter.duration}
                onChange={(e) => changeChapterValue(lessonindex, chapterindex, "duration", e.target.value)}
                type="number"
                className="outline-none peer appearance-none no-arrows focus:border-blue-500 text-sm border-2 rounded-xl h-[2.6rem] pl-10 focus:caret-indigo-500 w-full"
                />
                <Clock10Icon className="top-0 translate-y-[11px] translate-x-2 absolute w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100" />
                <span className="top-0 text-sm max-sm:text-xs right-0 translate-y-[11px] -translate-x-8 absolute w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100 text-gray-500 whitespace-nowrap" > Hours </span>
            </div>
        </div>
        <div className="flex max-sm:flex-col gap-4 items-center w-full">
            <p className="whitespace-nowrap sm:w-[25%]">
                Score
            </p>
            <div className="relative w-full">
                <input
                value={chapter.score}
                onChange={(e) => changeChapterValue(lessonindex, chapterindex, "score", e.target.value)}
                type="number"
                max={100}
                className="outline-none peer appearance-none no-arrows focus:border-blue-500 text-sm border-2 rounded-xl h-[2.6rem] pl-10 focus:caret-indigo-500 w-full"
                />
                <BoltIcon className="top-0 translate-y-[11px] translate-x-2 absolute w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100" />
                <span className="top-0 text-sm max-sm:text-xs right-0 translate-y-[11px] -translate-x-8 absolute w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100 text-gray-500 whitespace-nowrap" > / 100</span>
            </div>
        </div>
    </div>
  )
}

export default ChapterDetailsInput