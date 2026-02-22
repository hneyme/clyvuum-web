const sharp = require('sharp');
const fs = require('fs');

const images = [
  'public/illustration-slack-1.png',
  'public/illustration-slack-2.png'
];

(async () => {
  for (const img of images) {
    if (!fs.existsSync(img)) {
      console.warn('Skipping, not found:', img);
      continue;
    }
    const out = img.replace('.png', '.opt.png');
    try {
      await sharp(img)
        .png({ compressionLevel: 9, progressive: false, adaptiveFiltering: true })
        .toFile(out);
      // replace original with optimized
      fs.renameSync(out, img);
      console.log('Optimized', img);
    } catch (err) {
      console.error('Failed to optimize', img, err);
    }
  }
})();
