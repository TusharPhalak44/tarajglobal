const fs = require('fs');

function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes("import ReactQuill from 'react-quill'")) {
    content = content.replace(
      /import ReactQuill from 'react-quill'/,
      "import ReactQuill from 'react-quill-new'"
    );
    fs.writeFileSync(filePath, content);
  }
}

fixImports('client/src/pages/Admin/CreateBlog.jsx');
fixImports('client/src/pages/Admin/EditBlog.jsx');
