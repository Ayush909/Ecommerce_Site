const app = require('../backend/app');
const express = require('express')
const connectDatabase = require('../backend/config/DBConnetion');
require('dotenv').config({path: 'backend/config/config.env'});
const productRoute = require('../backend/routes/productRoute');
const errorMiddleware = require('./middlewares/error');
const PORT = process.env.PORT;

connectDatabase();

app.use(express.json());

app.use('/api/products',productRoute);

app.use(errorMiddleware);

app.listen(PORT,()=>{
        console.log(`Server running on PORT ${PORT}`);
})