const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('./client/src/pages', function(filePath) {
    if (filePath.endsWith('.jsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        // Replace background classes
        content = content.replace(/bg-primary-dark/g, 'bg-[#E85D00]');
        content = content.replace(/bg-primary(\/\d+)?/g, 'bg-accent');
        content = content.replace(/bg-\\[#00A6FF\\](\/\d+)?/g, 'bg-accent');
        content = content.replace(/bg-\\[#0088D6\\]/g, 'bg-[#E85D00]');
        content = content.replace(/hover:bg-primary(\/\d+)?/g, 'hover:bg-accent');
        content = content.replace(/hover:bg-\\[#00A6FF\\](\/\d+)?/g, 'hover:bg-accent');
        content = content.replace(/dark:bg-primary(\/\d+)?/g, 'dark:bg-accent');
        content = content.replace(/dark:bg-\\[#00A6FF\\](\/\d+)?/g, 'dark:bg-accent');
        
        // Replace border/ring/shadow classes for buttons
        content = content.replace(/border-primary(\/\d+)?/g, 'border-accent');
        content = content.replace(/hover:border-primary(\/\d+)?/g, 'hover:border-accent');
        content = content.replace(/dark:border-primary(\/\d+)?/g, 'dark:border-accent');
        content = content.replace(/border-\\[#00A6FF\\](\/\d+)?/g, 'border-accent');
        content = content.replace(/hover:border-\\[#00A6FF\\](\/\d+)?/g, 'hover:border-accent');
        
        content = content.replace(/ring-primary(\/\d+)?/g, 'ring-accent');
        content = content.replace(/focus-visible:ring-\\[#00A6FF\\]/g, 'focus-visible:ring-accent');
        
        content = content.replace(/shadow-primary(\/\d+)?/g, 'shadow-accent');
        
        // Replace text color if it's primary or blue
        content = content.replace(/text-primary(\/\d+)?/g, 'text-accent');
        content = content.replace(/hover:text-primary(\/\d+)?/g, 'hover:text-accent');
        content = content.replace(/dark:text-primary(\/\d+)?/g, 'dark:text-accent');
        content = content.replace(/text-\\[#00A6FF\\](\/\d+)?/g, 'text-accent');
        content = content.replace(/hover:text-\\[#00A6FF\\](\/\d+)?/g, 'hover:text-accent');
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated: ' + filePath);
        }
    }
});
