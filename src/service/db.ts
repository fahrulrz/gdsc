import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// const uri = "mongodb+srv://muhamadfahrulrazi:O6gnyJe0fRkY6tBM@cluster0.ep7kl.mongodb.net/gdsc?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        if (!MONGO_URI) {
            throw new Error('MONGO_URI is not defined');
        }
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Keluar jika koneksi gagal
    }
}

export default connectDB;