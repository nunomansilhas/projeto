const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define o caminho do diretório de destino
const uploadDir = path.join(__dirname, '..', '..', 'img', 'produtos');

// Verifica se o diretório existe, caso contrário, cria-o
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer para uploads de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploadMiddleware = multer({ storage: storage });

module.exports = app => {
    const upload = require("../controllers/upload.controller.js");

    var router = require("express").Router();

    // Rota para upload de imagem
    router.post("/", uploadMiddleware.single('img'), upload.uploadImage);

    // Rota para deletar imagem
    router.delete("/:id", upload.deleteImage);

    // Rota para obter imagens associadas a um produto específico
    router.get("/:productId", upload.getProductImages);

    app.use('/api/upload', router);
};
