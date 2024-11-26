import React from 'react';

interface StatisticItemProps {
  icon: string;
  rating?: string;
  count?: string;
  label: string;
}

const StatisticItem: React.FC<StatisticItemProps> = ({ icon, rating, count, label }) => {
  return (
    <div className="flex gap-2.5">
      <img loading="lazy" src={icon} className="object-contain shrink-0 rounded-3xl aspect-square w-[41px]" alt={`${label} icon`} />
      <div className="flex flex-col my-auto">
        <div className={`self-start text-base ${rating ? 'text-stone-500' : 'text-neutral-600'}`}>
          {rating || count}
        </div>
        <div className="text-xs text-neutral-400">
          {label}
        </div>
      </div>
    </div>
  );
};

export default StatisticItem;