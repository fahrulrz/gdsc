
import mongoose, { Schema, Document } from "mongoose";

// struktur book
interface Book extends Document {
    id: Number;
    title: String;
    author: String;
    published_at: String;
    created_at: Date;
    updated_at: Date;
}

const bookSchema = new Schema<Book>({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    published_at: { type: String, required: true },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

export default mongoose.model<Book>("Book", bookSchema);