const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const getAllFiles = require('../utils/getAllFiles');
const { getConfig } = require('../utils/config'); 
const replaceTemplates = require('../utils/replaceTemplates');

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
    const { welcomeImageTexts = {} } = getConfig(); // 👈 leer config guardada

    // Textos y colores con fallbacks
   const title = replaceTemplates(
        welcomeImageTexts.title || '¡Bienvenido/a',
        guildMember
    );
    const description = replaceTemplates(
        welcomeImageTexts.description || '{username}',
        guildMember
    );
    const footer = replaceTemplates(
        welcomeImageTexts.footer || '{server-name}',
        guildMember
    );
    const titleColor       = welcomeImageTexts.titleColor       || '#FFFFFF';
    const descriptionColor = welcomeImageTexts.descriptionColor || '#FFFFFF';
    const footerColor      = welcomeImageTexts.footerColor      || '#CCCCCC';
    const avatarBorderColor = welcomeImageTexts.avatarBorderColor || '#FFFFFF';

    // --- Canvas (igual que antes) ---
    let bgImage = null;
    let canvasWidth = 800;
    let canvasHeight = 300;

    if (imageFiles.length > 0) {
        const randomFile = imageFiles[Math.floor(Math.random() * imageFiles.length)];
        bgImage = await loadImage(randomFile);
        canvasWidth  = bgImage.width;
        canvasHeight = bgImage.height;
    }

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    if (bgImage) {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = color.startsWith('#') ? color : '#FF0000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const minDim = Math.min(canvas.width, canvas.height);
    const centerX = canvas.width / 2;

    // Distribuir verticalmente según qué textos hay activos
    const avatarCenterY = canvas.height / 2 + Math.round(minDim * 0.05);

    const avatarSize = Math.round(minDim * 0.38);
    const fontSize   = Math.round(minDim * 0.07);

    // --- Título (encima del avatar) ---
    
    ctx.fillStyle = titleColor;
    ctx.font = `bold ${Math.round(fontSize)}px Sans`;
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 6;
    ctx.fillText(title, centerX, avatarCenterY - avatarSize / 2 - Math.round(minDim * 0.04));


    // --- Avatar circular ---
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

    // Borde del avatar 👈 ahora usa avatarBorderColor
    ctx.beginPath();
    ctx.arc(centerX, avatarCenterY, avatarSize / 2 + 3, 0, Math.PI * 2);
    ctx.strokeStyle = avatarBorderColor;
    ctx.lineWidth = Math.round(minDim * 0.012);
    ctx.stroke();

    // --- Descripción (debajo del avatar) ---
    ctx.fillStyle = descriptionColor;
    ctx.font = `bold ${fontSize*0.75}px Sans`;
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 6;
    ctx.fillText(description, centerX, avatarCenterY + avatarSize / 2 + fontSize + Math.round(minDim * 0.02));

    // --- Footer (abajo del todo) ---
    ctx.fillStyle = footerColor;
    ctx.font = `${Math.round(fontSize * 0.6)}px Sans`;
    ctx.textAlign = 'center';
    ctx.shadowBlur = 4;
    ctx.fillText(footer, centerX, canvas.height - Math.round(minDim * 0.04));

    return canvas.toBuffer('image/png');
}

module.exports = generateWelcomeImage;