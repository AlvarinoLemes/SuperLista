const express = require('express');
const routes = express.Router();

const ListaController = require('./controllers/ListaController');

// Rota SuperLista

routes.post('/superlista', ListaController.create);
routes.get('/superlista', ListaController.read);
routes.delete('/superlista/:id', ListaController.delete);

module.exports = routes;