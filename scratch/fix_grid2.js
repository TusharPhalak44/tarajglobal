const fs = require('fs');

function makeGridResponsive(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Change Grid Container
  content = content.replace(
    /className="grid grid-cols-1 lg:grid-cols-\[3fr_1fr\] gap-6 items-start"/g,
    'className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"'
  );

  // Change Left Main Column
  content = content.replace(
    /\{\/\* LEFT MAIN COLUMN \*\/\}\s*<div className="space-y-6">/g,
    '{/* LEFT MAIN COLUMN */}\n        <div className="space-y-6 lg:col-span-8 xl:col-span-9 order-1 min-w-0">'
  );

  // Change Right Sidebar Column
  content = content.replace(
    /\{\/\* RIGHT SIDEBAR COLUMN \*\/\}\s*<div className="space-y-6">/g,
    '{/* RIGHT SIDEBAR COLUMN */}\n        <div className="space-y-6 lg:col-span-4 xl:col-span-3 order-2 min-w-0">'
  );

  // Split out SEO Settings
  const seoSettingsSplit = content.split(/<div className="admin-section space-y-4">\s*<h3[^>]*>\s*SEO Settings\s*<\/h3>/);
  if (seoSettingsSplit.length === 2) {
    const preSEO = seoSettingsSplit[0];
    const afterSEOHeader = seoSettingsSplit[1];

    // the afterSEOHeader contains the rest of the file.
    // we need to find where the SEO section ends. 
    // It ends at `</form>`. So it has exactly 3 closing `</div>` tags.
    // Wait, the structure was:
    // <div className="admin-section space-y-4">
    //    <h3>SEO Settings</h3>
    //    <div className="space-y-4">
    //       ... (inputs) ...
    //    </div>
    // </div>
    // </div>  <-- this one closes the Right Sidebar Column!
    // </form>

    const closingMatch = afterSEOHeader.match(/<\/div>\s*<\/div>\s*<\/form>/);
    if (closingMatch) {
      const seoBlockContent = afterSEOHeader.substring(0, closingMatch.index);
      const afterForm = afterSEOHeader.substring(closingMatch.index + closingMatch[0].length);

      const newContent = `${preSEO}</div>\n        {/* SEO SECTION */}\n        <div className="space-y-6 lg:col-span-8 xl:col-span-9 order-3 min-w-0">\n          <div className="admin-section space-y-4">\n            <h3 className="text-base font-bold text-[var(--admin-text-primary)] border-b border-[var(--admin-border-subtle)] pb-4">\n              SEO Settings\n            </h3>${seoBlockContent}</div>\n        </div>\n      </form>${afterForm}`;
      fs.writeFileSync(filePath, newContent);
    }
  }
}

makeGridResponsive('client/src/pages/Admin/CreateBlog.jsx');
makeGridResponsive('client/src/pages/Admin/EditBlog.jsx');
