import express from "express";
import { Router } from "express";
import { Category, Product, User, Review, ProductCategory } from "../../utils/db/models/index.js";
import { Op } from "sequelize";

const productRouter = Router();

// Create Product
productRouter.post("/", async (req, res, next) => {
    try {
      console.log(req.body);
      const product = await Product.create(req.body);
      res.send(product);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Get All Products
productRouter.get("/", async (req, res, next) => {
    try {
        const allProducts = await Product.findAll( {include: [ User, Review ]});
        res.send(allProducts);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Get First 10 Acoustic Guitar Products
productRouter.get("/acoustic", async (req, res, next) => {
    try {
        const allProductsByCategory = await Product.findAll( {where: {
            category:"Acoustic"
        },
        include: [ ProductCategory ]},
        {limit: 10});
        res.send(allProductsByCategory);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Get Specific Product
productRouter.get("/:id", async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Edit Product
productRouter.put("/:id", async (req, res, next) => {
    try {
        const updateProduct = await Product.update(req.body, {
            where: { id: req.params.id },
            returning: true,
        });

        res.send(updateProduct[1][0]);
    } catch (error) {
       console.log(error);
       next(error);
    }
});

// Delete Product
productRouter.delete("/:id", async (req, res, next) => {
    try {
        const deleteProduct = await Product.destroy({
            where: { 
                id: req.params.id,
             },
        });

        if (deleteProduct > 0) {
            res.send("Ok");
        } else {
            res.status(404).send("Not found");
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

export default productRouter;