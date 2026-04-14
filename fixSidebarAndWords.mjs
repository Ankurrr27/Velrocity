import fs from 'fs';
import path from 'path';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  let modified = false;

  const originalContent = content;
  content = content.replace(/operators?/g, (match) => {
    if (match === 'operators') return 'users';
    if (match === 'operator') return 'user';
    return match;
  });
  content = content.replace(/Operators?/g, (match) => {
    if (match === 'Operators') return 'Users';
    if (match === 'Operator') return 'User';
    return match;
  });
  content = content.replace(/OPERATORS?/g, (match) => {
    if (match === 'OPERATORS') return 'USERS';
    if (match === 'OPERATOR') return 'USER';
    return match;
  });


  if (filePath.replace(/\\/g, '/').endsWith('components/Sidebar.tsx')) {
    content = content.replace(/w-\[72px\]/g, 'w-16');
    content = content.replace(/w-11 h-11/g, 'w-10 h-10');
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

walkDir('./src/app');
walkDir('./src/components');
console.log('Words and Sidebar fixed.');
