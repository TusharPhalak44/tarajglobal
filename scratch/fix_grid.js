const fs = require('fs');

function restructureGrid(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Change the form grid classes
  content = content.replace(
    /className="grid grid-cols-1 lg:grid-cols-\[3fr_1fr\] gap-6 items-start"/g,
    'className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"'
  );

  // 2. Add col-span to the Main Column (which currently has {/* LEFT MAIN COLUMN */} and className="space-y-6")
  content = content.replace(
    /\{\/\* LEFT MAIN COLUMN \*\/\}\s*<div className="space-y-6">/g,
    '{/* LEFT MAIN COLUMN */}\n        <div className="space-y-6 lg:col-span-8 xl:col-span-9 order-1">'
  );

  // 3. Add col-span to the Sidebar Column
  content = content.replace(
    /\{\/\* RIGHT SIDEBAR COLUMN \*\/\}\s*<div className="space-y-6">/g,
    '{/* RIGHT SIDEBAR COLUMN */}\n        <div className="space-y-6 lg:col-span-4 xl:col-span-3 order-2">'
  );

  // 4. Extract SEO Settings and put it outside the Sidebar Column!
  // We need to match from `<div className="admin-section space-y-4">\s*<h3 ...>SEO Settings</h3>`
  // up to the closing `</div>` of the SEO Settings section.
  const seoMatch = content.match(/(<div className="admin-section space-y-4">\s*<h3[^>]*>\s*SEO Settings\s*<\/h3>[\s\S]*?Google Search Preview[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>)/);

  if (seoMatch) {
    const seoContent = seoMatch[1];
    
    // Remove SEO from the Sidebar
    content = content.replace(seoContent, '');

    // Now, we need to insert the SEO block AFTER the Sidebar's closing `</div>`
    // Wait, the sidebar ends right before `</form>`.
    // Let's replace `</form>` with our new SEO block + `</form>`.
    const newSeoBlock = `
        {/* SEO SECTION */}
        <div className="space-y-6 lg:col-span-8 xl:col-span-9 order-3">
          ${seoContent}
        </div>
      </form>`;
    
    content = content.replace(/<\/form>/, newSeoBlock);
  }

  fs.writeFileSync(filePath, content);
}

restructureGrid('client/src/pages/Admin/CreateBlog.jsx');
restructureGrid('client/src/pages/Admin/EditBlog.jsx');
