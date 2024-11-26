import React from 'react';
import HeroContent from './HeroContent';
import HeroImage from './HeroImage';

const HeroSection: React.FC = () => {
  return (
    <section className="flex relative flex-col justify-center items-center px-16 py-14 w-full bg-black bg-opacity-0 max-md:px-5 max-md:max-w-full">
      <div className="w-full max-w-[1089px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <HeroContent />
          <HeroImage />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;