// Scans project_render/ and writes project_render/index.json, a manifest of
// project folder names. This site is static (GitHub Pages), so the browser
// has no way to list a directory itself — run this script after adding or
// removing a project folder, then commit the updated index.json.
//
//   node generate-project-index.js

const fs = require('fs');
const path = require('path');

const projectRenderDir = path.join(__dirname, 'project_render');
const outputFile = path.join(projectRenderDir, 'index.json');

const folders = fs.readdirSync(projectRenderDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();

fs.writeFileSync(outputFile, JSON.stringify(folders, null, 2) + '\n');
console.log(`Wrote ${folders.length} project folder(s) to ${path.relative(__dirname, outputFile)}`);
