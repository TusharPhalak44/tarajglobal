const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('./client/src/pages/Admin', function(filePath) {
    if (filePath.endsWith('.jsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        // Replace blue hex codes
        content = content.replace(/#00A6FF/gi, '#FF6D00');
        content = content.replace(/#0077CC/gi, '#E85D00');
        
        // Replace tailwind blue classes
        content = content.replace(/blue-600/g, '[#FF6D00]');
        content = content.replace(/blue-500/g, '[#FF6D00]');
        content = content.replace(/blue-400/g, '[#FF6D00]');
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated: ' + filePath);
        }
    }
});
