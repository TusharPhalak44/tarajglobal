const fs = require('fs');

function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes("import 'react-quill/dist/quill.snow.css'")) {
    content = content.replace(
      /import 'react-quill\/dist\/quill\.snow\.css'/,
      "import 'react-quill-new/dist/quill.snow.css'"
    );
    fs.writeFileSync(filePath, content);
  }
}

fixImports('client/src/pages/Admin/CreateBlog.jsx');
fixImports('client/src/pages/Admin/EditBlog.jsx');
