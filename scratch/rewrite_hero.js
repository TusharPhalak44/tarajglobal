const fs = require('fs');

const file = 'client/src/components/sections/Hero/HeroRightAnimation.jsx';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

// We know SceneGrowthStalled ends around line 181. We keep lines 0 to 180 (so line 181 inclusive).
const newLines = lines.slice(0, 181);

const newComponent = `
export const HeroRightAnimation = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative min-h-[400px] sm:min-h-[500px] lg:min-h-[580px] px-2 sm:px-4 mt-[-0px] sm:mt-5 xl:mt-0 select-none mix-blend-screen">
      <motion.div className="relative w-full max-w-[700px] h-[400px] sm:h-[550px] bg-transparent overflow-hidden transition-all duration-500 flex flex-col mix-blend-screen">
        <div className="relative pt-6 sm:pt-8 flex flex-col items-center w-full h-full">
          <div className="absolute top-4 sm:top-6 text-center w-full px-4 z-30">
            <h2 className="text-lg sm:text-2xl font-black text-white/95 uppercase tracking-tight mb-0.5 drop-shadow-md">Growth Stalled</h2>
            <p className="text-red-500 font-bold text-[9px] sm:text-[11px] uppercase tracking-widest drop-shadow-sm">Need more qualified leads</p>
          </div>
          <div className="w-full h-full pt-16">
            <SceneGrowthStalled isActive={true} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
`;

fs.writeFileSync(file, newLines.join('\n') + newComponent);
