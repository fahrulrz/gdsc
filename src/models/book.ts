
import mongoose, { Schema, Document } from "mongoose";


interface Book extends Document{
    id: number;
    title: string;
    author: string;
    published_at: String;
    created_at: Date;
    updated_at: Date;
}

const bookSchema = new Schema<Book>({
    id: { type: Number, required: true },
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