import React from 'react';
import StatisticItem from './StatisticsItem';

const HeroContent: React.FC = () => {
  const statistics = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/599073c3c437dcfaa6b5723eeda06d0d69de9fe26280170941b1b6255543eedd?placeholderIfAbsent=true&apiKey=fc6efef34e3641e0a00c3c8aba71e737", rating: "4.6", label: "Overall Rating" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2c18d241ec857800ccc016bae506a89942f8c203ce2e519daeb2712d505f2ec8?placeholderIfAbsent=true&apiKey=fc6efef34e3641e0a00c3c8aba71e737", count: "8.8M+", label: "Students" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/def94fe57bcc10555e9cb1963e41ab248613b11f0de642e58284a468f957fb84?placeholderIfAbsent=true&apiKey=fc6efef34e3641e0a00c3c8aba71e737", count: "300+", label: "instructor" }
  ];

  return (
    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col items-start self-stretch my-auto w-full font-semibold max-md:mt-10 max-md:max-w-full">
        <h1 className="self-stretch text-5xl text-zinc-800 max-md:max-w-full max-md:text-4xl">
          Embark on a Learning <br /> Adventure Online
        </h1>
        <p className="mt-14 text-xs text-neutral-500 max-md:mt-10 max-md:max-w-full">
          Embark on an exhilarating learning adventure as you dive into our diverse range of <br />
          online courses. Explore new subjects, acquire valuable skills, and shape your <br />
          knowledge at your own pace, all from the comfort of your digital classroom
        </p>
        <div className="flex gap-3 mt-10 max-w-full text-xs w-[309px] max-md:mt-10 max-sm:flex-col">
          <button className="flex-1 px-7 py-3.5 bg-violet-400 hover:bg-violet-400/90 active:bg-violet-400 transition duration-150 rounded border border-violet-400 border-solid text-violet-100 max-md:px-5">
            Explore More
          </button>
          <button className="flex-1 px-7 py-3.5  rounded border border-solid border-stone-500 bg-white text-neutral-500 hover:bg-neutral-500 active:bg-neutral-500/80 hover:text-white transition duration-150 max-md:px-5">
            Financial Aid
          </button>
        </div>
        <div className="flex flex-col mt-8 max-w-full w-[391px] max-sm:hidden">
          <div className="flex gap-5 justify-between">
            {statistics.map((stat, index) => (
              <StatisticItem key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;