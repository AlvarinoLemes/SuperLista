const express = require('express');
const routes = express.Router();

const ListaController = require('./controllers/ListaController');
const PriorityController = require('./controllers/PriorityController');
const ContentController = require('./controllers/ContentController');

// Rota SuperLista
routes.post('/superlista', ListaController.create);
routes.get('/superlista', ListaController.read);
routes.delete('/superlista/:id', ListaController.delete);

// Rota prioridade
routes.get('/priorities', PriorityController.read);
routes.post('/priorities/:id', PriorityController.update);

// Rota content
routes.post('/contents/:id', ContentController.update);

module.exports = routes;