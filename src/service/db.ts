import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI; // mengambil uri dari env
        if (!MONGO_URI) {
            throw new Error('MONGO_URI is not defined'); // mengembalikan error jika uri tidak ditemukan
        }
        await mongoose.connect(MONGO_URI);  // menghubungkan ke mongodb
        console.log('Connected to MongoDB');  // menampilkan pesasn ketika koneksi berhasil
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Keluar jika koneksi gagal
    }
}

export default connectDB;