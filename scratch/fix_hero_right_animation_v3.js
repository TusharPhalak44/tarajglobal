const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\TGS33\\Desktop\\TGS\\tarajglobal\\client\\src\\components\\sections\\Hero\\HeroRightAnimation.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Make the man smaller and remove the solid black container
const oldContainer = /<div className="w-\[140px\] h-40 sm:w-40 sm:h-52 relative flex items-center justify-center overflow-hidden isolate rounded-xl bg-black dark:bg-transparent shadow-\[0_10px_40px_rgba\(0,0,0,0\.2\)\] dark:shadow-none border-4 border-white dark:border-transparent p-0 sm:p-0 opacity-100 pointer-events-none">/g;

// I will just make it a transparent container, much smaller.
const newContainer = `<div className="w-[100px] h-28 sm:w-28 sm:h-36 relative flex items-center justify-center overflow-hidden isolate rounded-xl bg-transparent dark:bg-transparent border-transparent dark:border-transparent p-0 sm:p-0 opacity-100 pointer-events-none z-10">`;

content = content.replace(oldContainer, newContainer);

// Also remove `mix-blend-screen` from light mode just in case it was washing him out on transparent backgrounds
// Replace `mix-blend-screen` with `dark:mix-blend-screen` on the videos
content = content.replace(/className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 \$\{direction === 1 \? 'opacity-100 z-10' : 'opacity-0 z-0'\} mix-blend-screen`}/g, 
  "className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${direction === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'} dark:mix-blend-screen`}");
  
content = content.replace(/className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 \$\{direction === -1 \? 'opacity-100 z-10' : 'opacity-0 z-0'\} mix-blend-screen`}/g,
  "className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${direction === -1 ? 'opacity-100 z-10' : 'opacity-0 z-0'} dark:mix-blend-screen`}");

// 2. Make the floating panels more transparent in light mode so content isn't fully hidden
content = content.replace(/bg-white\/90/g, 'bg-white/60');
content = content.replace(/bg-white\/95/g, 'bg-white/60');
content = content.replace(/bg-white /g, 'bg-white/60 ');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done fixing HeroRightAnimation sizing and overlaps.');
