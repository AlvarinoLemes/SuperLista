const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        checked: req.body.checked
    });
    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        console.error("Erro ao salvar", err);
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    let item;

    try {
        item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item não encontrado' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    if (req.body.checked != null) {
        item.checked = req.body.checked;
    }
    
    try {
        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
