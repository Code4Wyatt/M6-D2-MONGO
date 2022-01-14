import express from "express"
import cors from "cors"
import productRouter from "./services/product/routes.js"
import reviewRouter from "./services/review/routes.js"
import categoryRouter from "./services/categories/routes.js"
import usersRouter from "./services/users/routes.js"
import mongoose from "mongoose"
import listEndpoints from "express-list-endpoints"
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
}

const server = express()

const port = process.env.PORT || 5001

// Middlewares //

server.use(express.json())
server.use(cors(corsOptions))

// Routes

server.use("/category", categoryRouter)
server.use("/product", productRouter)
server.use("/review", reviewRouter)
server.use("/user", usersRouter)

// Error Handlers //

server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

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

export default server