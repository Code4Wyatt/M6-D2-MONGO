import express from "express";
import { Product, User, Review, Category } from "../../utils/db/models/index.js";
import { Op } from "sequelize";

const categoryRouter = express.Router();

categoryRouter.post("/bulk", async(req, res, next) => {
    try {
        const data = await Category.bulkCreate([
            { name: "Accoustic" },
            { name: "Electric" },
            { name: "Bass" },
            { name: "Equipment" },
        ]);

        res.send(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

categoryRouter.get("/", async(req, res, next) => {
    try {
        const data = await Category.findAll();
        res.send(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

export default categoryRouter;