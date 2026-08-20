import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsDist = path.resolve(__dirname, '../node_modules/@untitledui/icons/dist');

if (fs.existsSync(iconsDist)) {
  const files = fs.readdirSync(iconsDist).filter(f => f.endsWith('.js') && f !== 'index.js');
  const jsLines = files.map(f => {
    const name = f.replace('.js', '');
    return `export { ${name} } from "./${name}.js";`;
  });
  const mjsLines = files.map(f => {
    const name = f.replace('.js', '');
    return `export { ${name} } from "./${name}.mjs";`;
  });
  fs.writeFileSync(path.join(iconsDist, 'index.js'), jsLines.join('\n'), 'utf8');
  fs.writeFileSync(path.join(iconsDist, 'index.mjs'), mjsLines.join('\n'), 'utf8');
  console.log(`Generated ${files.length} icon exports in ${iconsDist}`);
} else {
  console.error('Icons dist folder not found at', iconsDist);
}
