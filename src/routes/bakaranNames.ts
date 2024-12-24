import { Request, Response, Router } from "express";
import BakaranName from "../models/name";

const router = Router();

// Create name
router.post("/", async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Invalid request data" });
    }    

    const newName = new BakaranName({
        id: await BakaranName.countDocuments() + 1,
        name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    });

    await newName.save();

    res.status(201).json({
        message: "Name created successfully",
        data: newName,
    });
});

// Get all names
router.get("/", async (req: Request, res: Response) => {
    const names = await BakaranName.find();
    res.json(names);
});

export default router;