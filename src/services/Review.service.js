const Review = require('../models/Review.model');


exports.addReviewAsync = async body => {
    try {
        const review = new Review(body)
        await review.save();
        return {
            message: 'Successfully Create review',
            success: true,
            data: review
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.verifyReviewAsync = async body => {
    try {
        const review = await Review.findOne({_id: body.reviewId})
        if(review == null)
        {
            return {
                message: 'Invalid review',
                success: false,
            };
        }
        review.verify = body.verify;
        await review.save();
        return {
            message: 'Successfully verify review',
            success: true,
            data: review
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};