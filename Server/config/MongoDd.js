import mongoose from "mongoose";
const connectDatabase = async() =>{
    try{
        var URL_DB=process.env.MONGO_URL;
        const connection =await mongoose.connect(URL_DB,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("Mongo Connected");
    }
    catch(error){
        console.log(`Error: ${error.message}`)
        process.exit(1);
    }
};
export default connectDatabase;