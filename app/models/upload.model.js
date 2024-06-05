const sql = require("./db.js");

const Image = function(image) {
    this.idProduto = image.idProduto;
    this.imageUrl = image.imageUrl;
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

Image.findById = (id, result) => {
    sql.query(`SELECT * FROM imagensprodutosdeapoio WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found image: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Image.remove = (id, result) => {
    sql.query("DELETE FROM imagensprodutosdeapoio WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted image with id: ", id);
        result(null, res);
    });
};

Image.findByProductId = (productId, result) => {
    sql.query("SELECT * FROM imagensprodutosdeapoio WHERE idProduto = ?", productId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(`images found for productId: ${productId}`);
        result(null, res);
    });
};


module.exports = Image;
