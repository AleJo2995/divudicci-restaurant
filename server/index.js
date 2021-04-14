import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import consecutivesRoutes from './routes/consecutives.js'

const app = express(); //initializing

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit : "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/consecutives', consecutivesRoutes);

//
const CONNECTION_URL = 'mongodb+srv://dividucciAdmin:MFMDOmw59AM10gSB@cluster0.fiti5.mongodb.net/Divudicci?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.error(error) );

mongoose.set('useFindAndModify', false);