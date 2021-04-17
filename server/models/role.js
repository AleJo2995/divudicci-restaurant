import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
    code:String,
    name:String,
    description:String
});

const role = mongoose.model('roles', roleSchema, 'roles');

export default role;