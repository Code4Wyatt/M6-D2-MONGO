import express from "express";
import cors from "cors";
import { connectDB } from "./utils/db/index.js";
import productRouter from "./services/product/routes.js";
import reviewRouter from "./services/review/routes.js";
import categoryRouter from "./services/categories/routes.js";
import cartRouter from "./services/cart/routes.js";
import usersRouter from "./services/users/routes.js";
import mongoose from "mongoose"
import {badRequestHandler, genericErrorHandler, notFoundHandler} from "../src/errorHandlers.js"

const whiteList = [process.env.FE_LOCAL_URL, process.env.FE_REMOTE_URL]

const corsOptions = {
    origin: function (origin, next) {
        console.log(origin);
        if (!origin || whiteList.indexOf(origin) !== -1) {
            next(null, true);
        } else {
            next(new Error("Not allowed by CORS"));
        }
    },
};

const server = express();

const port = process.env.PORT || 5001;

server.use(express.json());
server.use(cors(corsOptions));

server.use("/category", categoryRouter);
server.use("/product", productRouter);
server.use("/review", reviewRouter);
server.use("/user", usersRouter);
server.use("/cart", cartRouter);


mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB!")

    server.listen(port, () => {
        console.table(listEndpoints(server))
        console.log(`Server is running on port ${port}`)
    })
})

mongoose.connection.on("error", error => {
    console.log(error)
})

export default server;