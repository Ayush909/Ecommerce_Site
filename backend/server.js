const app = require('../backend/app');
const express = require('express')
const connectDatabase = require('../backend/config/DBConnetion');
require('dotenv').config({path: 'backend/config/config.env'});
const productRoute = require('../backend/routes/productRoute');
const userRoute = require('../backend/routes/userRoute');
const errorMiddleware = require('./middlewares/error');
const PORT = process.env.PORT;

//Handling uncaught errors
process.on('uncaughtException',(err)=>{
        console.log(`Error: ${err}`);
        console.log("Shutting down server due to uncaught errors");
        process.exit(1);
})


connectDatabase();

app.use(express.json());

app.use('/api/products',productRoute);
app.use('/api/users',userRoute)

app.use(errorMiddleware);

const server = app.listen(PORT,()=>{
        console.log(`Server running on PORT ${PORT}`);
})

//Handle unhanled promise rejections
process.on('unhandledRejection',(err)=>{
        console.log(`Error: ${err.message}`);
        console.log("Shutting down server due to unhandled rejections")

        server.close(()=>{
                process.exit(1);
        });
})