
import mongoose, { Schema, Document } from "mongoose";


interface Book extends Document{
    id: number;
    title: string;
    author: string;
    published_at: String;
    created_at: String;
    updated_at: String;
}

const bookSchema = new Schema<Book>({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    published_at: { type: String, required: true },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true },
});

export default mongoose.model<Book>("Book", bookSchema);