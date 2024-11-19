import { Request, Response, Router } from "express";
import { Book } from "../models/book";

const router = Router();

let books: Book[] =[];
let currentId = books.length;

// Create book
router.post("/", (req: Request, res: Response) => {
    const { title, author, published_at } = req.body;

    if (!title || !author || !published_at) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    const newBook: Book = {
        title,
        author,
        published_at,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        id: currentId++,
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book created successfully", 
        data: newBook });
})


// Read all books
router.get("/", (req, res)=> {
    res.status(200).json({ data: books })
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