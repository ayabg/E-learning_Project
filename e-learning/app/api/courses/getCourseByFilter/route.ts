import prisma from "@/lib/util/db";
import { NextResponse } from "next/server";

// Define valid duration labels as a union type
type DurationLabel = "1-3 hours" | "3-6 hours" | "6-12 hours" | "12-24 hours" | "24+ hours";

// Define the duration ranges with more specific types
const durationRanges: Record<DurationLabel, [number, number]> = {
  "1-3 hours": [1, 3],
  "3-6 hours": [3, 6],
  "6-12 hours": [6, 12],
  "12-24 hours": [12, 24],
  "24+ hours": [24, Infinity]
};

export async function POST(req: Request) {
  try {
    const { courseCategory, courseLanguages, courseLevel, courseDuration, selectedPriceRange } = await req.json();

    // Check that courseDuration is an array and contains valid entries
    if (!Array.isArray(courseDuration) || courseDuration.some(duration => !(duration in durationRanges))) {
      return NextResponse.json({ message: "Invalid or missing courseDuration" }, { status: 400 });
    }

    // Map courseDuration to an array of min-max ranges
    const durationRangesList = courseDuration.map(duration => durationRanges[duration as DurationLabel]);

    const courses = await prisma.course.findMany({
      where: {
        category: { in: courseCategory },
        language: { in: courseLanguages },
        difficulty: { in: courseLevel },
        price: {
          gte: selectedPriceRange[0],
          lte: selectedPriceRange[1]
        }
      },
      include: {
        lessons: {
          include: {
            chapters: true
          },
        },
        creator: true
      }
    });

    // Filter courses based on the total duration of all chapters
    const filteredCourses = courses.filter(course => {
      // Calculate total duration for each course by summing up chapter durations
      const totalDuration = course.lessons.reduce((acc, lesson) => {
        const lessonDuration = lesson.chapters.reduce((chapterAcc, chapter) => chapterAcc + chapter.duration, 0);
        return acc + lessonDuration;
      }, 0);

      // Check if total duration falls within any specified duration range
      return durationRangesList.some(([minDuration, maxDuration]) => totalDuration >= minDuration && totalDuration <= maxDuration);
    });

    console.log(filteredCourses)

    return NextResponse.json({ courses: filteredCourses }, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ message: err?.message }, { status: 500 });
  }
}
