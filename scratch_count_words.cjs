const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'data', 'guides');
const files = fs.readdirSync(dir);

console.log('DSA Guide Word Counts:');
console.log('====================');

files.forEach(file => {
  if (file.endsWith('.ts')) {
    const filePath = path.join(dir, file);
    const contentText = fs.readFileSync(filePath, 'utf-8');
    
    // Extract the string literal inside content
    const match = contentText.match(/export const content = `([\s\S]*)`;/);
    if (match) {
      const markdown = match[1];
      // Count words: split by whitespace
      const words = markdown.trim().split(/\s+/).filter(w => w.length > 0);
      console.log(`${file}: ${words.length} words (${fs.statSync(filePath).size} bytes)`);
    } else {
      console.log(`${file}: Failed to parse content string`);
    }
  }
});
