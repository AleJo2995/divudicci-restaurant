import mongoose from 'mongoose';

const countrySchema = mongoose.Schema({
    code:String,
    name:String,
    flag:String
});

const country = mongoose.model('country', countrySchema, 'country');

export default country;