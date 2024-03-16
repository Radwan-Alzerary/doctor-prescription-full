// ecoRoutes.js

const express = require('express');
const router = express.Router();
const Eco = require("../model/eco");

// POST - Create a new Eco entry
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const eco = new Eco(req.body.data);
        await eco.save();
        res.status(201).send(eco);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET - Get all Eco entries
router.get('/', async (req, res) => {
    try {
        const eco = await Eco.find();
        res.send(eco);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET - Get a specific Eco entry by ID
router.get('/:id', async (req, res) => {
    try {
        const eco = await Eco.findById(req.params.id);
        if (!eco) {
            return res.status(404).send({ error: 'Eco not found' });
        }
        res.send(eco);
    } catch (error) {
        res.status(500).send(error);
    }
});

// PUT - Update a specific Eco entry by ID
router.put('/:id', async (req, res) => {
    try {
        console.log(req.body)
        const eco = await Eco.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!eco) {
            return res.status(404).send({ error: 'Eco not found' });
        }
        res.send(eco);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE - Delete a specific Eco entry by ID
router.delete('/:id', async (req, res) => {
    try {
        const eco = await Eco.findByIdAndDelete(req.params.id);
        if (!eco) {
            return res.status(404).send({ error: 'Eco not found' });
        }
        res.send(eco);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
