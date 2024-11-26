import React from 'react';

const Navigation: React.FC = () => {
  const navItems = [
    { text: 'Courses', path: '/courses' },
    { text: 'Mentors', path: '/mentors' },
    { text: 'Mentors', path: '/mentors' }
  ];

  return (
    <nav className="flex gap-10 self-stretch my-auto text-xs whitespace-nowrap">
      {navItems.map((item, index) => (
        <a key={index} href={item.path} className={`text-sm text-zinc-600 hover:text-zinc-800`}>
          {item.text}
        </a>
      ))}
    </nav>
  );
};

export default Navigation;