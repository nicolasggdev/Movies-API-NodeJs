// Import Model
const { User } = require("../model/user.model");
const { Review } = require("../model/review.model");

// Import Utils
const { AppError } = require("../middleware/appError");
const { catchAsync } = require("../middleware/catchAsync");

exports.userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id, status: "active" },
    include: [{ model: Review }],
    attributes: { exclude: ["password"] }
  });

  if (!user) {
    return next(new AppError(404, "Cant find the user with the given ID"));
  }

  req.user = user;

  next();
});

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { currentUser } = req;

  if (currentUser.id !== +id) {
    return next(new AppError(403, "You cant update others users accounts"));
  }

  next();
});
