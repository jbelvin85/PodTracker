import { mtgThemes } from '../src/themes/mtgThemes.js'; // Note: .js extension for direct import in Node

const fs = require('fs');
const path = require('path');

const outputPath = path.resolve(__dirname, '../src/themes/generatedThemes.css');

let cssContent = '';

mtgThemes.forEach(theme => {
  cssContent += `/* ${theme.name} Theme */\n`;
  cssContent += `.${theme.value} {\n`;
  for (const [prop, value] of Object.entries(theme.colors)) {
    cssContent += `  ${prop}: ${value};\n`;
  }
  cssContent += `}\n\n`;
});

fs.writeFileSync(outputPath, cssContent);

console.log(`Generated themes CSS to ${outputPath}`);
