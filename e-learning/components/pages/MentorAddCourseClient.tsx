"use client";
import MentorProfileSidebar from "@/components/sidebars/MentorProfileSidebar";
import { useDropzone } from "react-dropzone";
import image from "@/components/Images/Courses/UI.png";
import { BoltIcon, CaptionsIcon, CheckIcon, CircleDollarSignIcon, CompassIcon, LanguagesIcon, PencilLineIcon, PenSquareIcon, PlusCircle, Trash2Icon, UserPenIcon } from "lucide-react";
import DragAndDrop from "@/components/Inputs/DragAndDrop";
import CourseThumbnailDragAndDrop from "@/components/Inputs/CourseThumbnailDragAndDrop";
import MentorEditCourseAccordion from "@/components/Accordions/MentorEditCourseAccordion";
import { Link1Icon } from "@radix-ui/react-icons";
import ChapterDetailsInput from "@/components/Inputs/ChapterDetailsInput";
import { useState } from "react";
import { Chapter, Course, Lesson, Question, UpdateChapterValue, UpdateQuizQuestionValue } from "@/types/types";
import { toast } from "sonner";
import QuizQuestionDetailsInput from "@/components/Inputs/QuizQuestionDetailsInput";
import { verify } from "jsonwebtoken";
import { addLessons } from "@/app/actions/CourseActions/UpdateCourse";

const validateData = (lessons: Lesson[]): boolean => {

  if(lessons.length === 0){
    toast("Can't process request", {
      description: "Please create one lesson or more.",
      action: {
          label: "Retry",
          onClick: () => {},
      },
    })
    return false
  }
  const lastLesson = lessons[lessons.length - 1];

  if (!lastLesson.title) {
    toast("Can't process request", {
      description: "Please fill in the title for the last lesson before adding a new lesson.",
      action: {
          label: "Retry",
          onClick: () => {},
      },
    })
    return false
  }

  const lastChapter = lastLesson.chapters[lastLesson.chapters.length - 1];
  if (lastChapter && (!lastChapter.title || !lastChapter.videoUrl || lastChapter.duration <= 0 || lastChapter.score <= 0)) {
    toast("Can't process request", {
      description: "Please fill in all values for the last chapter before adding a new lesson.",
      action: {
          label: "Retry",
          onClick: () => {},
      },
    })
    return false
  }

  if(!lastLesson.quiz.title){
    toast("Can't process request", {
      description: "Please fill in the title for the last quiz before adding a new lesson.",
      action: {
          label: "Retry",
          onClick: () => {},
      },
    })
    return false
  }

  if(lastLesson.quiz.questions.length === 0){
    toast("Can't process request", {
      description: "Please create one question or more for the last quiz.",
      action: {
          label: "Retry",
          onClick: () => {},
      },
    })
    return false
  }
  const lastQuestion = lastLesson.quiz.questions[lastLesson.quiz.questions.length - 1];
  if(lastQuestion && (!lastQuestion.content || !lastQuestion.answer || lastQuestion.max_score <= 0)){
    toast("Can't process request", {
      description: "Please fill in all values for the last question before adding a new one.",
      action: {
          label: "Retry",
          onClick: () => {},
      },
    })
    return false
  }

  return true;
}

function MentorAddCourseClient({coursename, courseid}: {coursename: string, courseid: string}) {

    const [lessons, setLessons] = useState<Lesson[]>([]);

    const addLesson = () => {
        setLessons((prevLessons) => {
        if (prevLessons.length > 0) {
            const lastLesson = prevLessons[prevLessons.length - 1];
    
            if (!lastLesson.title) {
            toast("Can't add a new lesson", {
                description: "Please fill in the title for the last lesson before adding a new lesson.",
                action: {
                    label: "Retry",
                    onClick: () => {},
                },
            })
            return prevLessons
            }
    
            const lastChapter = lastLesson.chapters[lastLesson.chapters.length - 1];
            if (lastChapter && (!lastChapter.title || !lastChapter.videoUrl || lastChapter.duration <= 0 || lastChapter.score <= 0)) {
            toast("Can't add a new lesson", {
                description: "Please fill in all values for the last chapter before adding a new lesson.",
                action: {
                    label: "Retry",
                    onClick: () => {},
                },
            })
            return prevLessons
            }
        }
    
        return [
            ...prevLessons,
            { title: '', chapters: [], quiz: { title: '', questions: [] } }
        ];
        });
    };
    

    const addChapter = (lessonIndex: number) => {
        setLessons((prevLessons) => {
        const lesson = prevLessons[lessonIndex];
        
        const lastChapter = lesson.chapters[lesson.chapters.length - 1];
        if (lastChapter && (!lastChapter.title || !lastChapter.videoUrl || lastChapter.duration <= 0 || lastChapter.score <= 0)) {
            toast("Can't add a new chapter", {
            description: "Please fill in all values for the previous chapter before adding a new one.",
            action: {
                label: "Retry",
                onClick: () => {},
            },
            })
            return prevLessons;
        }
    
        return prevLessons.map((lesson, index) =>
            index === lessonIndex
            ? {
                ...lesson,
                chapters: [
                    ...lesson.chapters,
                    {
                    title: '',
                    videoUrl: '',
                    duration: 0,
                    score: 0
                    }
                ]
                }
            : lesson
        );
        });
    };

    const addQuizQuestion = (lessonIndex: number) => {
        setLessons((prevLessons) => {
        const lesson = prevLessons[lessonIndex];
        
        const lastChapter = lesson.chapters[lesson.chapters.length - 1];
        if (lastChapter && (!lastChapter.title || !lastChapter.videoUrl || lastChapter.duration <= 0 || lastChapter.score <= 0)) {
            toast("Can't add a new Quiz", {
            description: "Please fill in all values for the previous chapter before adding a new quiz question.",
            action: {
                label: "Retry",
                onClick: () => {},
            },
            })
            return prevLessons;
        }

        const lastQuestion = lesson.quiz.questions[lesson.quiz.questions.length - 1];
        if (lastQuestion && (!lastQuestion.content || !lastQuestion.answer || lastQuestion.max_score <= 0)) {
            toast("Can't add a new question", {
            description: "Please fill in all values for the previous question before adding a new one.",
            action: {
                label: "Retry",
                onClick: () => {},
            },
            })
            return prevLessons;
        }
    
        return prevLessons.map((lesson, index) =>
            index === lessonIndex
            ? {
                ...lesson,
                quiz: {
                    ...lesson.quiz,
                    questions: [
                    ...lesson.quiz.questions,
                    {
                        content: '',
                        answer: '',
                        max_score: 0
                    }
                    ]
                }
                }
            : lesson
        );
        })
    }

    const handleQuizTitleChange = (e: React.ChangeEvent<HTMLInputElement>, lessonIndex: number) => {
        const { value } = e.target;
        setLessons((prevLessons) =>
        prevLessons.map((lesson, index) =>
            index === lessonIndex
            ? { ...lesson, quiz: { ...lesson.quiz, title: value } }
            : lesson
        )
        );
    }

    const updateQuizQuestionValue: UpdateQuizQuestionValue = (
        lessonIndex: number,
        questionIndex: number,
        field: keyof Question,
        value: string | number
    ) => {
        setLessons((prevLessons) =>
        prevLessons.map((lesson, lIndex) =>
            lIndex === lessonIndex
            ? {
                ...lesson,
                quiz: {
                    ...lesson.quiz,
                    questions: lesson.quiz.questions.map((question, qIndex) =>
                    qIndex === questionIndex
                        ? { ...question, [field]: value }
                        : question
                    )
                }
                }
            : lesson
        )
        );
    };
    

    const handleLessonTitleChange = (e: React.ChangeEvent<HTMLInputElement>, lessonIndex: number) => {
        const { value } = e.target;
        setLessons((prevLessons) =>
        prevLessons.map((lesson, index) =>
            index === lessonIndex ? { ...lesson, title: value } : lesson
        )
        );
    };

    const updateChapterValue: UpdateChapterValue = (
        lessonIndex: number,
        chapterIndex: number,
        field: keyof Chapter,
        value: string | number
    ) => {
        setLessons((prevLessons) =>
        prevLessons.map((lesson, lIndex) =>
            lIndex === lessonIndex
            ? {
                ...lesson,
                chapters: lesson.chapters.map((chapter, cIndex) =>
                    cIndex === chapterIndex
                    ? { ...chapter, [field]: value }
                    : chapter
                )
                }
            : lesson
        )
        );
    };

    return (
        <>
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900 max-md:text-lg md:pl-8">
          My Courses &gt; {" "}
          <span>
            {coursename}
          </span>
          {" "} &gt; {" "}
          <span className="text-violet-600">
            Add Lesson
          </span>
        </h1>
        <form 
          action={
            async(formdata: FormData) => {
              try{
                const verification = validateData(lessons);
                if(!verification) return;
                formdata.append("lessons", JSON.stringify(lessons));
                formdata.append("courseid", courseid);
                const response = await addLessons(formdata)
                if(response.success === true){
                  toast("Success", {
                    description: "Lessons added successfully.",
                    action: {
                        label: "OK",
                        onClick: () => {},
                    },
                  })
                  window.location.reload()
                }
                if(!response.success){
                  toast("error", {
                      description: response.error || "An error occured.",
                      action: {
                          label: "Ok",
                          onClick: () => {},
                      },
                  });
              }
              }catch(err: any){
                const errorMessage = err?.message
                    ? err?.message
                    : "an internal error has occured.";

                toast(err?.message ? "Verify your information" : "Sorry", {
                    description: errorMessage,
                    action: {
                        label: "Retry",
                        onClick: () => {},
                    },
                });
              }
            }
          }
          className="grid lg:grid-cols-6 gap-4 w-full max-w-[1500px] mx-auto justify-items-center max-sm:flex max-sm:flex-col max-sm:items-center"
        >
          <div className="py-8 rounded-3xl bg-white mt-4 lg:col-span-4 col-span-3 min-w-full">
            <div className="grid gap-4 mx-4 max-sm:mx-2 px-8 max-sm:px-2 border rounded-xl mt-4 py-8">
              <div className="">
              <div className="flex justify-between w-full items-center">
                <p className="text-slate-800 font-semibold text-lg">Lessons</p>
                <button
                  className="w-fit h-fit py-2 px-4 flex border rounded-lg gap-2 hover:bg-gray-200/30 transition-all duration-150"
                  onClick={(e) => {e.preventDefault();addLesson()}}
                >
                  <PlusCircle className="w-[1.2rem] h-[1.2rem] translate-y-[2px]" />
                  Add Lesson
                </button>
              </div>

              {lessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className="my-2">
                  <div className="flex max-sm:flex-col gap-4 items-center w-full md:px-4 px-2">
                    <p className="whitespace-nowrap sm:w-[25%]">Lesson Title</p>
                    <div className="relative w-full">
                      <input
                        type="text"
                        value={lesson.title}
                        onChange={(e) => {e.preventDefault(); handleLessonTitleChange(e, lessonIndex)}}
                        className="outline-none peer focus:border-blue-500 text-sm border-2 rounded-xl h-[2.6rem] pl-10 focus:caret-indigo-500 w-full"
                      />
                      <CaptionsIcon className="top-0 translate-y-[11px] translate-x-2 absolute w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100" />
                    </div>
                  </div>
                  <div className="flex justify-between w-full items-center mt-4">
                    <p className="text-slate-800 font-semibold text-lg">Chapters</p>
                    <button
                      className="w-fit h-fit py-2 px-4 flex border rounded-lg gap-2 hover:bg-gray-200/30 transition-all duration-150"
                      onClick={(e) => {e.preventDefault(); addChapter(lessonIndex)}}
                    >
                      <PlusCircle className="w-[1.2rem] h-[1.2rem] translate-y-[2px]" />
                      Add Chapter
                    </button>
                  </div>
                  <div className="flex flex-col w-full mt-2">
                    {lesson.chapters.map((chapter, chapterIndex) => (
                      <div key={chapterIndex}>
                        {chapterIndex > 0 && <hr className="mx-8 my-3" />}
                        <ChapterDetailsInput chapter={chapter} lessonindex={lessonIndex} chapterindex={chapterIndex} changeChapterValue={updateChapterValue} />
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-800 font-semibold text-lg mt-4">Quiz</p>
                  <div className="flex max-sm:flex-col gap-4 items-center w-full md:px-4 px-2">
                    <p className="whitespace-nowrap sm:w-[25%]">Quiz Title</p>
                    <div className="relative w-full">
                      <input
                        type="text"
                        value={lesson.quiz.title}
                        onChange={(e) => {e.preventDefault(); handleQuizTitleChange(e, lessonIndex)}}
                        className="outline-none peer focus:border-blue-500 text-sm border-2 rounded-xl h-[2.6rem] pl-10 focus:caret-indigo-500 w-full"
                      />
                      <CaptionsIcon className="top-0 translate-y-[11px] translate-x-2 absolute w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100" />
                    </div>
                  </div>
                  <div className="flex justify-between w-full items-center mt-4">
                    <p className="text-slate-800 font-semibold text-lg">Quiz Questions</p>
                    <button
                      className="w-fit h-fit py-2 px-4 flex border rounded-lg gap-2 hover:bg-gray-200/30 transition-all duration-150"
                      onClick={(e) => {e.preventDefault(); addQuizQuestion(lessonIndex)}}
                    >
                      <PlusCircle className="w-[1.2rem] h-[1.2rem] translate-y-[2px]" />
                      Add Question
                    </button>
                  </div>
                  <div className="flex flex-col w-full mt-2">
                    {lesson.quiz.questions.map((question, questionIndex) => (
                      <div key={questionIndex}>
                        {questionIndex > 0 && <hr className="mx-8 my-3" />}
                        <QuizQuestionDetailsInput question={question} lessonindex={lessonIndex} questionIndex={questionIndex} changeQuestionValue={updateQuizQuestionValue} />
                      </div>
                    ))}
                  </div>
                  {lessonIndex < lessons.length - 1 && <hr className="mt-8 border-indigo-600" />}
                </div>
              ))}
            </div>
                
                <div className="w-full flex max-sm:justify-between justify-end gap-3 px-8 items-center">
                    <button className="text-blue-600 hover:text-blue-500 active:text-blue-600 transition-all duration-150 flex gap-1"> Save <CheckIcon className="w-5 h-5 translate-y-px" />  </button>
                </div>
            </div>
            
          </div>
        </form>
        </>
    )
}

export default MentorAddCourseClient