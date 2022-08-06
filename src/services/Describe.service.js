const Describe = require("../models/Describe.model");


exports.addDescribeAsync = async (body) => {
  try {
    const describe = new Describe(body);
    await describe.save();
    return {
      message: "Successfully Create Describe",
      success: true,
      data: describe,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};
exports.editDescribeAsync = async (body) => {
  try {
    const describe = await Describe.findOne({_id: body.id})
    if(describe == null) return {
      message: "Invalid Describe",
      success: false,
      data: [],
    };
    describe.describeName = body.describeName
    describe.listDescribe = body.listDescribe
    await describe.save();
    return {
      message: "Successfully Create Describe",
      success: true,
      data: describe,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};
exports.getDescribeAsync = async (body) => {
    try {
      const { skip, limit } = body;
      const describe = await Describe.find()
        .sort({ createdAt: -1 })
        .skip(Number(limit) * Number(skip) - Number(limit))
        .limit(Number(limit));
      return {
        message: "Successfully Get All Describe",
        success: true,
        data: describe,
      };
    } catch (e) {
      console.log(e);
      return {
        message: "An error occurred",
        success: false,
      };
    }
  };

  exports.getDescribeByIdAsync = async (body) => {
    try {
      const { id } = body;
      const describe = await Describe.findOne({_id: id})
      return {
        message: "Successfully Get Describe By ID",
        success: true,
        data: describe,
      };
    } catch (e) {
      console.log(e);
      return {
        message: "An error occurred",
        success: false,
      };
    }
  };