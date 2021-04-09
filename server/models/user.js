import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userName:String,
    password:String,
    name:String,
    lastName:String,
    roles:[String]
});

const user = mongoose.model('user', userSchema, 'user');

export default user;