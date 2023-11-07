const SuperLista = require('../models/ListaData');

module.exports = {

    async read(request, response) {
        const ListaList = await SuperLista.find();

        return response.json(ListaList);
    },

    async create(request, response) {
        const { title, notes, priority } = request.body;

        if (!notes || !title) {
            return response.status(400).json({ error: "Necessário um título/anotação!" });
        }

        const ListaCreated = await SuperLista.create({
            title,
            notes,
            priority
        });

        return response.json(ListaCreated);
    },

    async delete(request, response) {
        const { id } = request.params;

        const ListaDeleted = await SuperLista.findOneAndDelete({ _id : id });

        if (ListaDeleted) {
            return response.json(ListaDeleted);
        }

        return response.status(401).json({ error: 'Não foi encontrado o registro!' });

     }
}