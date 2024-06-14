const bcrypt = require('bcrypt');
const path = require("path");
const fs = require("fs");
const multer = require('multer');
const Funcionario = require("../models/funcionario.model.js");

// Configuração para upload de imagem
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'img/perfil/');
  },
  filename: function (req, file, cb) {
    // Usar um identificador único para cada arquivo de imagem
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

exports.uploadImage = upload.single('profileImg');

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.senha, 10);

    // Define the profile image path
    const profileImg = req.file ? `img/perfil/${req.file.filename}` : 'img/perfil/default.png';

    // Create a Funcionario
    const funcionario = new Funcionario({
      nome: req.body.nome,
      username: req.body.username,
      cargo: req.body.cargo,
      email: req.body.email,
      senha: hashedPassword,
      profileImg: profileImg
    });

    // Save Funcionario in the database
    Funcionario.create(funcionario, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Funcionario."
        });
      else res.send(data);
    });
  } catch (error) {
    res.status(500).send({
      message: "Error encrypting the password."
    });
  }
};

// Função para atualizar um funcionário
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Verifica se uma nova imagem foi enviada
  let imageProfile = req.file ? req.file.path : null;

  // Se não há uma nova imagem, mantenha a imagem existente
  if (!imageProfile) {
    Funcionario.findById(req.params.id, (err, funcionario) => {
      if (err || !funcionario) {
        return res.status(500).send({
          message: `Error finding Funcionario with id ${req.params.id}.`
        });
      }

      imageProfile = funcionario.profileImg;

      const updatedFuncionario = new Funcionario({
        nome: req.body.nome,
        username: req.body.username,
        email: req.body.email,
        cargo: req.body.cargo,
        profileImg: imageProfile
      });

      Funcionario.updateById(req.params.id, updatedFuncionario, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Funcionario with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: `Error updating Funcionario with id ${req.params.id}`
            });
          }
        } else res.send(data);
      });
    });
  } else {
    Funcionario.findById(req.params.id, (err, funcionario) => {
      if (err || !funcionario) {
        return res.status(500).send({
          message: `Error finding Funcionario with id ${req.params.id}.`
        });
      }

      const oldImagePath = funcionario.profileImg;

      const updatedFuncionario = new Funcionario({
        nome: req.body.nome,
        username: req.body.username,
        email: req.body.email,
        cargo: req.body.cargo,
        profileImg: imageProfile
      });

      Funcionario.updateById(req.params.id, updatedFuncionario, async (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Funcionario with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: `Error updating Funcionario with id ${req.params.id}`
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

exports.delete = (req, res) => {
  Funcionario.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Funcionario with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Funcionario with id " + req.params.id
        });
      }
    } else {
      // Check if profileImg is null
      if (!data.profileImg) {
        return deleteFuncionario(req.params.id, res);
      }

      // Remove the image file from the system
      const imagePath = path.resolve(data.profileImg);
      fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
          // File does not exist, continue with deletion
          console.log(`Image file ${imagePath} does not exist, continuing with deletion.`);
          return deleteFuncionario(req.params.id, res);
        } else {
          // File exists, proceed with deletion
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.log(`Could not delete image file ${imagePath}:`, err);
            }
            // Proceed with deletion regardless of image file deletion result
            return deleteFuncionario(req.params.id, res);
          });
        }
      });
    }
  });
};

function deleteFuncionario(id, res) {
  Funcionario.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Funcionario with id ${id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Funcionario with id " + id
        });
      }
    } else res.send({ message: `Funcionario was deleted successfully!` });
  });
}

exports.findAll = (req, res) => {
  Funcionario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving funcionarios."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Funcionario.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Funcionario with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Funcionario with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.deleteAll = (req, res) => {
  Funcionario.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all funcionarios."
      });
    else res.send({ message: `All Funcionarios were deleted successfully!` });
  });
};

exports.updatePassword = async (req, res) => {
  if (!req.body.senha) {
      res.status(400).send({
          message: "A nova senha não pode estar vazia!"
      });
      return;
  }

  try {
      const hashedPassword = await bcrypt.hash(req.body.senha, 10);

      Funcionario.updatePasswordById(req.params.id, hashedPassword, (err, data) => {
          if (err) {
              if (err.kind === "not_found") {
                  res.status(404).send({
                      message: `Not found Funcionario with id ${req.params.id}.`
                  });
              } else {
                  res.status(500).send({
                      message: `Error updating password for Funcionario with id ${req.params.id}`
                  });
              }
          } else res.send(data);
      });
  } catch (error) {
      res.status(500).send({
          message: "Error encrypting the password."
      });
  }
};
