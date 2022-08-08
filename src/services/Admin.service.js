const USER = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwtServices = require("./jwt.service");
const Product = require("../models/Product.model");
const Bill = require("../models/Bill.model");
const Review = require("../models/Review.model");

exports.createUserAsync = async (body) => {
  try {
    const { username, password } = body;
    //check if email is already in the database
    const usernameExist = await USER.findOne({
      username: username,
    });
    if (usernameExist)
      return {
        message: "Username already exists",
        success: false,
      };
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new USER({
      username: username,
      password: hashedPassword,
    });
    await newUser.save();
    const generateToken = jwtServices.createToken({
      id: newUser._id,
      role: newUser.role,
      //expiresIn: '24h' // expires in 24 hours
    });
    return {
      message: "Successfully Create User",
      success: true,
      token: generateToken,
      username: username,
      data: newUser,
      role: 1,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.loginAsync = async (body) => {
  try {
    const { username, password } = body;
    const user = await USER.findOne({
      username: username,
    });
    if (!user) {
      return {
        message: "Invalid Username !!",
        success: false,
      };
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return {
        message: "Invalid password !!",
        success: false,
      };
    }
    const generateToken = jwtServices.createToken({
      id: user._id,
      role: user.role,
      //expiresIn: '24h' // expires in 24 hours
    });
    return {
      message: "Successfully login",
      success: true,
      data: {
        token: generateToken,
        user: user,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.quantityStatisticsAdminAsync = async (body) => {
  try {
    const totalProduct = await Product.find().count();
    const totalRevenueBill = await Bill.aggregate([
      {
        $match: {
          status: 1,
        },
      },
      {
        $group: {
          _id: null,
          sum: { $sum: "$totalMoneyBill" },
        },
      },
    ]);
    const totalBill = await Bill.find({ status: 1 }).count();
    const toatlReview = await Bill.find().count();
    return {
      message: "Successfully Quantity Statistics",
      success: true,
      data: { totalProduct, totalRevenueBill, totalBill, toatlReview },
    };
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.statisticsBillAdminAsync = async (body) => {
  try {
    const totalBill0 = await Bill.find({ status: 0 }).count();
    const totalBill1 = await Bill.find({ status: 1 }).count();
    const totalBill2 = await Bill.find({ status: 2 }).count();
    return {
      message: "Successfully Bill Statistics",
      success: true,
      data: { totalBill0, totalBill1, totalBill2 },
    };
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.getBestSellProductAdminAsync = async (body) => {
  try {
    const product = await Product.find({}, { name: 1, numberOfSold: 1 })
      .sort({ numberOfSold: -1 })
      .limit(10);
    return {
      message: "Successfully Bill Statistics",
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

exports.statisticsReviewAdminAsync = async (body) => {
  try {
    const star0 = await Review.find({ star: 0, verify: 1 }).count();
    const star1 = await Review.find({ star: 1, verify: 1 }).count();
    const star2 = await Review.find({ star: 2, verify: 1 }).count();
    const star3 = await Review.find({ star: 3, verify: 1 }).count();
    const star4 = await Review.find({ star: 4, verify: 1 }).count();
    const star5 = await Review.find({ star: 5, verify: 1 }).count();
    return {
      message: "Successfully Review Statistics",
      success: true,
      data: { star0, star1, star2, star3, star4, star5 },
    };
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.getReviewNewAdminAsync = async (body) => {
  try {
    const review = await Review.find()
      .sort({ createdAt: -1 })
      .limit(5);

    return {
      message: "Successfully Review Statistics",
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

exports.getStatisticsSellAdminAsync = async (body) => {
    try {
        const { timeStart, timeEnd } = body;
        const currentTime = new Date(timeStart);
        const start = new Date(currentTime.getTime() - 7 * 3600 * 1000);
        let endTimeByDay = new Date(timeEnd).setHours(23, 59, 59, 999);
        const end = new Date(new Date(endTimeByDay).getTime() - 7 * 3600 * 1000);
        var listBill = await Bill.find({status: 1,
            createdAt: {
                $gte: start,
                $lt: end
            }
        });
        var totalMoney = 0;
        var totalBill = listBill.length;
        listBill.forEach(e => {
            totalMoney = e.totalMoneyBill + totalMoney;
        });
        var result = {
            totalBill: totalBill,
            totalMoney: totalMoney,
            day: timeStart
        }
        return {
            message: 'Successfully Statistic By Time',
            success: true,
            data: result
        };
    } catch (e) {
      console.log(e);
      return {
        message: "An error occurred",
        success: false,
      };
    }
  };
  
