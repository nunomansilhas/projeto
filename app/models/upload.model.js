const sql = require("./db.js");

const Image = function(image) {
    this.idProduto = image.idProduto;
    this.imageUrl = image.imageUrl;
    this.mainImg = image.mainImg;
};

Image.create = (newImage, result) => {
    sql.query("INSERT INTO imagensprodutosdeapoio SET ?", newImage, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created image: ", { id: res.insertId, ...newImage });
        result(null, { id: res.insertId, ...newImage });
    });
};

module.exports = Image;
