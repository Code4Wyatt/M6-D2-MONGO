import { Router } from "express"
import ProductModel from "./schema.js"

const productRouter = Router()

// Create Product
productRouter.post("/", async (req, res, next) => {
    try {
      const newProduct = new ProductModel(req.body);
      res.send(newProduct);
    } catch (error) {
        next(error);
    }
})

// Get All Products
productRouter.get("/", async (req, res, next) => {
    try {
        const allProducts = await ProductModel.find();
        res.send(allProducts);
    } catch (error) {
        console.log(error);
        next(error);
    }
})

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
        next(error);
    }
})

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
})

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
})

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
})

export default productRouter