import bodyParser from "body-parser";
import express from "express";
import bookRoutes from "./routes/books";

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/books", bookRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});