import React from 'react';
import Image from 'next/image';
import landing from "./Images/landing.png"
const HeroImage: React.FC = () => {
  return (
    <div className="relative flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full items-center">
      <div className="absolute -z-40 p-48 max-sm:p-36 w-fit rounded-full bg-orange-400/60 blur-xl" />
      <Image 
        loading="lazy" 
        src={landing} 
        className="relative object-contain grow w-full aspect-[0.96] max-md:mt-8 max-md:max-w-full drop-shadow-2xl shadow-orange-400 z-40" 
        alt="Learning adventure illustration"
      />
    </div>

  );
};

export default HeroImage;