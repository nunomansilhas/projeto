const Image = require("../models/upload.model.js");
const path = require('path');
const fs = require('fs');

exports.uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "No file uploaded." });
    }

    // Gerar o caminho relativo
    const relativePath = path.join('img/produtos', req.file.filename).replace(/\\/g, '/');
    
    const image = new Image({
        idProduto: req.body.idProduto,
        imageUrl: relativePath, // Usar o caminho relativo aqui
    });

    Image.create(image, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while saving the image."
            });
        }
        res.send({ path: relativePath, id: data.id }); // Enviar o caminho relativo na resposta
    });
};

// Função para deletar imagem do banco de dados e do sistema de arquivos
exports.deleteImage = (req, res) => {
    const imageId = req.params.id;
    Image.findById(imageId, (err, image) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving the image."
            });
        }

        if (!image) {
            return res.status(404).send({ message: "Image not found" });
        }

        const imagePath = path.resolve(image.imageUrl);
        fs.unlink(imagePath, (err) => {
            if (err) {
                return res.status(500).send({
                    message: err.message || "Some error occurred while deleting the image file."
                });
            }

            Image.remove(imageId, (err) => {
                if (err) {
                    return res.status(500).send({
                        message: err.message || "Some error occurred while deleting the image record."
                    });
                }

                res.send({ message: "Image deleted successfully!" });
            });
        });
    });
};

exports.getProductImages = (req, res) => {
    const productId = req.params.productId;
    Image.findByProductId(productId, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving product images."
            });
        }
        res.send(data);
    });
};

