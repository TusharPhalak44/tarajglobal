const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\TGS33\\Desktop\\TGS\\tarajglobal\\client\\src\\components\\sections\\Hero\\HeroRightAnimation.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// --- SCENE: REVENUE GROWTH (2.34x) ---
// Fix the 2.34x text gradient so it's not brown/white but instead primary/cta in light mode
content = content.replace(
  /text-transparent bg-clip-text bg-gradient-to-br from-slate-800 dark:from-white to-cta/g,
  'text-transparent bg-clip-text bg-gradient-to-br from-slate-900 dark:from-white to-primary dark:to-cta'
);
content = content.replace(
  /bg-background dark:bg-\[#050505\]\/40 backdrop-blur-sm p-6 rounded-3xl/g,
  'bg-white/90 dark:bg-[#050505]/40 backdrop-blur-md p-6 rounded-3xl shadow-2xl dark:shadow-none'
);

// --- SCENE: PIPELINE (Growth Stalled) ---
content = content.replace(
  /bg-surface dark:bg-\[#0a0a0a\]\/90 border border-red-500\/30/g,
  'bg-white dark:bg-[#0a0a0a]/90 border border-red-200 dark:border-red-500/30'
);
content = content.replace(
  /bg-surface dark:bg-\[#0a0a0a\]\/90 border border-amber-500\/30/g,
  'bg-white dark:bg-[#0a0a0a]/90 border border-amber-200 dark:border-amber-500/30'
);

// --- SCENE: IN HOUSE ATTEMPT ---
content = content.replace(
  /bg-background dark:bg-\[#050505\]\/90 border border-border dark:border-white\/10/g,
  'bg-white/95 dark:bg-[#050505]/90 border border-slate-200 dark:border-white/10'
);
content = content.replace(
  /bg-surface\/80 dark:bg-white\/5/g,
  'bg-slate-100 dark:bg-white/5'
);

// --- CHARACTER VIDEO ---
// The user hates the dark box and hates the ghosting.
// The best approach for an MP4 with a black background in a light theme is to embrace the black background
// by putting it inside a beautiful "Video Card" UI with a dark background.
// I will replace the video container with a highly styled card.
const oldVideoContainer = /<div className="w-\[140px\] h-40 sm:w-40 sm:h-52 relative flex items-center justify-center overflow-hidden isolate rounded-xl bg-\[#030509\]\/90 shadow-\[0_0_30px_rgba\(0,166,255,0\.1\)\] dark:bg-transparent dark:shadow-none border border-slate-800\/50 dark:border-transparent p-2 opacity-100 pointer-events-none">/g;

const newVideoContainer = `<div className="w-[140px] h-40 sm:w-40 sm:h-52 relative flex items-center justify-center overflow-hidden isolate rounded-xl bg-black dark:bg-transparent shadow-[0_10px_40px_rgba(0,0,0,0.2)] dark:shadow-none border-4 border-white dark:border-transparent p-0 sm:p-0 opacity-100 pointer-events-none">`;

content = content.replace(oldVideoContainer, newVideoContainer);

// Make sure videos don't have mix-blend-screen in light mode if we use a solid black card?
// Wait, if the card is solid black (`bg-black`), then mix-blend-screen works perfectly! 
// Let's leave mix-blend-screen as is, it's fine on a black background.

// --- GENERAL TEXT ---
// Fix uppercase tracking text that might be too faint
content = content.replace(/text-slate-500 dark:text-white\/40/g, 'text-slate-600 dark:text-white/40');
content = content.replace(/text-slate-600 dark:text-white\/60/g, 'text-slate-700 dark:text-white/60');
content = content.replace(/text-slate-400 dark:text-white\/30/g, 'text-slate-500 dark:text-white/30');

// Fix glowing dots on pipelines to look good on white
content = content.replace(/bg-white\/40/g, 'bg-slate-400 dark:bg-white/40');
content = content.replace(/bg-white\/20 rounded-full/g, 'bg-slate-300 dark:bg-white/20 rounded-full');

// Fix client feedback card
content = content.replace(
  /w-\[280px\] sm:w-\[360px\] bg-background dark:bg-\[#050505\]\/95/g,
  'w-[280px] sm:w-[360px] bg-white/95 dark:bg-[#050505]/95'
);
content = content.replace(
  /text-white\/90 italic/g,
  'text-slate-800 dark:text-white/90 italic'
);
content = content.replace(
  /bg-surface dark:bg-\[#0a0a0a\]\/95 border border-border/g,
  'bg-white/95 dark:bg-[#0a0a0a]/95 border border-slate-200'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done comprehensively fixing HeroRightAnimation.jsx for light mode.');
