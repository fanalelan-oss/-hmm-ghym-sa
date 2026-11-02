const fs = require('fs');
const path = require('path');

function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(source)) return;

  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const items = fs.readdirSync(source, { withFileTypes: true });
  for (const item of items) {
    const srcPath = path.join(source, item.name);
    const destPath = path.join(target, item.name);

    if (item.isDirectory()) {
      copyFolderRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  const root = process.cwd();
  const standaloneDir = path.join(root, '.next', 'standalone');

  if (fs.existsSync(standaloneDir)) {
    console.log('[Post-Build] Standalone directory found. Ensuring public and static assets are copied...');

    // 1. Copy public -> .next/standalone/public
    const srcPublic = path.join(root, 'public');
    const targetPublic = path.join(standaloneDir, 'public');
    copyFolderRecursiveSync(srcPublic, targetPublic);
    console.log('[Post-Build] Successfully synced public -> .next/standalone/public');

    // 2. Copy .next/static -> .next/standalone/.next/static
    const srcStatic = path.join(root, '.next', 'static');
    const targetStatic = path.join(standaloneDir, '.next', 'static');
    copyFolderRecursiveSync(srcStatic, targetStatic);
    console.log('[Post-Build] Successfully synced .next/static -> .next/standalone/.next/static');
  } else {
    console.log('[Post-Build] No standalone directory found, skipping standalone copy.');
  }
} catch (err) {
  console.warn('[Post-Build] Non-fatal error during asset copy:', err.message);
}
