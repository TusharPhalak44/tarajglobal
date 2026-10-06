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
        
        // Replace blue gradient background for Start a Conversation buttons
        content = content.replace(/linear-gradient\(90deg, #00A6FF 0%, #0080CC 100%\)/g, "linear-gradient(90deg, #FF6D00 0%, #E85D00 100%)");
        
        // Replace blue box shadow
        content = content.replace(/rgba\(0,166,255,0\.3\)/g, "rgba(255,109,0,0.3)");
        
        // Replace focus ring if remaining
        content = content.replace(/focus-visible:ring-\\[#00A6FF\\]/g, "focus-visible:ring-accent");
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated: ' + filePath);
        }
    }
});
