const Review = require("../models/Review.model");
const Product = require("../models/Product.model");

exports.addReviewAsync = async (body) => {
  try {
    const review = new Review(body);
    await review.save();
    return {
      message: "Successfully Create review",
      success: true,
      data: review,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};
exports.verifyReviewAsync = async (body) => {
  try {
    const review = await Review.findOne({ _id: body.reviewId });
    if (review == null) {
      return {
        message: "Invalid review",
        success: false,
      };
    }
    review.verify = body.verify;
    await review.save();
    if (body.verify == 1) {
      const listReview = await Review.aggregate([
        {
          $match: {
            productId: review.productId,
          },
        },
        {
          $group: {
            _id: "$productId",
            totalAmount: { $sum: "$star" },
            count: { $sum: 1 },
          },
        },
      ]);
      if (listReview == null)
        return {
          message: "No reviews found to calculate",
          success: false,
        };
      var average = (listReview[0].totalAmount / listReview[0].count).toFixed(
        1
      );
      const product = await Product.findOne({ _id: review.productId });
      if (product == null)
        return {
          message: "Invalid product",
          success: false,
        };
      product.star = average;
      product.numberOfReview = listReview[0].count;
      console.log(product.star);
      await product.save();
      return {
        message: "Successfully verify review",
        success: true,
        data: { review, product, listReview, average },
      };
    }

    return {
      message: "Successfully change review",
      success: true,
      data: review,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.getReviewByIdProductAsync = async (body) => {
  try {
    const { skip, limit, productId } = body;
    const product = await Review.find({ productId: productId, verify: 1 })
      .sort({ createdAt: -1 })
      .skip(Number(limit) * Number(skip) - Number(limit))
      .limit(Number(limit));
    return {
      message: "Successfully Get All Review By Product Id",
      success: true,
      data: product,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.getAllReviewAsync = async (body) => {
  try {
    const { skip, limit } = body;
    const review = await Review.aggregate([
      {
        $match: {
          verify: 0,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productList",
        },
      },
    ])
      .sort({ createdAt: -1 })
      .skip(Number(limit) * Number(skip) - Number(limit))
      .limit(Number(limit));
    return {
      message: "Successfully Get All Review have verify 0 ",
      success: true,
      data: review,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.getAllReviewNewAsync = async (body) => {
  try {
    const { skip, limit } = body;
    const review = await Review.aggregate([
      {
        $match: {
          verify: 1,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productList",
        },
      },
    ])
      .sort({ createdAt: -1 })
      .skip(Number(limit) * Number(skip) - Number(limit))
      .limit(Number(limit));
    return {
      message: "Successfully Get All Review have verify 0 ",
      success: true,
      data: review,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};
