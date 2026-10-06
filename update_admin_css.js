const fs = require('fs');

let content = fs.readFileSync('client/src/styles/admin.css', 'utf8');

// Dark Mode Hex
content = content.replace(/#00A6FF/gi, '#FF6D00');
content = content.replace(/#26B4FF/gi, '#FF8A00');

// Light Mode Hex
content = content.replace(/#0088DB/gi, '#E85D00');
content = content.replace(/#0099FF/gi, '#FF8A00');

// RGB values
content = content.replace(/rgba\(0,\s*166,\s*255/g, 'rgba(255, 109, 0');

fs.writeFileSync('client/src/styles/admin.css', content, 'utf8');
