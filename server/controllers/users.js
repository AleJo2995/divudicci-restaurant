import User from '../models/user.js';
import {  getNextConsecutiveValue } from './consecutives.js'

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createUser = async (req, res) => {
    const user = req.body;
    let consecutiveValue;
    try {
        consecutiveValue = await getNextConsecutiveValue('Usuarios');
    } catch (error) {
        console.log(error.message)
    }
    user.code = consecutiveValue;
    const newUser = new User(user);
    try {
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}