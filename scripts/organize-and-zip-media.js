const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// 2-Word Arabic Folder Names
const FOLDERS = {
  signage: 'لوحات إعلانية',
  contracting: 'مقاولات عامة',
  glass: 'واجهات زجاجية',
  interiors: 'تشطيب ديكور',
  chipboard: 'بديل خشب',
  shades: 'مظلات سواتر',
  stickers: 'استيكرات سيارات',
  hoarding: 'تسوير مشاريع',
  exhibitions: 'تجهيز معارض',
  safety: 'أنظمة سلامة',
  cctv: 'كاميرات مراقبة',
  partners: 'شعارات شركاء',
  licenses: 'تراخيص رسمية',
  blog: 'مقالات مدونة',
  brand: 'هوية بصرية',
  letterTypes: 'أنواع لوحات'
};

const desktopDir = path.join('C:', 'Users', 'WIN-11', 'Desktop', 'صور_وفيديوهات_اعمال_همم_غيم');
const localOrganizedDir = path.join(__dirname, '..', 'صور وفيديوهات اعمال همم غيم');

console.log('Target Desktop Folder:', desktopDir);

// Ensure directories exist
function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

// Copy file if exists
let copiedCount = 0;
const copiedSet = new Set();

function copyMedia(sourceRelPath, targetFolderKey) {
  if (!sourceRelPath) return;
  const cleanRel = sourceRelPath.startsWith('/') ? sourceRelPath.slice(1) : sourceRelPath;
  const fullSrc = path.join(__dirname, '..', 'public', cleanRel);

  if (!fs.existsSync(fullSrc) || !fs.statSync(fullSrc).isFile()) return;

  const fileName = path.basename(fullSrc);
  const targetSubfolderName = FOLDERS[targetFolderKey] || FOLDERS.signage;

  const destDesktop = path.join(desktopDir, targetSubfolderName, fileName);
  const destLocal = path.join(localOrganizedDir, targetSubfolderName, fileName);

  ensureDir(path.dirname(destDesktop));
  ensureDir(path.dirname(destLocal));

  fs.copyFileSync(fullSrc, destDesktop);
  fs.copyFileSync(fullSrc, destLocal);

  copiedCount++;
  copiedSet.add(fileName);
}

// 1. Organize all portfolio projects (both images and videos)
console.log('Processing portfolio projects...');
db.portfolio.forEach(p => {
  const catKey = p.category;
  copyMedia(p.src, catKey);
  copyMedia(p.poster, catKey);
  copyMedia(p.image, catKey);
  if (p.gallery) {
    p.gallery.forEach(g => {
      const src = typeof g === 'string' ? g : g.src;
      const poster = typeof g === 'object' ? g.poster : null;
      copyMedia(src, catKey);
      copyMedia(poster, catKey);
    });
  }
});

// 2. Organize services gallery media
console.log('Processing service galleries...');
db.services.forEach(s => {
  const catKey = s.id;
  copyMedia(s.coverImage, catKey);
  copyMedia(s.image, catKey);
  if (s.gallery) {
    s.gallery.forEach(g => {
      const src = typeof g === 'string' ? g : g.src;
      const poster = typeof g === 'object' ? g.poster : null;
      copyMedia(src, catKey);
      copyMedia(poster, catKey);
    });
  }
});

// 3. Organize Partners & Clients Logos
console.log('Processing partners...');
const partnersDir = path.join(__dirname, '..', 'public', 'assets', 'images', 'partners');
if (fs.existsSync(partnersDir)) {
  fs.readdirSync(partnersDir).forEach(f => {
    copyMedia(path.join('assets', 'images', 'partners', f), 'partners');
  });
}
const fanPartnersDir = path.join(__dirname, '..', 'public', 'assets', 'images', 'fan-partners');
if (fs.existsSync(fanPartnersDir)) {
  fs.readdirSync(fanPartnersDir).forEach(f => {
    copyMedia(path.join('assets', 'images', 'fan-partners', f), 'partners');
  });
}

// 4. Organize Licenses & Certificates (docs)
console.log('Processing official licenses & documents...');
const docsDir = path.join(__dirname, '..', 'public', 'assets', 'images', 'docs');
if (fs.existsSync(docsDir)) {
  fs.readdirSync(docsDir).forEach(f => {
    copyMedia(path.join('assets', 'images', 'docs', f), 'licenses');
  });
}

// 5. Organize Blog Articles images
console.log('Processing blog images...');
const blogsDir = path.join(__dirname, '..', 'public', 'assets', 'images', 'fan-blogs');
if (fs.existsSync(blogsDir)) {
  fs.readdirSync(blogsDir).forEach(f => {
    copyMedia(path.join('assets', 'images', 'fan-blogs', f), 'blog');
  });
}

// 6. Organize Brand & Logos
console.log('Processing brand identity...');
['logo.svg', 'logo-light.svg', 'favicon.svg'].forEach(f => {
  copyMedia(path.join('assets', 'images', f), 'brand');
});
const brandDir = path.join(__dirname, '..', 'public', 'assets', 'images', 'brand');
if (fs.existsSync(brandDir)) {
  fs.readdirSync(brandDir).forEach(f => {
    copyMedia(path.join('assets', 'images', 'brand', f), 'brand');
  });
}

// 7. Organize Letter Types (3D Signage Types)
console.log('Processing letter types...');
const lettersDir = path.join(__dirname, '..', 'public', 'assets', 'images', 'letter-types');
if (fs.existsSync(lettersDir)) {
  fs.readdirSync(lettersDir).forEach(f => {
    copyMedia(path.join('assets', 'images', 'letter-types', f), 'letterTypes');
  });
}

// 8. Organize any remaining public videos directly
console.log('Processing video files...');
const videosDir = path.join(__dirname, '..', 'public', 'assets', 'videos');
if (fs.existsSync(videosDir)) {
  fs.readdirSync(videosDir).forEach(f => {
    if (f.endsWith('.mp4') || f.endsWith('.webm')) {
      let target = 'contracting';
      if (f.includes('hoarding') || f.includes('fence')) target = 'hoarding';
      else if (f.includes('finishing') || f.includes('interior')) target = 'interiors';
      copyMedia(path.join('assets', 'videos', f), target);
    }
  });
}

// 9. Include raw WhatsApp images if any into appropriate folders
console.log('Processing raw whatsapp photos...');
const rawSourceDir = path.join(__dirname, '..', 'صور وفيديوهات اعمال همم غيم');
if (fs.existsSync(rawSourceDir)) {
  const rootFiles = fs.readdirSync(rawSourceDir, { withFileTypes: true });
  rootFiles.forEach(rf => {
    if (rf.isFile() && (rf.name.endsWith('.jpeg') || rf.name.endsWith('.jpg') || rf.name.endsWith('.png'))) {
      const srcFile = path.join(rawSourceDir, rf.name);
      const destDesktop = path.join(desktopDir, FOLDERS.interiors, rf.name);
      ensureDir(path.dirname(destDesktop));
      fs.copyFileSync(srcFile, destDesktop);
      copiedCount++;
    }
  });
}

console.log('Total files copied and organized:', copiedCount);

// Summary of organized folders on Desktop
console.log('\n--- Desktop Organization Summary ---');
const subfolders = fs.readdirSync(desktopDir);
subfolders.forEach(sf => {
  const sfPath = path.join(desktopDir, sf);
  const count = fs.readdirSync(sfPath).length;
  console.log(`- ${sf}: ${count} ملف`);
});

// Compress to ZIP using tar.exe (native in Windows)
const zipDesktop = path.join('C:', 'Users', 'WIN-11', 'Desktop', 'صور_وفيديوهات_اعمال_همم_غيم.zip');
const zipProject = path.join(__dirname, '..', 'صور_وفيديوهات_اعمال_همم_غيم.zip');

console.log('\nCompressing into ZIP archive...');
const { spawnSync } = require('child_process');

[zipDesktop, zipProject].forEach(zipPath => {
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
  const res = spawnSync('tar.exe', ['-a', '-c', '-f', zipPath, '-C', desktopDir, '.']);
  if (res.error) {
    console.error('Error running tar:', res.error);
  } else if (fs.existsSync(zipPath)) {
    const sizeMb = (fs.statSync(zipPath).size / (1024 * 1024)).toFixed(2);
    console.log(`SUCCESS: Created ZIP at ${zipPath} (${sizeMb} MB)`);
  }
});
