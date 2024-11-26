"use client";
import { BoltIcon, CaptionsIcon, CircleDollarSignIcon, Clock10Icon, CompassIcon, HashIcon, LanguagesIcon, MessageSquareQuoteIcon, PencilLineIcon, PenSquareIcon, PlusCircle, Trash2Icon, UserPenIcon } from "lucide-react";
import { useState } from "react";
import { Link1Icon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { DeleteChapter, UpdateLesson } from "@/app/actions/LessonActions/UpdateLesson";

function EditLessonPage({lesson}: {lesson: any}) {

  const [lessonDetails, setLessonDetails] = useState({
    title: {
      value: lesson.title,
      open: false
    },
    chapters: lesson.chapters.map((chapter: any) =>(
      {
        chapter: chapter,
        open: false
      }
    )),
    quiz: {
      title: {
        value: lesson.quiz.title,
        open: false
      },
      questions: lesson.quiz.questions.map((question: any) => (
        {
          question: question,
          open: false
        }
      ))
    }
  })
  const handleLessondetailschange = (
    key: string,
    field: string,
    value: string | number,
    chapterIndex?: number,
    questionIndex?: number
  ) => {
    setLessonDetails((prevDetails) => {
      if (key === "title") {
        return {
          ...prevDetails,
          title: {
            ...prevDetails.title,
            value: value as string,
          },
        };
      }
      if (key === "quizTitle") {
        return {
          ...prevDetails,
          quiz: {
            ...prevDetails.quiz,
            title: {
              ...prevDetails.quiz.title,
              value: value as string,
            },
          },
        };
      }
      if (key === "chapter" && typeof chapterIndex === "number") {
        const updatedChapters = [...prevDetails.chapters];
        updatedChapters[chapterIndex] = {
          ...updatedChapters[chapterIndex],
          chapter: {
            ...updatedChapters[chapterIndex].chapter,
            [field]: value,
          },
        };
        return {
          ...prevDetails,
          chapters: updatedChapters,
        };
      }
      if (key === "question" && typeof questionIndex === "number") {
        const updatedQuestions = [...prevDetails.quiz.questions];
        updatedQuestions[questionIndex] = {
          ...updatedQuestions[questionIndex],
          question: {
            ...updatedQuestions[questionIndex].question,
            [field]: value, 
          },
        };
        return {
          ...prevDetails,
          quiz: {
            ...prevDetails.quiz,
            questions: updatedQuestions,
          },
        };
      }
      return prevDetails;
    });
  };

  const toggleOpenStatus = (
    key: string,
    chapterIndex?: number,
    questionIndex?: number
  ) => {
    setLessonDetails((prevDetails) => {
      if (key === "title") {
        return {
          ...prevDetails,
          title: {
            ...prevDetails.title,
            open: !prevDetails.title.open,
          },
        };
      }
      if (key === "quizTitle") {
        return {
          ...prevDetails,
          quiz: {
            ...prevDetails.quiz,
            title: {
              ...prevDetails.quiz.title,
              open: !prevDetails.quiz.title.open,
            },
          },
        };
      }
      if (key === "chapter" && typeof chapterIndex === "number") {
        const updatedChapters = [...prevDetails.chapters];
        updatedChapters[chapterIndex] = {
          ...updatedChapters[chapterIndex],
          open: !updatedChapters[chapterIndex].open,
        };
        return {
          ...prevDetails,
          chapters: updatedChapters,
        };
      }
      if (key === "question" && typeof questionIndex === "number") {
        const updatedQuestions = [...prevDetails.quiz.questions];
        updatedQuestions[questionIndex] = {
          ...updatedQuestions[questionIndex],
          open: !updatedQuestions[questionIndex].open,
        };
        return {
          ...prevDetails,
          quiz: {
            ...prevDetails.quiz,
            questions: updatedQuestions,
          },
        };
      }
      return prevDetails;
    });
  };
  
  const isOpen = (
    key: string,
    chapterIndex?: number,
    questionIndex?: number
  ): boolean => {
    if (key === "title") {
      return lessonDetails.title.open;
    }
    if (key === "quizTitle") {
      return lessonDetails.quiz.title.open;
    }
    if (key === "chapter" && typeof chapterIndex === "number") {
      return lessonDetails.chapters[chapterIndex]?.open || false;
    }
    if (key === "question" && typeof questionIndex === "number") {
      return lessonDetails.quiz.questions[questionIndex]?.open || false;
    }
    return false;
  };
  
  
  const deleteChapter = async (chapterid: string) => { 
    try{
      const response = await DeleteChapter(chapterid, lesson.id)
      if(response.success){
        toast("Success", {
          description: "Chapter deleted successfully",
          action: {
              label: "Close",
              onClick: () => {},
          },
        });
        window.location.reload()
      }
      if(!response.success){
        toast("Sorry", {
          description: response.error || "an error has occured.",
          action: {
              label: "Retry",
              onClick: () => {},
          },
        });
      }
    }catch(err: any){
      toast("Sorry", {
        description: err?.message || "an error has occured.",
        action: {
            label: "Retry",
            onClick: () => {},
        },
      });
    }

  }

  return (
    <form 
      action={
        async (formdata: FormData) => {
          try{
            formdata.append("lessonid", lesson.id)
            formdata.append("lessontitle", lessonDetails.title.value)
            lessonDetails.chapters.forEach(({chapter}: any, index: number) => {
              formdata.append("chapters", JSON.stringify(chapter))
            })
            formdata.append("quizTitle", lessonDetails.quiz.title.value)
            lessonDetails.quiz.questions.forEach(({question}: any, index: number) => {
              formdata.append("questions", JSON.stringify(question))
            })
            const response = await UpdateLesson(formdata)
            if(response.success){
              toast("Success", {
                description: "Lesson updated successfully",
                action: {
                    label: "Close",
                    onClick: () => {},
                },
              });
              window.location.reload()
            }
            if(!response.success){
              toast("Sorry", {
                description: response.error || "an error has occured.",
                action: {
                    label: "Retry",
                    onClick: () => {},
                },
              });
            }
          }catch(err: any){
            toast("Sorry", {
              description: err?.message || "an error has occured.",
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
            <div className={`grid gap-4 mx-4 max-sm:mx-2 px-8 max-sm:px-2 border rounded-xl mt-4 py-8 ${!isOpen("title") ? "bg-white" : "bg-[#C0C0C0]/15"}`}>
              <div className="">
                <div className="flex justify-between w-full items-center">
                  <p className="text-slate-800 font-semibold text-lg">
                    Lesson Title
                  </p>
                  {
                    isOpen("title") ? (
                      <button onClick={(e) =>{e.preventDefault(); toggleOpenStatus("title"); handleLessondetailschange("title", "value", lesson.title)}} className="w-fit h-fit py-2 px-4 text-gray-500 hover:text-gray-600 transition-all duration-150">
                        Cancel
                      </button>
                    )
                    :
                    <p onClick={(e) =>{e.preventDefault(); toggleOpenStatus("title")}} className="w-fit h-fit cursor-pointer py-2 px-4 flex border rounded-lg gap-2 hover:bg-gray-200/30 transition-all duration-150">
                        <PencilLineIcon className="w-[1.1rem] h-[1.1rem] translate-y-[2px]" />
                        Edit
                    </p>
                  }
                </div>
              </div>
              {
                isOpen("title") ? (
                  <div className="flex max-sm:flex-col gap-2 items-center w-full">
                      <div className="relative w-full">
                        <input
                          type="text"
                          value={lessonDetails.title.value}
                          onChange={(e) => handleLessondetailschange("title", "value", e.target.value)}
                          className="outline-none focus:border-blue-500 text-sm border-2 rounded-xl h-[2.6rem] pl-10 focus:caret-indigo-500 w-full"
                        />
                        <CaptionsIcon className="top-0 translate-y-[11px] translate-x-2 absolute w-[1.2rem] h-[1.2rem]" />
                      </div>
                    <button onClick={(e) =>{e.preventDefault(); toggleOpenStatus("title")}} className="max-sm:w-full whitespace-nowrap px-4 py-2 w-fit h-fit text-white bg-blue-600 rounded-lg hover:bg-blue-700/90 active:bg-blue-700 transition-all duration-150">
                      Confirm
                    </button>
                  </div>
                )
                :
                  <p className="pl-8 font-medium text-gray-500 max-w-[48rem] break-words">
                      {lessonDetails.title.value}
                  </p>
              }
            </div>
            <div className="gap-4 grid mx-4 px-8 max-sm:px-2 border rounded-xl mt-8 py-8">
              <div className="flex justify-between w-full items-center">
                <p className="text-slate-800 font-semibold text-lg">
                  Chapters
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {
                  lessonDetails.chapters.map(({chapter}: any, index: number) => (
                    <>
                      { index !== 0 && <hr className="w-full border-gray-200" /> }
                      {
                        isOpen("chapter", index) ? (
                          <div className="grid gap-4 md:px-4 px-2">
                            <div className="flex max-sm:flex-col gap-4 items-center w-full">
                                <p className="whitespace-nowrap sm:w-[25%]">
                                    Chapter Title
                                </p>
                                <div className="relative w-full">
                                    <input
                                    value={chapter.title}
                                    onChange={(e) => handleLessondetailschange("chapter", "title", e.target.value, index)}
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
                                    onChange={(e) => handleLessondetailschange("chapter", "videoUrl", e.target.value, index)}
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
                                    onChange={(e) => handleLessondetailschange("chapter", "duration", e.target.value, index)}
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
                                    onChange={(e) => handleLessondetailschange("chapter", "score", e.target.value, index)}
                                    type="number"
                                    max={100}
                                    className="outline-none peer appearance-none no-arrows focus:border-blue-500 text-sm border-2 rounded-xl h-[2.6rem] pl-10 focus:caret-indigo-500 w-full"
                                    />
                                    <BoltIcon className="top-0 translate-y-[11px] translate-x-2 absolute w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100" />
                                    <span className="top-0 text-sm max-sm:text-xs right-0 translate-y-[11px] -translate-x-8 absolute w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100 text-gray-500 whitespace-nowrap" > / 100</span>
                                </div>
                            </div>
                            <button onClick={(e) =>{e.preventDefault(); toggleOpenStatus("chapter", index)}} className="max-sm:w-full whitespace-nowrap px-4 py-2 w-full h-fit text-white bg-blue-600 rounded-lg hover:bg-blue-700/90 active:bg-blue-700 transition-all duration-150">
                              Confirm
                            </button>
                        </div>
                        )
                        :
                        <div className="grid gap-4">
                          <div className="w-full flex justify-between px-8">
                            <div className="flex gap-1 items-center text-base"> <div className="w-2 h-2 bg-black rounded-full -translate-y-px" /> {chapter.title} <span className="text-sm text-gray-500"> ({chapter.duration} hours) </span> </div>
                            <p className="text-sm text-gray-500"> {chapter.score} </p>
                          </div>
                          <div className="w-full px-8">
                            <iframe
                                className="w-full aspect-video self-stretch md:max-h-[22rem] rounded-xl"
                                src={chapter.videoUrl}
                                frameBorder="0"
                                title="Product Overview Video"
                                aria-hidden="true"
                            />
                          </div>
                          <div className="w-full flex max-sm:justify-between justify-end gap-3 mt-4 px-8 items-center">
                            <button onClick={(e) => {e.preventDefault(); deleteChapter(chapter.id)}} className="text-red-600 hover:text-red-500 active:text-red-600 transition-all duration-150 flex gap-1"> Delete <Trash2Icon className="w-5 h-5" /> </button>
                            <button onClick={(e) =>{e.preventDefault(); toggleOpenStatus("chapter", index)}} className="text-blue-600 hover:text-blue-500 active:text-blue-600 transition-all duration-150 flex gap-1"> Update <PenSquareIcon className="w-5 h-5 translate-y-px" />  </button>
                          </div>
                      </div>
                      }
                    </>
                   ))
                }
              </div>
            </div>


            <div className="gap-4 grid mx-4 px-8 max-sm:px-2 border rounded-xl mt-8 py-8">
              <div className="flex justify-between w-full items-center">
                <p className="text-slate-800 font-semibold text-lg">
                  Quiz
                </p>
              </div>
              <div className="flex max-sm:flex-col gap-4 items-center w-full sm:pl-4">
                <p className="whitespace-nowrap sm:w-[25%]">
                    Quiz Title
                </p>
                {
                isOpen("quizTitle") ? (
                  <div className="flex max-sm:flex-col gap-2 items-center w-full">
                      <div className="relative w-full">
                        <input
                          type="text"
                          value={lessonDetails.quiz.title.value}
                          onChange={(e) => handleLessondetailschange("quizTitle", "value", e.target.value)}
                          className="outline-none focus:border-blue-500 text-sm border-2 rounded-xl h-[2.6rem] pl-10 focus:caret-indigo-500 w-full"
                        />
                        <CaptionsIcon className="top-0 translate-y-[11px] translate-x-2 absolute w-[1.2rem] h-[1.2rem]" />
                      </div>
                    <button onClick={(e) =>{e.preventDefault(); toggleOpenStatus("quizTitle")}} className="max-sm:w-full whitespace-nowrap px-4 py-2 w-fit h-fit text-white bg-blue-600 rounded-lg hover:bg-blue-700/90 active:bg-blue-700 transition-all duration-150">
                      Confirm
                    </button>
                  </div>
                )
                :
                  <div className="w-full flex justify-between items-center max-sm:flex-col">
                    <p className="pl-8 font-medium text-gray-500 max-w-[48rem] break-words">
                      {lessonDetails.quiz.title.value}
                    </p>
                    <p onClick={(e) =>{e.preventDefault(); toggleOpenStatus("quizTitle")}} className="w-fit max-sm:w-full max-sm:mt-3 items-center justify-center h-fit cursor-pointer py-2 px-4 flex border rounded-lg gap-2 hover:bg-gray-200/30 transition-all duration-150">
                        <PencilLineIcon className="w-[1.1rem] h-[1.1rem] translate-y-[2px]" />
                        Edit
                    </p>
                  </div>
              }
              </div>
              <hr className="mt-2" />
              <p className="text-slate-800 font-semibold text-lg mt-2">
                Quiz Qestions
              </p>
              <div className="flex flex-col gap-4">
                {
                  lessonDetails.quiz.questions.map(({question}: any, index: number) => (
                    <>
                      {index !== 0 && <hr className="w-full border-gray-200" />}
                      {
                        isOpen("question", undefined, index) ? (
                          <div className="grid gap-2">
                            <div className="flex max-sm:flex-col gap-4 items-center w-full">
                                <p className="whitespace-nowrap sm:w-[25%]">
                                    Question Content
                                </p>
                                <div className="relative w-full">
                                    <input
                                    value={question.content}
                                    onChange={(e) => handleLessondetailschange("question", "content", e.target.value, undefined, index)}
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
                                    onChange={(e) => handleLessondetailschange("question", "answer", e.target.value, undefined, index)}
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
                                    onChange={(e) => handleLessondetailschange("question", "max_score", e.target.value, undefined, index)}
                                    type="number"
                                    className="outline-none peer appearance-none no-arrows focus:border-blue-500 text-sm border-2 rounded-xl h-[2.6rem] pl-10 focus:caret-indigo-500 w-full"
                                    />
                                    <HashIcon className="top-0 translate-y-[11px] translate-x-2 absolute w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100" />
                                </div>
                            </div>
                            <button onClick={(e) =>{e.preventDefault(); toggleOpenStatus("question", undefined, index)}} className="max-sm:w-full whitespace-nowrap px-4 py-2 w-full h-fit text-white bg-blue-600 rounded-lg hover:bg-blue-700/90 active:bg-blue-700 transition-all duration-150">
                              Confirm
                            </button>
                          </div>
                        )
                        :
                       <div className="grid gap-2 w-full">
                          <div className="w-full flex justify-between items-center max-sm:flex-col">
                            <p className="max-sm:hidden flex">Question {index + 1 }</p>
                            <p onClick={(e) =>{e.preventDefault(); toggleOpenStatus("question", undefined, index)}} className="w-fit max-sm:w-full max-sm:mt-3 items-center justify-center h-fit cursor-pointer py-2 px-4 flex border rounded-lg gap-2 hover:bg-gray-200/30 transition-all duration-150">
                                <PencilLineIcon className="w-[1.1rem] h-[1.1rem] translate-y-[2px]" />
                                Edit
                            </p>
                          </div>
                         <div className="w-full flex justify-between px-8 mt-2">
                          <p className="text-slate-800 font-medium">
                            Question Content
                          </p>
                          <p className="font-medium text-gray-500 max-w-[48rem] break-words">
                              {question.content}
                          </p>
                        </div>
                        <div className="w-full flex justify-between px-8">
                          <p className="text-slate-800 font-medium">
                            Answer
                          </p>
                          <p className="font-medium text-gray-500 max-w-[48rem] break-words">
                              {question.answer}
                          </p>
                        </div>
                        <div className="w-full flex justify-between px-8">
                          <p className="text-slate-800 font-medium">
                            Question Score
                          </p>
                          <p className="font-medium text-gray-500 max-w-[48rem] break-words">
                              {question.max_score}
                          </p>
                        </div>
                       </div>
                      }
                    </>
                  ))
                }
              </div>
            </div>
            <button type="submit" className="w-full items-center justify-center flex mt-3 py-2 bg-purple-600 hover:bg-purple-600/90 active:bg-purple-700 text-white max-w-[90%] rounded-lg mx-auto">
              Save Changes
            </button>
          </div>
        </form>
  )
}

export default EditLessonPage