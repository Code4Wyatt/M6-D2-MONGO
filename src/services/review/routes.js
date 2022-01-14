import express from "express";
import {Product, User, Review} from "../../utils/db/models/index.js";
import { Op } from "sequelize";

const reviewRouter = express.Router();

reviewRouter.post("/", async (req, res, next) => {
    try {
        const data = await Review.create(req.body);
        res.send(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

reviewRouter.get("/", async (req, res, next) => {
    try {
        const data = await Review.findAll({ include: [Product, User]});
        res.send(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

reviewRouter.get("/:id", async (req, res, next) => {
    try {
        const data = await Review.findByPk(req.params.id);
        res.send(data);
    } catch (error) {
        console.log(error);
        next(error)
    }
});

reviewRouter.put("/:id", async (req, res, next) => {
    try {
        const { body } = req;
        delete body.userId;
        delete body.articleId;
        const data = await Review.update(req.body, {
            where: { 
                id: req.params.id,
            }
        });
        res.send(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

reviewRouter.delete("/:id", async (req, res, next) => {
    try {
        const data = await Review.destroy({ 
            where: { id: req.params.id,
            },
        });
        res.send({rows: data});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

export default reviewRouter;