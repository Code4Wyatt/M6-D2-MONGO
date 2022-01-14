import express from "express";
import CategoryModel from "./schema.js"

const categoryRouter = express.Router();

categoryRouter.post("/bulk", async (req, res, next) => {
    try {
        const bulkCategories = await CategoryModel.insertMany([
            { name: "Accoustic" },
            { name: "Electric" },
            { name: "Bass" },
            { name: "Equipment" },
        ]);

        res.send(bulkCategories);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

categoryRouter.get("/", async(req, res, next) => {
    try {
        const data = await CategoryModel.find();
        res.send(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

export default categoryRouter;