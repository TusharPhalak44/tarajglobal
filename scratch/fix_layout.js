const fs = require('fs');

function fixLayout(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Fix grid columns (Desktop layout: 70-75% vs 25-30%)
  content = content.replace(
    /className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"/g,
    'className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 items-start"'
  );

  // 2. Remove lg:col-span-2 from main content
  content = content.replace(
    /<div className="lg:col-span-2 space-y-6">/g,
    '<div className="space-y-6">'
  );

  // 3. Fix Title and Slug grid (Title needs to be wider than slug)
  content = content.replace(
    /<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">/g,
    '<div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">'
  );

  // 4. Excerpt field - already full width inside its div but let's improve styling
  content = content.replace(
    /className="admin-input resize-none"/g,
    'className="admin-input resize-none focus:ring-0 focus:ring-offset-0 shadow-none border-slate-300 dark:border-slate-700"'
  );

  // 5. Fix Content editor textarea (min-height 500px, no native resize)
  content = content.replace(
    /rows=\{15\}\s*placeholder="Start writing your content here\.\.\."\s*className="admin-input resize-y rounded-t-none font-sans"/g,
    'placeholder="Start writing your content here..."\n                  className="admin-input resize-none rounded-t-none font-sans min-h-[500px] shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700"'
  );

  // 6. Fix generic input styles (Focus glow too strong)
  content = content.replace(
    /className="admin-input"/g,
    'className="admin-input shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700"'
  );
  content = content.replace(
    /className="admin-input shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900\/50 pr-8"/g,
    'className="admin-input shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 pr-8"'
  );

  // Catch the slug input which had its own class
  content = content.replace(
    /className="admin-input bg-slate-50 dark:bg-slate-900\/50 pr-8"/g,
    'className="admin-input shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 pr-8"'
  );
  
  // Catch the select elements (Categories, Author)
  content = content.replace(
    /className="admin-select"/g,
    'className="admin-select shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700"'
  );
  content = content.replace(
    /className="admin-select text-xs"/g,
    'className="admin-select text-xs shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700"'
  );

  // Catch input text-xs (Publish Date, etc)
  content = content.replace(
    /className="admin-input text-xs"/g,
    'className="admin-input text-xs shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700"'
  );

  // Catch textarea text-xs (Meta Description)
  content = content.replace(
    /className="admin-input resize-none text-xs"/g,
    'className="admin-input resize-none text-xs shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700"'
  );
  
  // Clean up duplicate classes if they happened
  content = content.replace(/shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700 shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700/g, 'shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700');

  // 7. Background is visually noisy (Reduce noisy bg)
  content = content.replace(
    /className="admin-card p-6 space-y-5"/g,
    'className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5 shadow-sm"'
  );
  content = content.replace(
    /className="admin-card p-6 space-y-4"/g,
    'className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4 shadow-sm"'
  );

  fs.writeFileSync(filePath, content);
}

fixLayout('client/src/pages/Admin/CreateBlog.jsx');
fixLayout('client/src/pages/Admin/EditBlog.jsx');
