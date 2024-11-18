import express, {Application } from "express";
import bookRoutes from "./routes/books";

const app: Application = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


