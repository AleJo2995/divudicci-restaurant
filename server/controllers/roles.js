import Role from '../models/role.js';

export const getRoles = async (req, res) => {
    try {
        const roles = await Role.find({}, { _id: 0 });
        res.status(200).json(roles);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getRoleByCode = async (req, res) => {
    const query = {code: req.params.code};
    try {
        const roles = await Role.findOne(query, { _id: 0 });
        res.status(200).json(roles);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createRole = async (req, res) => {
    const role = req.body;
    const newRole = new Role(role);
    try {
        await newRole.save();
        res.status(201).json(newRole);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const editRole = async (req, res) => {
    const query = {'code': req.params.code};
    try {
        const role = await Role.findOneAndUpdate(query, req.body);
        res.status(200).json(role);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}