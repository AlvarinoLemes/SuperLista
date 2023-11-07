const SuperLista = require('../models/ListaData');

module.exports = {

    async read(request, response) {
        const priority = request.query;

        const priorityNotes = await SuperLista.find(priority);

        return response.json(priorityNotes);
    },

    async update(request, response) {
        const { id } = request.params;

        const annotation = await SuperLista.findOne({ _id : id });

        if (annotation.priority) {
            annotation.priority = false;
        }else {
            annotation.priority = true;
        }

        await annotation.save();

        return response.json(annotation);
    }
}