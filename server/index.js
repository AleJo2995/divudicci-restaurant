import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import rolesRoutes from './routes/roles.js'
import consecutivesRoutes from './routes/consecutives.js'
import countriesRoutes from './routes/countries.js'
import restaurantRoutes from './routes/restaurants.js'
import clientRoutes from './routes/clients.js'
import brandsRoutes from './routes/brands.js'
import unitsOfMeasureRoutes from './routes/unitsOfMeasure.js'
import buffeteRoutes from './routes/buffet.js'
import tablesRoutes from './routes/tables.js'
import cashiersRoutes from './routes/cashiers.js'
import barsRoutes from './routes/bars.js'
import productsRoutes from './routes/products.js'

const app = express(); //initializing

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit : "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/consecutives', consecutivesRoutes);
app.use('/countries', countriesRoutes);
app.use('/roles', rolesRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/clients', clientRoutes);
app.use('/brands', brandsRoutes);
app.use('/unitsOfMeasure', unitsOfMeasureRoutes);
app.use('/buffet', buffeteRoutes);
app.use('/tables', tablesRoutes);
app.use('/cashiers', cashiersRoutes);
app.use('/bars', barsRoutes);
app.use('/products', productsRoutes);

//
const CONNECTION_URL = 'mongodb+srv://dividucciAdmin:MFMDOmw59AM10gSB@cluster0.fiti5.mongodb.net/Divudicci?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.error(error) );

mongoose.set('useFindAndModify', false);