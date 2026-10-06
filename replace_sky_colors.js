const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function processFiles(dir) {
    walkDir(dir, function(filePath) {
        if (filePath.endsWith('.jsx')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let originalContent = content;
            
            content = content.replace(/#38BDF8/gi, '#FF9D4A');
            content = content.replace(/#0284C7/gi, '#FF6D00');
            content = content.replace(/rgba\(56,\s*189,\s*248/g, 'rgba(255, 157, 74');
            content = content.replace(/text-sky-500/g, 'text-accent');
            content = content.replace(/text-sky-400/g, 'text-accent/80');
            content = content.replace(/#0088FF/gi, '#FF6D00');
            
            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Updated: ' + filePath);
            }
        }
    });
}

processFiles('./client/src/pages');
processFiles('./client/src/components');
