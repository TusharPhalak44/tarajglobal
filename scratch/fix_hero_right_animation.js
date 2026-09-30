const fs = require('fs');

const filePath = 'c:\\Users\\TGS33\\Desktop\\TGS\\tarajglobal\\client\\src\\components\\sections\\Hero\\HeroRightAnimation.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove mix-blend modes from main containers
content = content.replace(/select-none mix-blend-multiply dark:mix-blend-screen/g, 'select-none');
content = content.replace(/flex flex-col mix-blend-multiply dark:mix-blend-screen/g, 'flex flex-col');

// 2. Remove black background from BusinessCharacter container
content = content.replace(/bg-\[#030509\]\/90 shadow-\[0_0_30px_rgba\(0,166,255,0\.1\)\] dark:bg-transparent dark:shadow-none border border-slate-800\/50 dark:border-transparent/g, 'bg-transparent dark:bg-transparent border-transparent dark:border-transparent');

// 3. Fix video blending
content = content.replace(/mix-blend-lighten/g, 'dark:mix-blend-screen dark:invert-0 dark:grayscale-0 mix-blend-multiply invert grayscale opacity-60 dark:opacity-100');

// 4. Fix specific text colors
content = content.replace(/text-white\/95/g, 'text-slate-800 dark:text-white/95');
content = content.replace(/bg-white\/20/g, 'bg-slate-300 dark:bg-white/20');
content = content.replace(/text-white\/60/g, 'text-slate-600 dark:text-white/60');
content = content.replace(/text-white\/70/g, 'text-slate-700 dark:text-white/70');
content = content.replace(/text-white\/30/g, 'text-slate-400 dark:text-white/30');
content = content.replace(/text-white\/40/g, 'text-slate-500 dark:text-white/40');
content = content.replace(/text-white\/50/g, 'text-slate-500 dark:text-white/50');
content = content.replace(/text-white\/80/g, 'text-slate-800 dark:text-white/80');
content = content.replace(/text-white\/90/g, 'text-slate-900 dark:text-white/90');
content = content.replace(/bg-white\/5/g, 'bg-slate-200 dark:bg-white/5');
content = content.replace(/bg-white\/10/g, 'bg-slate-200 dark:bg-white/10');
content = content.replace(/from-white/g, 'from-slate-800 dark:from-white');

// Fix Play button overlay
content = content.replace(/bg-\[#000\]\/60/g, 'bg-white/60 dark:bg-[#000]/60');

// Fix scene indicator background
content = content.replace(/bg-\[#000\]\/70/g, 'bg-white/70 dark:bg-[#000]/70');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done modifying HeroRightAnimation.jsx');
