import mongoose, { Schema, Document } from "mongoose";

interface Name extends Document {
    id: Number;
    name: String;
}

const nameSchema = new Schema<Name>({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
});

export default mongoose.model<Name>("Name", nameSchema);