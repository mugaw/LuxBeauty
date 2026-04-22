const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

// 1. Rename _next to next
const oldPath = path.join(outDir, '_next');
const newPath = path.join(outDir, 'next');

if (fs.existsSync(oldPath)) {
  if (fs.existsSync(newPath)) {
    fs.rmSync(newPath, { recursive: true });
  }
  fs.renameSync(oldPath, newPath);
  console.log('Renamed _next to next');
}

// 2. Update all assets
const files = getAllFiles(outDir);
files.forEach(file => {
  if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.json')) {
    let content = fs.readFileSync(file, 'utf8');
    // Replace all instances of /_next/ with /next/
    // We search for /_next/ with various delimiters to be safe
    const updatedContent = content
      .replace(/\/_next\//g, '/next/')
      .replace(/\\\/_next\\\//g, '\\/next\\/')
      .replace(/%2F_next%2F/g, '%2Fnext%2F');

    if (content !== updatedContent) {
      fs.writeFileSync(file, updatedContent);
      console.log(`Updated paths in ${path.relative(outDir, file)}`);
    }
  }
});

console.log('Post-build underscore removal complete.');
