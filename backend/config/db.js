import mongoose from 'mongoose';


const connectDB = async () =>{
    const DB ='mongodb+srv://admin:ZyrJ0q9XHEu38oNN@cluster0.wx28mta.mongodb.net/Eshop?retryWrites=true&w=majority';
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("connection successfully")).catch((err) => console.log(err));
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{ 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true })

            console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }

} 

export default connectDB;