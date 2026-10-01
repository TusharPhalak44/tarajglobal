
const fs = require('fs');

function fixValidation() {
  let p1 = 'client/src/pages/Admin/CreateBlog.jsx';
  let c1 = fs.readFileSync(p1, 'utf8');
  c1 = c1.replace(
    /if \(!createForm\.content\.trim\(\)\) \{/,
    "if (!createForm.content || !createForm.content.trim() || createForm.content === '<p><br></p>') {"
  );
  fs.writeFileSync(p1, c1);

  let p2 = 'client/src/pages/Admin/EditBlog.jsx';
  let c2 = fs.readFileSync(p2, 'utf8');
  c2 = c2.replace(
    /if \(!editForm\.content\.trim\(\)\) \{/,
    "if (!editForm.content || !editForm.content.trim() || editForm.content === '<p><br></p>') {"
  );
  fs.writeFileSync(p2, c2);
}

fixValidation();
