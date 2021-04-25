import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    code:String,
    password:String,
    name:String,
    lastName:String,
    secondSurname:String,
    phoneNumber:String,
    cellPhoneNumber:String,
    username:String,
    roles:[String]
});

const user = mongoose.model('user', userSchema, 'user');

export default user;