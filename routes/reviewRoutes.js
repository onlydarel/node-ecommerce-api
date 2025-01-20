const express = require("express");
const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const router = express.Router();
router
  .route("/")
  .get(getAllReviews)
  .post(
    [authenticateUser, authorizePermissions("admin", "user")],
    createReview
  );
router
  .route("/:id")
  .get(getSingleReview)
  .patch(
    [authenticateUser, authorizePermissions("admin", "user")],
    updateReview
  )
  .delete(
    [authenticateUser, authorizePermissions("admin", "user")],
    deleteReview
  );

module.exports = router;
