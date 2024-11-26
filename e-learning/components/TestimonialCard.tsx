import React from 'react';
import Image from 'next/image';
interface TestimonialProps {
    name: string,
    text: string, 
    image: any
}
function TestimonialCard({name, text, image}: TestimonialProps) {
    return (
        <div className="shadow-course-card border flex flex-col gap-3 max-md:w-[22rem] w-[30rem] h-full p-6 mx-auto rounded-md mb-8">
            <p className="flex-grow text-ellipsis text-black text-sm md:text-base font-medium text-center">
                {text}
            </p>
            <div className="flex w-full items-center gap-2 justify-center">
                <div className="relative w-8 h-8">
                    <Image 
                        src={image} 
                        alt="Mentor Image" 
                        className="object-cover rounded-full w-16 h-16" 
                        layout="fill"
                    />
                </div>
                <span className="text-black font-bold text-sm">{name}</span>
                <div className="h-[24px] w-[1px] border-t bg-gray-300"></div>
                <span className="text-xs text-gray-500">CTO at Microsoft</span>
            </div>
        </div>
    );
}

export default TestimonialCard;
