const fs = require('fs');
const file = 'client/src/pages/Admin/Drafts.jsx';
let c = fs.readFileSync(file, 'utf8');
let o = c;
c = c.replace(/className="admin-table-wrapper admin-scrollbar !overflow-visible"/g, 'className="admin-table-wrapper admin-scrollbar"');
if(c !== o) { 
    fs.writeFileSync(file, c); 
    console.log('Fixed ' + file); 
}
