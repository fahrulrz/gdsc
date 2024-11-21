import 'dotenv/config';
import express from "express";
import bookRoutes from "./routes/books";
import dotenv from "dotenv";
import connectDB from './service/db';

dotenv.config(); // memuat variable
const app = express(); // membuat app express
const PORT = process.env.PORT || 3000; // menggunakan port yang ada di env atau default 3000

connectDB(); // mengoneksikan ke database

// Middleware
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

app.get("/", (req: any, res: any) => {
    res.send("This is fahrul rest api \n you can use https://gdsc-mu.vercel.app/api/books to use book api");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});