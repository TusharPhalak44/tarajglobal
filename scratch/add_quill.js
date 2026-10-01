const fs = require('fs');

function addQuill(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Add imports
  if (!content.includes("import ReactQuill")) {
    content = content.replace(
      "import { ArrowLeft",
      "import ReactQuill from 'react-quill';\nimport 'react-quill/dist/quill.snow.css';\nimport { ArrowLeft"
    );
  }

  // Add modules definition
  if (!content.includes("const quillModules")) {
    const searchString = filePath.includes('CreateBlog') ? "const CreateBlog = () => {" : "const EditBlog = () => {";
    content = content.replace(
      searchString,
      `const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link', 'image'],
    ['clean']
  ],
};

${searchString}`
    );
  }

  // Replace fake toolbar and textarea
  const regex = /\{\/\* Fake rich text toolbar \*\/\}[\s\S]*?name="content"[\s\S]*?required\s*\/\>/;
  
  const quillComponent = `<div className="bg-white dark:bg-slate-900 rounded-lg">
                  <style>{\`
                    .ql-container {
                      min-height: 500px;
                      font-size: 16px;
                      border-bottom-left-radius: 0.5rem;
                      border-bottom-right-radius: 0.5rem;
                      font-family: inherit;
                    }
                    .ql-toolbar {
                      border-top-left-radius: 0.5rem;
                      border-top-right-radius: 0.5rem;
                      background-color: var(--admin-bg-elevated, #f8fafc);
                    }
                    .dark .ql-snow .ql-toolbar button, .dark .ql-snow .ql-toolbar .ql-picker-label {
                      color: #cbd5e1;
                    }
                    .dark .ql-snow .ql-stroke { stroke: #cbd5e1; }
                    .dark .ql-snow .ql-fill { fill: #cbd5e1; }
                    .dark .ql-picker-options { background-color: #1e293b; color: #cbd5e1; }
                  \`}</style>
                  <ReactQuill 
                    theme="snow"
                    value={createForm.content}
                    onChange={(val) => setCreateForm(prev => ({...prev, content: val}))}
                    modules={quillModules}
                    placeholder="Start writing your content here..."
                  />
                </div>`;

  content = content.replace(regex, quillComponent);

  fs.writeFileSync(filePath, content);
}

try {
  addQuill('client/src/pages/Admin/CreateBlog.jsx');
  addQuill('client/src/pages/Admin/EditBlog.jsx');
} catch (e) { console.error(e) }
