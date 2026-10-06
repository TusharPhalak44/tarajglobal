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
        
        // Fix badges and wrappers
        content = content.replace(/bg-accent dark:bg-accent text-accent/g, 'bg-accent/10 dark:bg-accent/20 text-accent');
        
        // Fix active tabs
        content = content.replace(/bg-accent rounded-t-lg/g, 'bg-accent/10 rounded-t-lg');
        
        // Fix icon wrappers
        content = content.replace(/bg-accent dark:bg-accent flex/g, 'bg-accent/10 dark:bg-accent/20 flex');
        
        // Fix hover buttons (e.g. edit/delete buttons)
        content = content.replace(/hover:bg-accent dark:bg-accent rounded-lg/g, 'hover:bg-accent/10 dark:hover:bg-accent/20 rounded-lg');
        
        // Fix inline code
        content = content.replace(/bg-accent dark:bg-accent px-1/g, 'bg-accent/10 dark:bg-accent/20 px-1');
        
        // Fix other badges
        content = content.replace(/bg-accent dark:bg-accent font-mono/g, 'bg-accent/10 dark:bg-accent/20 font-mono');
        
        // Fix CMSNavbar add button
        content = content.replace(/bg-accent dark:bg-accent hover:bg-accent dark:bg-accent px-3/g, 'bg-accent/10 dark:bg-accent/20 hover:bg-accent/20 dark:hover:bg-accent/30 px-3');

        // General fallback if they still have solid bg-accent and text-accent next to each other
        content = content.replace(/bg-accent dark:bg-accent([^>]*?)text-accent/g, 'bg-accent/10 dark:bg-accent/20-accent');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Fixed: ' + filePath);
        }
    }
});
