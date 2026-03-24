const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const getAllFiles = require('../utils/getAllFiles');

const IMAGES_PATH = path.join(__dirname, '../../assets/images/welcome-images');

function getWelcomeImages() {
    try {
        return getAllFiles(IMAGES_PATH)
            .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));
    } catch {
        return [];
    }
}

async function generateWelcomeImage(guildMember, color) {
    const imageFiles = getWelcomeImages();

    // 1️⃣ Cargar fondo PRIMERO para obtener sus dimensiones reales
    let bgImage = null;
    let canvasWidth = 800;   // fallback si no hay imagen
    let canvasHeight = 300;

    if (imageFiles.length > 0) {
        const randomFile = imageFiles[Math.floor(Math.random() * imageFiles.length)];
        bgImage = await loadImage(randomFile);
        canvasWidth = bgImage.width;    // 👈 dimensiones reales del fondo
        canvasHeight = bgImage.height;
    }

    // 2️⃣ Crear el canvas con las dimensiones del fondo
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    // Fondo
    if (bgImage) {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = color.startsWith('#') ? color : '#FF0000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 3️⃣ Medidas relativas al canvas para que escalen en cualquier resolución
    const minDim = Math.min(canvas.width, canvas.height);
    const avatarSize = Math.round(minDim * 0.38);
    const fontSize   = Math.round(minDim * 0.07);
    const centerX    = canvas.width / 2;
    const avatarCenterY = canvas.height / 2 - Math.round(minDim * 0.05);

    // Avatar circular
    const avatarURL = guildMember.user.displayAvatarURL({ extension: 'png', size: 256 });
    const avatar = await loadImage(avatarURL);

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, avatarCenterY, avatarSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar,
        centerX - avatarSize / 2,
        avatarCenterY - avatarSize / 2,
        avatarSize, avatarSize
    );
    ctx.restore();

    // Borde del avatar
    ctx.beginPath();
    ctx.arc(centerX, avatarCenterY, avatarSize / 2 + 3, 0, Math.PI * 2);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = Math.round(minDim * 0.012); // 👈 también escala
    ctx.stroke();

    // Nombre
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${fontSize}px Sans`;
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 6;
    ctx.fillText(
        guildMember.displayName,
        centerX,
        avatarCenterY + avatarSize / 2 + fontSize + Math.round(minDim * 0.02)
    );

    return canvas.toBuffer('image/png');
}

module.exports = generateWelcomeImage;