import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Icon sizes for PWA
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create a simple icon programmatically
function createIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#3B82F6';
  ctx.fillRect(0, 0, size, size);

  // Outer circle
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.23, 0, 2 * Math.PI);
  ctx.fill();

  // Middle circle
  ctx.fillStyle = '#3B82F6';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.16, 0, 2 * Math.PI);
  ctx.fill();

  // Inner circle
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.08, 0, 2 * Math.PI);
  ctx.fill();

  // Center dot
  ctx.fillStyle = '#3B82F6';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.04, 0, 2 * Math.PI);
  ctx.fill();

  // Cross lines
  ctx.strokeStyle = 'white';
  ctx.lineWidth = size * 0.016;
  ctx.lineCap = 'round';

  // Vertical line
  ctx.beginPath();
  ctx.moveTo(size / 2, size * 0.27);
  ctx.lineTo(size / 2, size * 0.34);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(size / 2, size * 0.66);
  ctx.lineTo(size / 2, size * 0.73);
  ctx.stroke();

  // Horizontal line
  ctx.beginPath();
  ctx.moveTo(size * 0.27, size / 2);
  ctx.lineTo(size * 0.34, size / 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(size * 0.66, size / 2);
  ctx.lineTo(size * 0.73, size / 2);
  ctx.stroke();

  return canvas;
}

// Generate all icons
function generateIcons() {
  const iconsDir = path.join(__dirname, '../client/public/icons');

  // Ensure icons directory exists
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  iconSizes.forEach((size) => {
    const canvas = createIcon(size);
    const buffer = canvas.toBuffer('image/png');
    const filename = `icon-${size}x${size}.png`;
    const filepath = path.join(iconsDir, filename);

    fs.writeFileSync(filepath, buffer);
    console.log(`Generated ${filename}`);
  });

  console.log('All PWA icons generated successfully!');
}

generateIcons();
