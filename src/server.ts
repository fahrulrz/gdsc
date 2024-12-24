import express from "express";
import bookRoutes from "./routes/books";
import nameRoutes from "./routes/bakaranNames";
import dotenv from "dotenv";
import connectDB from './service/db';
import cors from 'cors';

dotenv.config(); // memuat variable
const app = express(); // membuat app express
const PORT = process.env.PORT || 3000; // menggunakan port yang ada di env atau default 3000

connectDB(); // mengoneksikan ke database

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/bakaran-names", nameRoutes);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

app.get("/", (req: any, res: any) => {
    res.json({
        message: "This is fahrul rest api",
        bookApi: "https://gdsc-mu.vercel.app/api/books",
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});