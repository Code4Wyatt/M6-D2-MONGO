import express from "express"
import UserModel from "./schema.js"

const usersRouter = express.Router()

// Get All Users

usersRouter.get("/", async (req, res, next) => {
    try {
        const allUsers = await UserModel.find()
        res.send(allUsers)
    } catch (error) {
        console.log(error);
        next(error)
    }
});

// Post New User

usersRouter.post("/", async (req, res, next) => {
    try {
        const newUser = new UserModel(req.body)
        const { _id } = await newUser.create()
        res.status(201).send({ _id });
    } catch (error) {
        console.log(error);
        next(error);
    }
})

// usersRouter.post("/bulk", async (req, res, next) => {
//     try {
//         const data = await User.bulkCreate(users);
//         res.send(data);
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// });

// Get Single User

usersRouter.get("/:userId", async (req, res, next) => {
    try {
        const userId = req.params.userId
        const singleUser = await UserModel.findById(userId)
        if (singleUser) {
            res.send(singleUser)
        } else {
            next(createHttpError(404, `User with id ${req.params.userId} not found.`))
        }
    } catch (error) {
        next(error);
    }
});

usersRouter.put("/:userId", async (req, res, next) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.userId);
        if (updatedUser) {
            res.send(updatedUser)
        } else {
            next(createHttpError(404, `User with id ${req.params.userId} not found.`))
        }
    } catch (error) {
        next(error);
    }
});

usersRouter.delete("/:userId", async (req, res, next) => {
    try {
       const deletedUser = await UserModel.findByIdAndDelete(req.params.userId)
       if (deletedUser) {
           res.status(204).send()
       } else {
           next(createHttpError(404, `User with id ${req.params.userId} not found or has already been deleted.`))
       }
    } catch (error) {
        console.log(error);
        next(error);
    }
})

export default usersRouter;