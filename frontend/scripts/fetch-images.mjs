import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

// SSL Bypass for the download since we had self-signed cert warnings previously
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manifest defining source path on the live site relative to uploads/ and local destination path
const MANIFEST = [
  // HERO SLIDES
  { src: '/2025/06/TechnoSales-ABB-Motors.jpg', dest: 'images/hero/abb-motors.jpg' },
  { src: '/2025/06/TechnoSales-Simens-Switchgear.jpg', dest: 'images/hero/siemens-switchgear.jpg' },
  { src: '/2025/06/TechnoSales-PolyCab-Cables-Wires-1.jpg', dest: 'images/hero/polycab-cables.jpg' },
  { src: '/2025/06/TechnoSales-FRP-Products.jpg', dest: 'images/hero/frp-products.jpg' },
  { src: '/2025/06/TechnoSales-Motors.jpg', dest: 'images/hero/motors.jpg' },

  // PRODUCT LINES
  { src: '/2025/06/01.-ABB-Motors_Updated.jpg', dest: 'images/categories/industrial-motors.jpg' },
  { src: '/2025/06/02.-SIEMENS-Switchgears_Updated.jpg', dest: 'images/categories/siemens-switchgears.jpg' },
  { src: '/2025/06/03.-Polycab-Wires-Cables_Updated.jpg', dest: 'images/categories/polycab-cables.jpg' },
  { src: '/2025/06/04.-FRP-Products_Updated.jpg', dest: 'images/categories/frp-products.jpg' },

  // PRODUCT CARDS
  { src: '/2025/06/TechnoSales-SIEMENS-Motors.jpg', dest: 'images/products/siemens-motors.jpg' },
  { src: '/2025/06/TechnoSales-CG-Motors.jpg', dest: 'images/products/cg-motors.jpg' },
  { src: '/2025/06/TechnoSales-ABB-Motors.jpg', dest: 'images/products/abb-motors.jpg' },
  { src: '/2025/06/TechnoSales-Switchgears.jpg', dest: 'images/products/siemens-switchgears.jpg' },
  { src: '/2025/06/TechnoSales-Polycab-Cables.jpg', dest: 'images/products/polycab-cables.jpg' },
  { src: '/2025/06/TechnoSales-FRP-Products.jpg', dest: 'images/products/frp-products.jpg' },

  // BRAND LOGOS
  { src: '/2025/06/Logo_SIEMENS.png', dest: 'images/brands/siemens.png' },
  { src: '/2025/06/Logo_CG-Power.png', dest: 'images/brands/cg-power.png' },
  { src: '/2025/06/Logo_ABB.png', dest: 'images/brands/abb.png' },
  { src: '/2025/06/Logo_Polycab.png', dest: 'images/brands/polycab.png' },
  { src: '/2025/06/Logo_Innomotics.png', dest: 'images/brands/innomotics.png' },

  // SUPPORTING PHOTOS
  { src: '/2025/06/Home-Section-1_UPDATED.jpg', dest: 'images/sections/about.jpg' },
  { src: '/2025/06/Home-Page-Image_Why-Choose-Us.jpg', dest: 'images/sections/why-choose-us.jpg' },
  { src: '/2025/06/Home-Page-Image_Milestone.jpg', dest: 'images/sections/milestone.jpg' },
  { src: '/2025/06/Your-Industrial.jpg', dest: 'images/sections/industrial.jpg' },
  { src: '/2025/07/FAQ-Image.jpg', dest: 'images/sections/faq.jpg' },
  { src: '/2025/07/Box-Shape-02.png', dest: 'images/sections/box-shape-02.png' },
  { src: '/2025/06/Home-Page-Slider-Attached.png', dest: 'images/sections/slider-attached.png' },

  // BLOG THUMBNAILS
  { src: '/2026/08/Techno-Sales-Blog-August-Blog-1.jpg', dest: 'images/blog/frp-gratings-cable-trays.jpg' },
  { src: '/2026/07/Techno-Sales-Blog-July-Blog-3.jpg', dest: 'images/blog/cg-vs-siemens-motors.jpg' },
  { src: '/2026/07/Techno-Sales-Blog-July-Blog-2.jpg', dest: 'images/blog/siemens-switchgear-gujarat.jpg' },
  { src: '/2026/07/Techno-Sales-Blog-July-Blog-1.jpg', dest: 'images/blog/polycab-industrial-cables.jpg' },
  { src: '/2026/06/Techno-Sales-Blog-June_Blog-1-scaled.jpg', dest: 'images/blog/industrial-motors-explained.jpg' },
  { src: '/2026/06/Techno-Sales-Blog-11.jpg', dest: 'images/blog/frp-gratings-guide.jpg' },

  // PEOPLE/AVATARS
  { src: '/2025/07/atul1.jpg', dest: 'images/people/atul.jpg' },
  { src: '/2025/07/mukesh1.jpg', dest: 'images/people/mukesh.jpg' },
  { src: '/2025/07/Sneha-joshi.jpg', dest: 'images/people/sneha.jpg' },
  { src: '/2025/07/priya-desai.jpg', dest: 'images/people/priya.jpg' },
  { src: '/2025/07/Amit-Tiwari.png', dest: 'images/people/amit.png' },
  { src: '/2025/07/Abhay.png', dest: 'images/people/abhay.png' },

  // TEAM
  { src: '/2025/07/Our-Team_Manish-Patel.png', dest: 'images/team/manish-patel.png' },
  { src: '/2025/06/Our-Team_Hemant-Patel.jpg', dest: 'images/team/hemant-patel.jpg' },

  // BRANDING
  { src: '/2024/07/Techno-Sales-Header-Logo-White.png', dest: 'images/brand/logo-white.png' },
  { src: '/2024/07/Techno-Sales-01-1.png', dest: 'images/brand/logo-dark.png' },
  { src: '/2025/07/Techno-Sales-Responsive-Logo.png', dest: 'images/brand/logo-responsive.png' },
  { src: '/2025/06/FavIcon.png', dest: 'images/brand/favicon.png' }
];

const BASE_URLS = [
  'https://cdn.technosales.in/wp-content/uploads',
  'https://technosales.in/wp-content/uploads'
];
const publicDir = path.join(__dirname, '../public');

// Attempt to load sharp for WebP conversion
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch (e) {
  console.log('sharp library not found. WebP conversion will be skipped. Run: npm install sharp');
}

async function downloadFile(srcPath, destPath) {
  const fullDestPath = path.join(publicDir, destPath);
  fs.mkdirSync(path.dirname(fullDestPath), { recursive: true });

  for (const baseUrl of BASE_URLS) {
    const url = `${baseUrl}${srcPath}`;
    try {
      await new Promise((resolve, reject) => {
        https.get(url, (res) => {
          if (res.statusCode !== 200) {
            reject(new Error(`Status Code: ${res.statusCode}`));
            return;
          }
          const fileStream = fs.createWriteStream(fullDestPath);
          res.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            resolve();
          });
        }).on('error', reject);
      });
      console.log(`✓ Downloaded: ${srcPath} -> ${destPath}`);

      // WebP conversion if sharp is active
      if (sharp) {
        const webpDestPath = fullDestPath.substring(0, fullDestPath.lastIndexOf('.')) + '.webp';
        await sharp(fullDestPath).webp({ quality: 80 }).toFile(webpDestPath);
        console.log(`  └─ WebP generated: ${destPath.substring(0, destPath.lastIndexOf('.'))}.webp`);
      }
      return true;
    } catch (err) {
      // Continue to next backup URL if this one fails
    }
  }

  console.error(`✗ Failed to download: ${srcPath}`);
  return false;
}

async function run() {
  console.log('Starting image downloader...');
  let success = 0;
  for (const entry of MANIFEST) {
    const ok = await downloadFile(entry.src, entry.dest);
    if (ok) success++;
  }
  console.log(`Image download finished. Successfully fetched ${success}/${MANIFEST.length} files.`);
}

run();
