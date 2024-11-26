import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import CircularProgress from '@/components/Progress/CircularProgress'
import { LightningBoltIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { BookIcon, BookOpenIcon, ChartNoAxesColumnIncreasingIcon, CheckCheckIcon, Clock10Icon, EarthIcon, FileText, LibraryIcon, PlayCircleIcon, PlayIcon, ShieldOff, Tally2Icon, UserIcon } from 'lucide-react'
import { Chapter, Lesson, Quiz } from '@prisma/client'

export type ExtendedLessonWithChaptersandQuiz = Lesson & { chapters: Chapter[], quiz: Quiz }

function MentorEditCourseAccordion({lessons, coursename}: {lessons: ExtendedLessonWithChaptersandQuiz[], coursename: string}) {
  return (
    <Accordion type="single" collapsible className="mt-3 flex flex-col gap-3">
        {
            lessons.map((lesson, index) => (
                <AccordionItem key={index} value={`Week${index}`}>
                    <AccordionTrigger className="font-medium lg:text-lg"><div className="flex gap-2 items-center"> Week {index + 1} - {lesson.title} </div></AccordionTrigger>
                    <AccordionContent className="pl-4 md:text-base flex flex-col gap-5">
                        
                        {
                            lesson.chapters.map((chapter, index) => ( 
                                <div key={index} className={`w-full flex justify-between items-center`}>
                                    <div className="flex gap-1 items-center">
                                        <FileText className={`-translate-y-px w-5 h-5 text-gray-500`} />
                                        <span> {chapter.title} </span>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <span className={`text-gray-400`}> 4min </span>
                                    </div>
                                </div>
                            ))
                        }

                        <div className="w-full flex justify-between items-center">
                            <div className="flex gap-1 items-center">
                                <QuestionMarkCircledIcon className="-translate-y-px w-5 h-5 text-gray-500" />
                                <span> {lesson.quiz.title} </span>
                            </div>
                            <span className="text-gray-400"> 30min </span>
                        </div>
                        <div className="flex justify-end gap-2 max-sm:justify-center w-full max-sm:flex-col-reverse">
                            <button className="max-sm:w-full w-fit h-fit py-2 px-4 bg-red-600 text-white hover:bg-red-500 active:bg-red-600 transition-all duration-150 rounded-lg"> Delete Lesson </button>
                            <a className="max-sm:w-full w-fit h-fit py-2 px-4 bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-600 transition-all duration-150 rounded-lg" href={`/mentor-profile/courses/editlesson?lessonid=${lesson.id}&coursename=${coursename}&lessonname=${lesson.title}`}> Edit Lesson </a>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))
        }
    </Accordion>
  )
}

export default MentorEditCourseAccordion