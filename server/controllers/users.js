import User from '../models/user.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, { _id: 0 });
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getUserByCode = async (req, res) => {
    const query = {code: req.params.code};
    try {
        const users = await User.findOne(query, { _id: 0 });
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createUser = async (req, res) => {
    const user = req.body;
    const newUser = new User(user);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const editUser = async (req, res) => {
    const query = {'code': req.params.code};
    try {
        const user = await User.findOneAndUpdate(query, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const login = async (req, res) => {
    const query = {'userName': req.body.userName};
    try {
        const user = await User.findOne(query);
        if(user.password = req.body.password){
            res.status(200).json(user);
        } else {
            res.status(500).json(user);
        }
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}
