const SuperLista = require('../models/ListaData');

module.exports = {

    async read(request, response) {
        const priority = request.query;

        const priorityNotes = await SuperLista.find(priority);

        return response.json(priorityNotes);
    }
}