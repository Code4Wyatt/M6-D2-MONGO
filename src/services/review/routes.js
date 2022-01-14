import express from "express";
import ReviewModel from "./schema.js"

const reviewRouter = express.Router()

// Post Review
reviewRouter.post("/", async (req, res, next) => {
    try {
        const newReview = new ReviewModel(req.body)
        const { _id } = await newReview.save()
        res.send(newReview)
    } catch (error) {
        next(error)
    }
});


// Get All Reviews
// populate product and user model below

reviewRouter.get("/", async (req, res, next) => {
    try {
        const allReviews = await ReviewModel.find();
        res.send(allReviews);
    } catch (error) {
        next(error);
    }
});

// Get Specific Review

reviewRouter.get("/:reviewId", async (req, res, next) => {
    try {
        const review = await ReviewModel.findById(req.params.reviewId);
        res.send(review);
    } catch (error) {
        next(error)
    }
});

// Edit Review

reviewRouter.put("/:reviewId", async (req, res, next) => {
    try {
        const reviewId = req.params.reviewId
        const editedReview = await ReviewModel.findByIdAndUpdate(reviewId, req.body, { new: true });
        if (editedReview) {
            res.send(editedReview);
        } else {
            next(createHttpError(404, `Review with id ${reviewId} not found.`))
        }
    } catch (error) {
        next(error);
    }
});

// Delete Review

reviewRouter.delete("/:reviewId", async (req, res, next) => {
    try {
        const reviewId = req.params.reviewId
        const deletedReview = await ReviewModel.findByIdAndDelete(reviewId)
        if (deletedReview) {
            res.status(204).send()
        } else {
            next(createHttpError(404, `Review with id ${reviewId} not found.`))
        }
    } catch (error) {
        next(error);
    }
});

export default reviewRouter;