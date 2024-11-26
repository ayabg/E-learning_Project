import React from 'react';
import Image from 'next/image';
import icon from "../Images/logo.png"
const Logo = ({classname}: {classname?: string}) => {
  return (
    <a href='/' className={`flex gap-1.5 self-stretch my-auto text-base whitespace-nowrap text-neutral-700 ${classname}`}>
      <Image loading="lazy" src={icon} className="object-contain shrink-0 aspect-[0.95] w-[21px]" alt="logo"/>
      <div className="translate-y-[2px]">E-Learning</div>
    </a>
  );
};

export default Logo;