import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    code:String,
    userName:String,
    password:String,
    name:String,
    lastName:String,
    secondSurname:String,
    phoneNumber:String,
    cellPhoneNumber:String,
    nickName:String,
    roles:[String]
});

const user = mongoose.model('user', userSchema, 'user');

export default user;