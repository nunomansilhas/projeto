const Image = require("../models/upload.model.js");

exports.uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "No file uploaded." });
    }

    const imageUrl = req.file.path;
    const image = new Image({
        idProduto: req.body.idProduto, // Assuming you want to associate the image with a product
        imageUrl: imageUrl,
    });

    Image.create(image, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while saving the image."
            });
        }
        res.send({ path: imageUrl, id: data.id });
    });
};
