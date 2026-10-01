const fs = require('fs');

function fixCreateBlog() {
  let content = fs.readFileSync('client/src/pages/Admin/CreateBlog.jsx', 'utf8');

  // 1. Add fields to blogData
  if (!content.includes('seo_title: createForm.meta_title')) {
    content = content.replace(
      /seo_analysis: currentSeo \|\| null/,
      "seo_analysis: currentSeo || null,\n        seo_title: createForm.meta_title || null,\n        seo_description: createForm.meta_description || null,\n        seo_keywords: createForm.focus_keyword || null"
    );
  }

  // 2. Add Live Preview UI
  if (!content.includes('Google Search Preview')) {
    const previewUI = `</div>

              <div className="pt-6 mt-6 border-t border-[var(--admin-border-subtle)]">
                <h4 className="text-xs font-bold text-[var(--admin-text-primary)] mb-3 flex items-center gap-1.5"><Globe className="w-3.5 h-3.5"/> Google Search Preview</h4>
                <div className="p-4 bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm font-sans">
                  <div className="text-[12px] mb-1.5 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-300">TG</div>
                    <div className="leading-tight">
                      <div className="text-[13px] text-slate-800 dark:text-slate-200">Taraj Global</div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-400">https://tarajglobal.com/blog/{createForm.slug || 'blog-slug'}</div>
                    </div>
                  </div>
                  <div className="text-[18px] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer mb-1 leading-tight line-clamp-1">
                    {createForm.meta_title || createForm.title || 'Blog Title'}
                  </div>
                  <div className="text-[13px] text-[#4d5156] dark:text-[#bdc1c6] line-clamp-2">
                    {createForm.meta_description || createForm.excerpt || 'Meta description appears here...'}
                  </div>
                </div>
              </div>
            </div>`;
            
    content = content.replace(
      /<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/form>\s*<\/div>/,
      previewUI + "\n          </div>\n        </div>\n      </form>\n    </div>"
    );
  }

  fs.writeFileSync('client/src/pages/Admin/CreateBlog.jsx', content);
}

function fixEditBlog() {
  let content = fs.readFileSync('client/src/pages/Admin/EditBlog.jsx', 'utf8');

  // 1. Initial Data
  if (!content.includes('meta_title: blogData.seo_title')) {
    content = content.replace(
      /scheduled_time: sTime/,
      "scheduled_time: sTime,\n          meta_title: blogData.seo_title || '',\n          meta_description: blogData.seo_description || '',\n          focus_keyword: blogData.seo_keywords || ''"
    );
  }

  // 2. Add fields to updateData
  if (!content.includes('seo_title: editForm.meta_title')) {
    content = content.replace(
      /seo_analysis: currentSeo \|\| null/,
      "seo_analysis: currentSeo || null,\n        seo_title: editForm.meta_title || null,\n        seo_description: editForm.meta_description || null,\n        seo_keywords: editForm.focus_keyword || null"
    );
  }

  // 3. Add Live Preview UI
  if (!content.includes('Google Search Preview')) {
    const previewUI = `</div>

              <div className="pt-6 mt-6 border-t border-[var(--admin-border-subtle)]">
                <h4 className="text-xs font-bold text-[var(--admin-text-primary)] mb-3 flex items-center gap-1.5"><Globe className="w-3.5 h-3.5"/> Google Search Preview</h4>
                <div className="p-4 bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm font-sans">
                  <div className="text-[12px] mb-1.5 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-300">TG</div>
                    <div className="leading-tight">
                      <div className="text-[13px] text-slate-800 dark:text-slate-200">Taraj Global</div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-400">https://tarajglobal.com/blog/{editForm.slug || 'blog-slug'}</div>
                    </div>
                  </div>
                  <div className="text-[18px] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer mb-1 leading-tight line-clamp-1">
                    {editForm.meta_title || editForm.title || 'Blog Title'}
                  </div>
                  <div className="text-[13px] text-[#4d5156] dark:text-[#bdc1c6] line-clamp-2">
                    {editForm.meta_description || editForm.excerpt || 'Meta description appears here...'}
                  </div>
                </div>
              </div>
            </div>`;
            
    content = content.replace(
      /<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/form>\s*<\/div>/,
      previewUI + "\n          </div>\n        </div>\n      </form>\n    </div>"
    );
  }

  fs.writeFileSync('client/src/pages/Admin/EditBlog.jsx', content);
}

fixCreateBlog();
fixEditBlog();
