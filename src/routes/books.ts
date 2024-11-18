import { Router, Request, Response } from "express";

const router = Router();

type Book = {
  id: number;
  title: string;
  author: string;
  published_at: string;
};

let books: Book[] = [
  { id: 1, title: "Example Book", author: "Author Name", published_at: "2024-01-01" },
];

// GET: Fetch all books
router.get("/", (req: Request, res: Response) => {
  res.json({ data: books });
});

// POST: Create a new book
router.post("/", (req: Request, res: Response) => {
  const { title, author, published_at } = req.body; 

  if (!title || !author || !published_at) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newBook: Book = {
    id: books.length + 1,
    title,
    author,
    published_at,
  };

  books.push(newBook);
  res.status(201).json({ message: "Book created successfully", data: newBook });
});

// GET: Fetch a book by ID
router.get("/:id", (req: Request<{id : string}>, res: Response) => {
  const { id } = req.params;
  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

// PUT: Update a book by ID
router.put("/:id", (req: Request<{id : string}>, res: Response) => {
  const { id } = req.params;
  const { title, author, published_at } = req.body;

  const bookIndex = books.findIndex((b) => b.id === Number(id));
  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[bookIndex] = { ...books[bookIndex], title, author, published_at };
  res.json({ message: "Book updated successfully", data: books[bookIndex] });
});

// DELETE: Remove a book by ID
router.delete("/:id", (req: Request<{id : string}>, res: Response) => {
  const { id } = req.params;
  const bookIndex = books.findIndex((b) => b.id === Number(id));

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books.splice(bookIndex, 1);
  res.json({ message: "Book deleted successfully" });
});

export default router;