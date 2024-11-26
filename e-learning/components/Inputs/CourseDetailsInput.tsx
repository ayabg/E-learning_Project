import { Link1Icon } from "@radix-ui/react-icons";
import {
  BoltIcon,
  CaptionsIcon,
  CircleDollarSignIcon,
  LanguagesIcon,
  LibraryBigIcon,
  TextIcon,
} from "lucide-react";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Course, UpdateCourseDetail } from "@/types/types";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const existinglanguages = ["English", "French", "Spanish", "German", "Italian"]
const existingCategories = ["Web Development", "Mobile Development", "Data Science", "Machine Learning", "Artificial Intelligence"]

function CourseDetailsInput({
  course,
  changeCourseDetails,
}: {
  course: Course;
  changeCourseDetails: UpdateCourseDetail;
}) {
  return (
    <div className="grid gap-4 md:px-4 px-2">
      <div className="flex max-sm:flex-col gap-4 items-center w-full">
        <p className="whitespace-nowrap sm:w-[25%]">Course Title</p>
        <div className="relative w-full">
          <input
            value={course.title}
            onChange={(e) => changeCourseDetails("title", e.target.value)}
            type="text"
            className="outline-none peer focus:border-blue-500 text-sm border-2 rounded-xl h-[2.6rem] pl-10 focus:caret-indigo-500 w-full"
          />
          <CaptionsIcon className="top-0 translate-y-[11px] translate-x-2 absolute w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100" />
        </div>
      </div>
      <div className="flex max-sm:flex-col gap-4 items-center w-full">
        <p className="whitespace-nowrap sm:w-[25%]">Price</p>
        <div className="relative w-full">
          <input
            value={course.price}
            onChange={(e) => changeCourseDetails("price", e.target.value)}
            type="number"
            className="outline-none peer appearance-none no-arrows focus:border-blue-500 text-sm border-2 rounded-xl h-[2.6rem] pl-10 focus:caret-indigo-500 w-full"
          />
          <CircleDollarSignIcon className="top-0 translate-y-[11px] translate-x-2 absolute w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100" />
        </div>
      </div>
      <div className="flex max-sm:flex-col gap-4 items-center w-full">
        <p className="whitespace-nowrap sm:w-[25%]">Course Language</p>
        <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <Button variant="outline" className="flex items-center justify-start gap-2"> 
            <LanguagesIcon className="w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100" /> 
            { course.language ? course.language :  "Choose language"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Languages</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {existinglanguages.map((language) => (
            <DropdownMenuItem
            onSelect={() => changeCourseDetails("language", language)}
              key={language}
            >
              {language}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
      <div className="flex max-sm:flex-col gap-4 items-center w-full">
        <p className="whitespace-nowrap sm:w-[25%]">Course Category</p>
        <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <Button variant="outline" className="flex items-center justify-start gap-2"> 
            <LibraryBigIcon className="w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100" /> 
            { course.category ? course.category : "Choose Category"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {existingCategories.map((category) => (
            <DropdownMenuItem
              onSelect={() => changeCourseDetails("category", category)}
              key={category}
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
      <div className="flex max-sm:flex-col max-sm:gap-4 items-center w-full">
        <p className="whitespace-nowrap sm:w-[22%]">Difficulty</p>
        <RadioGroup
          defaultValue={course.difficulty}
          onValueChange={(e) => changeCourseDetails("difficulty", e)}
          className="flex gap-2 items-center"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="beginner" id="r1" />
            <Label htmlFor="r1">Beginner</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="intermediate" id="r2" />
            <Label htmlFor="r2">Intermediate</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="advanced" id="r3" />
            <Label htmlFor="r3">Advanced</Label>
          </div>
        </RadioGroup>
      </div>
      <p className="mt-2"> Course Description </p>
      <div className="relative w-full">
        <textarea
          value={course.description}
          onChange={(e) => changeCourseDetails("description", e.target.value)}
          className="border-2 rounded-xl peer w-full h-32 outline-none focus:border-blue-500 pl-10 pt-2"
        />
        <TextIcon className="peer-focus:text-blue-500 top-0 translate-y-[12px] translate-x-2 absolute w-[1.2rem] h-[1.2rem] transition-all duration-100" />
      </div>
    </div>
  );
}

export default CourseDetailsInput;
