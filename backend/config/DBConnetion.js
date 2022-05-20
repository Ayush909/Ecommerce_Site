const mongoose = require('mongoose')

const connectDatabase = async () => {
    try{
        const conn = await mongoose.connect(process.env.DB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log(`DB Connected: ${conn.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }

}

module.exports = connectDatabase;

