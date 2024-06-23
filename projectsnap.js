const fs = require('fs');
const path = require('path');
const ignore = require('ignore');
const readline = require('readline');

// Configuration
const rootDir = './';
const outputFile = 'project_snapshot_output.txt';
const allowedExtensions = ['.php', '.js', '.css', '.html', '.json', '.txt']; // Add or remove as needed
const ignoreFiles = [
  'projectsnap.js',
  'node_modules',
  'package.json',
  'package-lock.json',
  '.git',
  'project_snapshot_output.txt' // Ignore the output file itself
];

// Read .gitignore and create an ignore filter
const gitignorePath = path.join(rootDir, '.gitignore');
const ig = ignore().add(ignoreFiles);
if (fs.existsSync(gitignorePath)) {
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  ig.add(gitignoreContent);
}

function isIgnored(filePath) {
  const relativePath = path.relative(rootDir, filePath);
  return ig.ignores(relativePath);
}

function generateDirectoryTree(dir, prefix = '') {
  let tree = '';
  const files = fs.readdirSync(dir);

  files.forEach((file, index) => {
    const filePath = path.join(dir, file);
    if (isIgnored(filePath)) return;

    const isLast = index === files.length - 1;
    const marker = isLast ? '└── ' : '├── ';
    const newPrefix = prefix + (isLast ? '    ' : '│   ');

    tree += prefix + marker + file + '\n';

    if (fs.statSync(filePath).isDirectory()) {
      tree += generateDirectoryTree(filePath, newPrefix);
    }
  });

  return tree;
}

function compileProject(dir, output) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    if (isIgnored(filePath)) continue;

    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      compileProject(filePath, output);
    } else if (stat.isFile() && allowedExtensions.includes(path.extname(file))) {
      const content = fs.readFileSync(filePath, 'utf8');
      output.write(`\n\n--- File: ${filePath} ---\n\n`);
      output.write(content);
    }
  }
}

function promptUser(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.toLowerCase() === 'y');
    });
  });
}

async function main() {
  const includeDirectoryStructure = await promptUser('Include directory structure? (y/n): ');
  const includeFileContents = await promptUser('Include file contents? (y/n): ');

  const outputStream = fs.createWriteStream(outputFile);
  outputStream.write('Project Code Transcript\n\n');

  if (includeDirectoryStructure) {
    outputStream.write('Directory Structure:\n\n');
    outputStream.write(generateDirectoryTree(rootDir));
    outputStream.write('\n');
  }

  if (includeFileContents) {
    outputStream.write('File Contents:\n');
    compileProject(rootDir, outputStream);
  }

  outputStream.end(() => {
    console.log(`Transcript compiled to ${outputFile}`);
  });
}

main();