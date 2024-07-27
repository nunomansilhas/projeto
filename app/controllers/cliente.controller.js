const Cliente = require("../models/cliente.model.js");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Função para tentar deletar a imagem, mas falhas não impedem a exclusão do cliente
function tryDeleteImageFile(imagePath) {
  return new Promise(resolve => {
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log(`Failed to delete image file: ${err.message}`);
      }
      resolve(); // Sempre resolve, mesmo que haja erro
    });
  });
}

// Configuração para upload de imagem
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'img/perfil/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

exports.uploadImage = upload.single('image_profile');

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const cliente = new Cliente({
    nome: req.body.nome,
    morada: req.body.morada,
    email: req.body.email,
    telemovel: req.body.telemovel,
    image_profile: req.file ? `img/perfil/${req.file.filename}` : null
  });

  Cliente.create(cliente, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Cliente."
      });
    } else {
      res.send(data);
    }
  });
};

exports.findAll = (req, res) => {
  Cliente.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving clientes."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Cliente.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cliente with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Cliente with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Função para excluir imagem do sistema de arquivos
function deleteImageFile(imagePath) {
  return new Promise((resolve, reject) => {
    fs.unlink(imagePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Atualiza o cliente
exports.update = (req, res) => {
  // Verifica se uma nova imagem foi enviada
  let imageProfile = req.file ? req.file.path : null;

  // Se não há uma nova imagem, mantenha a imagem existente
  if (!imageProfile) {
    Cliente.findById(req.params.id, (err, cliente) => {
      if (err || !cliente) {
        return res.status(500).send({
          message: `Error finding Cliente with id ${req.params.id}.`
        });
      }

      imageProfile = cliente.image_profile;

      const updatedCliente = new Cliente({
        nome: req.body.nome,
        morada: req.body.morada,
        email: req.body.email,
        telemovel: req.body.telemovel,
        image_profile: imageProfile
      });

      Cliente.updateById(req.params.id, updatedCliente, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Cliente with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: `Error updating Cliente with id ${req.params.id}`
            });
          }
        } else res.send(data);
      });
    });
  } else {
    Cliente.findById(req.params.id, (err, cliente) => {
      if (err || !cliente) {
        return res.status(500).send({
          message: `Error finding Cliente with id ${req.params.id}.`
        });
      }

      const oldImagePath = cliente.image_profile;

      const updatedCliente = new Cliente({
        nome: req.body.nome,
        morada: req.body.morada,
        email: req.body.email,
        telemovel: req.body.telemovel,
        image_profile: imageProfile
      });

      Cliente.updateById(req.params.id, updatedCliente, async (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Cliente with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: `Error updating Cliente with id ${req.params.id}`
            });
          }
        } else {
          // Exclui a imagem antiga após a atualização
          if (oldImagePath) {
            try {
              await deleteImageFile(path.resolve(oldImagePath));
            } catch (error) {
              console.error('Error deleting old image:', error);
            }
          }
          res.send(data);
        }
      });
    });
  }
};

exports.delete = (req, res) => {
  Cliente.findById(req.params.id, (err, cliente) => {
    if (err) {
      return res.status(500).send({
        message: "Error retrieving Cliente with id " + req.params.id
      });
    } else if (!cliente) {
      return res.status(404).send({
        message: `Cliente not found with id ${req.params.id}.`
      });
    } else {
      const imagePath = path.resolve(cliente.image_profile);

      // Tentar deletar a imagem, independentemente do resultado, deleta o cliente
      tryDeleteImageFile(imagePath)
        .then(() => {
          Cliente.remove(req.params.id, (err) => {
            if (err) {
              return res.status(500).send({
                message: "Could not delete Cliente with id " + req.params.id
              });
            } else {
              res.send({ message: `Cliente was deleted successfully!` });
            }
          });
        })
        .catch(() => {
          // Essa captura é apenas precaução, já que o 'tryDeleteImageFile' resolve sempre
          res.status(500).send({
            message: `Error occurred during the file deletion for Cliente with id ${req.params.id}`
          });
        });
    }
  });
};

exports.deleteAll = (req, res) => {
  Cliente.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all clientes."
      });
    else res.send({ message: `All Clientes were deleted successfully!` });
  });
};
