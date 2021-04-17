import mongoose from 'mongoose';

const restaurantSchema = mongoose.Schema({
    code:String,
    name:String,
    address:String,
    clientsQuant:String,
    phoneNumber:String,
    specialty:String
});

const restaurant = mongoose.model('restaurant', restaurantSchema, 'restaurant');

export default restaurant;