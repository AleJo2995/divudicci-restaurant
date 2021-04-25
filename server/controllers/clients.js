import Client from '../models/client.js';

export const getClients = async (req, res) => {
    try {
        const clients = await Client.find({}, { _id: 0 });
        res.status(200).json(clients);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getClientByCode = async (req, res) => {
    const query = {code: req.params.code};
    try {
        const clients = await Client.findOne(query, { _id: 0 });
        res.status(200).json(clients);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createClient = async (req, res) => {
    const client = req.body;
    const newClient = new Client(client);
    try {
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const editClient = async (req, res) => {
    const query = {'code': req.params.code};
    try {
        const client = await Client.findOneAndUpdate(query, req.body);
        res.status(200).json(client);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}
