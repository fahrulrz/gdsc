import 'dotenv/config';
import bodyParser from "body-parser";
import express from "express";
import bookRoutes from "./routes/books";

const app = express();
const PORT = 8000;
const databaseUrl = process.env.DATABASE_URL;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/books", bookRoutes);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

// app.get("/", (req: any, res: any) => {
//     res.send("Hello World!");
// })

app.get("/", bookRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});