import { Request, Response, Router } from "express";
import Book from "../models/book";

const router = Router();


let currentId = 1;

// Create book
router.post("/", async (req: Request, res: Response) => {
    const { title, author, published_at } = req.body;

    if (!title || !author || !published_at) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    currentId = await Book.countDocuments() + 1;

    const newBook = new Book({
        id: currentId,
        title,
        author,
        published_at,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    });

    await newBook.save();

    res.status(201).json({
        message: "Book created successfully",
        data: newBook
    });
})

// Read all books
router.get("/", async (req, res) => {
    const books = await Book.find();
    res.status(200).json({ data: books })
})

// Read single book
router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findOne({ id: parseInt(req.params.id) }); // mencari dokumen buku berdasarkan id
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Book not found" })
    }
});

// Update book
router.put("/:id", async (req, res) => {

    try {
        const { title, author, published_at } = req.body;

        const updateBook = await Book.findOneAndUpdate(
            { id: parseInt(req.params.id, 10) }, {
            ...(title && { title }), // mengupdate title jika ada
            ...(author && { author }), // mengupdate author jika ada
            ...(published_at && { published_at }), // mengupdate published_at jika ada
            updated_at: new Date().toISOString(),
        },
            { new: true } // mengembalikan dokumen yang baru di update
        );

        if (!updateBook) {
            return res.status(404).json({ message: updateBook });
        }

        res.status(200).json({
            message: "Book updated successfully",
            data: updateBook
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating bookkkkkk', error: error })
    }
});

// Delete book
router.delete("/:id", async (req, res) => {
    try {
        const deleteBook = await Book.findOneAndDelete({ id: parseInt(req.params.id) });
        if (!deleteBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Book not found" });
    }
});

export default router;