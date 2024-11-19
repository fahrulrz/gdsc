import { Request, Response, Router } from "express";
import { Book } from "../models/book";
import { PrismaClient } from "@prisma/client";
import { MongoClient } from "mongodb";


const uri = "mongodb+srv://muhamadfahrulrazi:O6gnyJe0fRkY6tBM@cluster0.ep7kl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const router = Router();
const prisma = new PrismaClient();
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        await client.db("test").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}


let books: Book[] =[];
let currentId = books.length;

// Create book
router.post("/", async(req: Request, res: Response) => {
    const { title, author, published_at } = req.body;

    if (!title || !author || !published_at) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    try {
        const newBook = await prisma.book.create({
            data: {
                title,
                author,
                published_at,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                id: currentId++,
            },
        })

        res.status(201).json({
        message: "Book created successfully", 
        data: newBook });

    } catch(error) {
        res.status(500).json({ message: "Internal server error" });
    }

    // const newBook: Book = {
    //     title,
    //     author,
    //     published_at,
    //     created_at: new Date().toISOString(),
    //     updated_at: new Date().toISOString(),
    //     id: currentId++,
    // };

    // books.push(newBook);

    // res.status(201).json({
    //     message: "Book created successfully", 
    //     data: newBook });
})


// Read all books
router.get("/", async(req, res)=> {
    try {
        const books = await prisma.book.findMany();
        res.status(200).json({ data: books })
    } catch(error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

// Read single book
router.get("/:id", (req, res) => {
    console.log("Request Params:", req.params);
    const book = books.find((b) => b.id === parseInt(req.params.id, 10));
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
});

// Update book
router.put("/:id", (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id, 10));
    console.log(book);  
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    const { title, author, published_at } = req.body;
    if (title) book.title = title;
    if (author)  book.author = author;
    if (published_at) book.published_at = published_at;
    book.updated_at = new Date().toISOString();
    res.status(200).json({ 
        message: "Book updated successfully",
        data: book });
})

// Delete book
router.delete("/:id", (req, res) => {
    const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
    if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found" });
    }
    books.splice(bookIndex, 1);
    res.status(200).json({ message: "Book deleted successfully" });
});

export default router;