import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nm = path.resolve(__dirname, '../node_modules');

if (fs.existsSync(nm)) {
  const dirs = fs.readdirSync(nm);
  for (const d of dirs) {
    if (d.startsWith('.') && !['.bin', '.package-lock.json', '.vite', '.vite-temp'].includes(d)) {
      const match = d.match(/^\.(.+)-[A-Za-z0-9_]{8}$/);
      if (match) {
        const pkgName = match[1];
        const targetPath = path.join(nm, pkgName);
        const sourcePath = path.join(nm, d);
        if (!fs.existsSync(targetPath)) {
          try {
            fs.symlinkSync(sourcePath, targetPath, 'junction');
            console.log(`Linked ${pkgName} -> ${d}`);
          } catch (e) {
            console.error(`Failed to link ${pkgName}:`, e.message);
          }
        }
      }
    }
  }
}
