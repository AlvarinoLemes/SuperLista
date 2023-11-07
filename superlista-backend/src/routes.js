const express = require('express');
const routes = express.Router();

const ListaController = require('./controllers/ListaController');
const PriorityController = require('./controllers/PriorityController');

// Rota SuperLista

routes.post('/superlista', ListaController.create);
routes.get('/superlista', ListaController.read);
routes.delete('/superlista/:id', ListaController.delete);

// Rota prioridade
routes.get('/priorities', PriorityController.read);
routes.post('/priorities', PriorityController.update);

module.exports = routes;