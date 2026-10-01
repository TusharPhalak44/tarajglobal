const fs = require('fs');

function fixThemeClasses(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix Buttons
  content = content.replace(
    /className="admin-btn admin-btn-secondary bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm font-semibold"/g,
    'className="admin-btn admin-btn-secondary font-semibold"'
  );
  content = content.replace(
    /className="admin-btn admin-btn-primary shadow-md bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6"/g,
    'className="admin-btn admin-btn-primary font-semibold px-6"'
  );

  // Fix Cards/Sections
  content = content.replace(
    /className="bg-white dark:bg-\[#0f172a\] border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-([45]) shadow-sm"/g,
    'className="admin-section space-y-$1"'
  );
  
  // Fix ReactQuill wrapper
  content = content.replace(
    /className="bg-white dark:bg-slate-900 rounded-lg"/g,
    'className="bg-[var(--admin-bg-canvas)] rounded-lg"'
  );

  // Fix Inputs and Selects (remove hardcoded colors but keep shadow-none focus... etc if they are there, actually admin-input handles focus!)
  // Instead of complex regex, let's just strip the extra tailwind colors from admin-input and admin-select
  content = content.replace(/shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900\/50 /g, '');
  content = content.replace(/shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700 /g, '');
  content = content.replace(/resize-none focus:ring-0 focus:ring-offset-0 shadow-none border-slate-300 dark:border-slate-700/g, 'resize-none');
  content = content.replace(/resize-none text-xs shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700/g, 'resize-none text-xs');
  content = content.replace(/text-xs shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700/g, 'text-xs');

  // Fix Tags Background
  content = content.replace(
    /bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300/g,
    'bg-[var(--admin-bg-elevated)] text-[var(--admin-text-primary)] border border-[var(--admin-border-base)]'
  );

  // Fix SEO Google Preview
  content = content.replace(
    /bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/g,
    'bg-[var(--admin-bg-surface)] border-[var(--admin-border-base)]'
  );
  content = content.replace(
    /bg-slate-100/g,
    'bg-[var(--admin-bg-elevated)]'
  );
  content = content.replace(
    /text-slate-600 dark:text-slate-400/g,
    'text-[var(--admin-text-secondary)]'
  );
  content = content.replace(
    /text-blue-600 dark:text-blue-400/g,
    'text-[var(--admin-primary)]'
  );
  content = content.replace(
    /bg-white dark:bg-\[#1a1a1a\] border border-slate-200 dark:border-slate-800/g,
    'bg-[var(--admin-bg-surface)] border-[var(--admin-border-base)]'
  );
  content = content.replace(
    /bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300/g,
    'bg-[var(--admin-bg-elevated)] text-[var(--admin-text-primary)]'
  );
  content = content.replace(
    /text-slate-800 dark:text-slate-200/g,
    'text-[var(--admin-text-primary)]'
  );
  content = content.replace(
    /text-\[#1a0dab\] dark:text-\[#8ab4f8\]/g,
    'text-[#1a0dab] dark:text-[#8ab4f8]'
  );
  content = content.replace(
    /text-\[#4d5156\] dark:text-\[#bdc1c6\]/g,
    'text-[#4d5156] dark:text-[#bdc1c6]'
  );

  fs.writeFileSync(filePath, content);
}

fixThemeClasses('client/src/pages/Admin/CreateBlog.jsx');
fixThemeClasses('client/src/pages/Admin/EditBlog.jsx');
