const Review = require("../models/Review");
const { BadRequestError, NotFoundError } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const { checkPermissions } = require("../utils");

// createReview creates a review
const createReview = async (req, res) => {
  const { product: productId } = req.body;

  const isValidProduct = await Product.findById(productId);

  if (!isValidProduct)
    throw new NotFoundError(
      "The product you are trying to review does not exist"
    );

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });
  if (alreadySubmitted)
    throw new BadRequestError(
      "User has already submitted a review for this product!"
    );

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

// getAllReviews get all reviews
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({path: 'product', select: 'name company price'}).populate({path: 'user', select: 'name'});

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

// getSingleReview get a single review
const getSingleReview = async (req, res) => {
  const review = await Review.findById(req.params.id).populate({path: 'product', select: 'name company price'}).populate({path: 'user', select: 'name'});
  if (!review) throw new NotFoundError("Review not found!");

  res.status(StatusCodes.OK).json({ review });
};

// updateReview updates a review
const updateReview = async (req, res) => {
    const { id: reviewId } = req.params;
    const { rating, title, comment } = req.body;
    // Find the review by ID
    const review = await Review.findOne({ _id: reviewId });
    
    // If no review is found, throw an error
    if (!review) {
        throw new NotFoundError(`No review found with id: ${reviewId}`);
    }
    // Check user permissions
    checkPermissions(req.user, review.user);
  
    // Update fields and save
    review.rating = rating || review.rating;
    review.title = title || review.title;
    review.comment = comment || review.comment;
  
    await review.save();
  
    res.status(StatusCodes.OK).json({ review });
  };

// deleteReview deletes a review
const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) throw new NotFoundError(`No review with id: ${reviewId}`);
  checkPermissions(req.user, review.user);
  await Review.deleteOne({ _id: reviewId });
  res.status(StatusCodes.OK).json({ msg: "Review removed successfully" });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
