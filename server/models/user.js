import mongoose from 'mongoose';

const rolesSchema = mongoose.Schema({
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

const roles = mongoose.model('roles', rolesSchema, 'roles');

export default roles;