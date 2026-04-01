/**
 * Build script — minify + obfuscate JS/CSS/HTML into dist/ folder.
 * Run: node build.js
 */
const esbuild = require('esbuild');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');

/* Clean dist */
if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });
fs.mkdirSync(DIST, { recursive: true });

/* 1. Bundle + minify + obfuscate JS */
esbuild.buildSync({
    entryPoints: ['js/app.js'],
    bundle: true,
    minify: true,
    format: 'esm',
    outfile: 'dist/js/app.min.js',
    target: ['es2020'],
    mangleProps: /^__/,
});

console.log('[build] JS bundled + minified');

/* 2. Concat + minify CSS */
const cssFiles = [
    'design-system/reset.css',
    'design-system/variables.css',
    'design-system/layout.css',
    'design-system/animations.css',
    ...findFiles('js/presentation/components', '.css'),
];

const cssContent = cssFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n');
fs.mkdirSync('dist/css', { recursive: true });
fs.writeFileSync('dist/css/styles.css', cssContent);

execSync('npx cleancss -o dist/css/styles.min.css dist/css/styles.css');
fs.unlinkSync('dist/css/styles.css');
console.log('[build] CSS concatenated + minified');

/* 3. Copy assets */
copyDir('assets', 'dist/assets');
console.log('[build] Assets copied');

/* 4. Create minified index.html */
const htmlSrc = fs.readFileSync('index.html', 'utf8');
const htmlDist = htmlSrc
    /* Replace all CSS links with single minified file */
    .replace(/<!-- Design System -->[\s\S]*?<!-- Component Styles -->[\s\S]*?footer\.css">/,
        '<link rel="stylesheet" href="css/styles.min.css">')
    /* Remove music-player, gift-modal, nav-dots CSS links */
    .replace(/<link rel="stylesheet"[^>]*music-player[^>]*>\n?/g, '')
    .replace(/<link rel="stylesheet"[^>]*gift-modal[^>]*>\n?/g, '')
    .replace(/<link rel="stylesheet"[^>]*nav-dots[^>]*>\n?/g, '')
    /* Replace JS module with bundled version */
    .replace('type="module" src="js/app.js"', 'src="js/app.min.js"');

fs.writeFileSync('dist/index.html', htmlDist);
execSync('npx html-minifier-terser --collapse-whitespace --remove-comments --minify-css --minify-js -o dist/index.html dist/index.html');
console.log('[build] HTML minified');

console.log('\n[build] Done! Deploy dist/ folder to Netlify.');

/* Helpers */
function findFiles(dir, ext) {
    const results = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) results.push(...findFiles(full, ext));
        else if (entry.name.endsWith(ext)) results.push(full);
    }
    return results;
}

function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const s = path.join(src, entry.name);
        const d = path.join(dest, entry.name);
        if (entry.isDirectory()) copyDir(s, d);
        else fs.copyFileSync(s, d);
    }
}
