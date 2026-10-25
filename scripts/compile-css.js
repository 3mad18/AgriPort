const s = require('@tailwindcss/node');
const A = require('@tailwindcss/oxide');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

async function compileProject(name, cssRelativePath, baseRelativeDir, scanPattern, outputRelativePath) {
  try {
    const cssPath = path.resolve(rootDir, cssRelativePath);
    const baseDir = path.resolve(rootDir, baseRelativeDir);
    const outputPath = path.resolve(rootDir, outputRelativePath);

    if (!fs.existsSync(cssPath)) return;

    const css = fs.readFileSync(cssPath, 'utf8');
    const compiler = await s.compile(css, { base: baseDir, from: cssPath, onDependency: () => {} });
    const scanner = new A.Scanner({ sources: [{ base: baseDir, pattern: scanPattern, negated: false }] });
    const candidates = scanner.scan();
    const output = compiler.build([...candidates]);

    fs.writeFileSync(outputPath, output, 'utf8');
    console.log(`✓ Compiled CSS for ${name}: ${output.length} bytes -> ${outputRelativePath}`);
  } catch (err) {
    console.error(`Error compiling CSS for ${name}:`, err);
  }
}

async function main() {
  await compileProject('Main Web App', 'src/app/globals.css', '.', 'src/**/*', 'src/app/globals.compiled.css');
  await compileProject('Ops Suite', 'ops/src/app/globals.css', 'ops', 'src/**/*', 'ops/src/app/globals.compiled.css');
}

main();
