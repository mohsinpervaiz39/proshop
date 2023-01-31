import express from 'express';
import path from 'path'
import colors from 'colors';
import morgan from 'morgan'
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
const PORT = process.env.PORT || 5000;

dotenv.config();

// this coding is a pached code not urderstand why it is working

const DB ='mongodb+srv://admin:ZyrJ0q9XHEu38oNN@cluster0.wx28mta.mongodb.net/Eshop?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("connection successfully")).catch((err) => console.log(err));
connectDB();

//connectDB();
const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
 
app.use(express.json()); 

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html' )))
} else {
    app.get('/', (req,res)=>{
        res.send('Api is running..'); 
    })  
}

app.use(notFound)

app.use(errorHandler)
 


app.listen(PORT, console.log(`server runing on ${PORT}`.yellow.bold))
 