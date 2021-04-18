import mongoose from 'mongoose';

const brandSchema = mongoose.Schema({
    code:String,
    name:String,
    description:String,
    nationality:String,
    company:String,
    companyNumber:String,
    identification:String,
    companyDetail:String,
});

const brand = mongoose.model('brand', brandSchema, 'brand');

export default brand;