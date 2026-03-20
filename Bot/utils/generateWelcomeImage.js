const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const getAllFiles = require('../utils/getAllFiles'); // 👈 Reemplaza a 'fs'

const IMAGES_PATH = path.join(__dirname, '../../assets/images/welcome-images');

// ✅ Simplificada — getAllFiles ya hace el readdirSync y retorna paths completos
function getWelcomeImages() {
    try {
        return getAllFiles(IMAGES_PATH)
            .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));
    } catch {
        return [];
    }
}

async function generateWelcomeImage(guildMember, color) {
    const canvas = createCanvas(800, 300);
    const ctx = canvas.getContext('2d');
    const imageFiles = getWelcomeImages();

    if (imageFiles.length > 0) {
        const randomFile = imageFiles[Math.floor(Math.random() * imageFiles.length)];
        const bg = await loadImage(randomFile); // ✅ Ya es path completo, sin path.join
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = color.startsWith('#') ? color : '#FF0000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // ... resto igual
}

module.exports = generateWelcomeImage;