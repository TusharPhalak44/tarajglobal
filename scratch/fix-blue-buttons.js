const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('./client/src', function(filePath) {
    if (filePath.endsWith('.jsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        // Replace blue background color with orange
        content = content.replace(/'#1E3A8A'/g, "'#FF6D00'");
        // Also update box shadows that were blue (rgba(30,58,138,...)) to orange (rgba(255,109,0,...))
        content = content.replace(/rgba\(30,58,138,/g, "rgba(255,109,0,");

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Fixed blue button to orange in: ' + filePath);
        }
    }
});
