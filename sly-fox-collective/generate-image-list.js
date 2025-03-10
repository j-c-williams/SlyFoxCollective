const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'src/assets/gallery_images');
const outputFile = path.join(__dirname, 'src/assets/image-list.json');

fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter for image files
  const imageFiles = files.filter(file =>
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
  );

  // Create paths relative to the 'assets' folder for Angular to access
  const imagePaths = imageFiles.map(file =>
    `assets/gallery_images/${file}`
  );

  fs.writeFileSync(outputFile, JSON.stringify(imagePaths, null, 2));

  console.log(`✅ Generated list of ${imagePaths.length} images in ${outputFile}`);
});
