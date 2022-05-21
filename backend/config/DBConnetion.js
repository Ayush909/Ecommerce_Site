const mongoose = require('mongoose')

const connectDatabase = async () => {

    const conn = await mongoose.connect(process.env.DB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    console.log(`DB Connected: ${conn.connection.host}`);
    

}

module.exports = connectDatabase;

