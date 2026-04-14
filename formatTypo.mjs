import fs from 'fs';
import path from 'path';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace various small uppercase tags with a standard label-elite
  content = content.replace(/text-\[[89]px\] font-[a-z]+ uppercase tracking-(?:widest|\[.*?\])/g, 'label-elite uppercase');
  content = content.replace(/text-\[10px\] font-[a-z]+ uppercase tracking-(?:widest|\[.*?\])/g, 'label-elite uppercase');
  content = content.replace(/text-\[11px\] font-[a-z]+ uppercase tracking-(?:widest|wider|\[.*?\])/g, 'label-elite uppercase');

  // Replace standard small texts
  content = content.replace(/text-\[11px\]/g, 'text-xs');
  content = content.replace(/text-\[13px\]/g, 'text-sm');
  content = content.replace(/text-\[15px\]/g, 'text-base');
  
  // Normalize huge font black to font-bold to keep things more professional and aligned
  content = content.replace(/font-black/g, 'font-bold');

  fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

walkDir('./src/app');
walkDir('./src/components');
console.log('Typography formats standardized.');
