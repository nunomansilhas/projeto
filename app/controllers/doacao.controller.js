const Doacao = require("../models/doacao.model.js");

// Create and Save a new Doacao
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Doacao
    const doacao = new Doacao({
        ProdutoID: req.body.ProdutoID,
        ClienteID: req.body.ClienteID,
        Quantidade: req.body.Quantidade,
        DataDoacao: req.body.DataDoacao
    });

    // Save Doacao in the database
    Doacao.create(doacao, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Doacao."
            });
        else res.send(data);
    });
};

// Retrieve all Doacoes from the database
exports.findAll = (req, res) => {
    Doacao.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving doacoes."
            });
        else res.send(data);
    });
};

// Find a single Doacao with a doacaoId
exports.findOne = (req, res) => {
    Doacao.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Doacao with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Doacao with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Find Doacoes by ProdutoID
exports.findByProdutoId = (req, res) => {
    Doacao.findByProdutoId(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Doacao with ProdutoID ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Doacao with ProdutoID " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Find Doacoes by ClienteID
exports.findByClienteId = (req, res) => {
    Doacao.findByClienteId(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Doacao with ClienteID ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Doacao with ClienteID " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update a Doacao identified by the doacaoId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Doacao.updateById(
        req.params.id,
        new Doacao(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Doacao with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Doacao with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Update Doacao by ProdutoID
exports.updateByProdutoId = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Doacao.updateByProdutoId(
        req.params.id,
        new Doacao(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Doacao with ProdutoID ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Doacao with ProdutoID " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Update Doacao by ClienteID
exports.updateByClienteId = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Doacao.updateByClienteId(
        req.params.id,
        new Doacao(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Doacao with ClienteID ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Doacao with ClienteID " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Doacao with the specified doacaoId in the request
exports.delete = (req, res) => {
    Doacao.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Doacao with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Doacao with id " + req.params.id
                });
            }
        } else res.send({ message: `Doacao was deleted successfully!` });
    });
};

// Delete Doacao by ProdutoID
exports.deleteByProdutoId = (req, res) => {
    Doacao.removeByProdutoId(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Doacao with ProdutoID ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Doacao with ProdutoID " + req.params.id
                });
            }
        } else res.send({ message: `Doacao with ProdutoID ${req.params.id} was deleted successfully!` });
    });
};

// Delete Doacao by ClienteID
exports.deleteByClienteId = (req, res) => {
    Doacao.removeByClienteId(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Doacao with ClienteID ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Doacao with ClienteID " + req.params.id
                });
            }
        } else res.send({ message: `Doacao with ClienteID ${req.params.id} was deleted successfully!` });
    });
};

// Delete all Doacoes from the database
exports.deleteAll = (req, res) => {
    Doacao.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all doacoes."
            });
        else res.send({ message: `All Doacoes were deleted successfully!` });
    });
};
