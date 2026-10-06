const fs = require('fs');
let content = fs.readFileSync('client/src/styles/admin.css', 'utf8');

// Replace remaining blue hex in gradients
content = content.replace(/#0077CC/gi, '#E85D00');
content = content.replace(/#1AB0FF/gi, '#FF9D4A');

fs.writeFileSync('client/src/styles/admin.css', content, 'utf8');
