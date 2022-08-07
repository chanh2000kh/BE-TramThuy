const Product = require("../models/Product.model");
exports.createProductAsync = async (body) => {
  try {
    const newProduct = new Product(body);
    await newProduct.save();
    return {
      message: "Successfully create a product",
      success: true,
      data: newProduct,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.updateProductAsync = async (body) => {
  try {
    const product = await Product.findOneAndUpdate({ _id: body.id }, body, {
      new: true,
    });

    return {
      message: "Successfully update a product",
      success: true,
      data: product,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.getAllProductAsync = async (body) => {
  try {
    const { skip, limit } = body;

    const product = await Product.find()
      .sort({ createdAt: -1 })
      .skip(Number(limit) * Number(skip) - Number(limit))
      .limit(Number(limit));
    return {
      message: "Successfully Get All Product",
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

exports.getProductTagTotalAsync = async (body) => {
  try {
    const { id } = body;
    const data = [];
    for (let i = 1; i <= 5; i++) {
      const product = await Product.find({
        productTypeId: id,
        tag: i,
      }).count();
      data.push(product);
    }

    return {
      message:
        "Successfully Get All Tag The number Of Products By Product Type Id",
      success: true,
      data: data,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.getProductBestSellAsync = async (body) => {
  try {
    const { skip, limit, increase } = body;

    const product = await Product.find()
      .sort({ numberOfSold: increase })
      .skip(Number(limit) * Number(skip) - Number(limit))
      .limit(Number(limit));
    return {
      message: "Successfully Get All Product By Number Of Sold",
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
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
exports.searchProductAsync = async (body) => {
  try {
    const { skip, limit, name } = body;
    const regex = new RegExp(escapeRegex(name), 'gi');
    const product = await Product.find({ "name": regex })
      .skip(Number(limit) * Number(skip) - Number(limit))
      .limit(Number(limit));
    return {
      message: "Successfully Get Product By Name",
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

exports.getAllProductByTypeIdAsync = async (body) => {
  try {
    const { skip, limit, productTypeId, tag, min, max } = body;
    if (tag == 0) {
      const product = await Product.find({
        productTypeId: productTypeId,
        price: { $gte: min, $lte: max },
      })
        .sort({ createdAt: -1 })
        .skip(Number(limit) * Number(skip) - Number(limit))
        .limit(Number(limit));
      const total = await Product.find({
        productTypeId: productTypeId,
        price: { $gte: min, $lte: max },
      }).count();
      //---------------------
      var pageNumber = 0;
      if (total % limit == 0) {
        pageNumber = total / limit;
      } else {
        pageNumber = Math.floor(total / limit) + 1;
      }
      return {
        message: "Successfully Get All Product By Type Id",
        success: true,
        data: { total, pageNumber, product },
      };
    } else {
      const product = await Product.find({
        productTypeId: productTypeId,
        tag: tag,
        price: { $gte: min, $lte: max },
      })
        .sort({ createdAt: -1 })
        .skip(Number(limit) * Number(skip) - Number(limit))
        .limit(Number(limit));
      const total = await Product.find({
        productTypeId: productTypeId,
        tag: tag,
        price: { $gte: min, $lte: max },
      }).count();
      return {
        message: "Successfully Get All Product By Type Id",
        success: true,
        data: { total, product },
      };
    }
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.getAllProductByTypeId1Async = async (body) => {
  try {
    const { skip, limit, tag, productTypeId, min, max, fromBigToSmall, name } = body;
    if (tag == null) {
      const product = await Product.find({
        productTypeId: productTypeId,
        price: { $gte: min, $lte: max },
      })
        .sort({ [`${name}`]: fromBigToSmall })
        .skip(Number(limit) * Number(skip) - Number(limit))
        .limit(Number(limit));
      const total = await Product.find({
        productTypeId: productTypeId,
        price: { $gte: min, $lte: max },
      }).count();
      //---------------------
      var pageNumber = 1;
      if (total % limit == 0) {
        pageNumber = total / limit;
      } else {
        pageNumber = Math.floor(total / limit) + 1;
      }
      return {
        message: "Successfully Get All Product By Type Id",
        success: true,
        data: { total, pageNumber, product },
      };
    } else {
      const tagProduct = []
      tag.forEach((data)=>{
        tagProduct.push({tag: data})
      })
      const product = await Product.find({
        $and: [
          {
            $or: tagProduct,
          },
          {
            productTypeId: productTypeId,
            price: { $gte: min, $lte: max },
          },
        ],
      })
        .sort({ [`${name}`]: fromBigToSmall })
        .skip(Number(limit) * Number(skip) - Number(limit))
        .limit(Number(limit));
      const total = await Product.find({
        $and: [
          {
              $or: tagProduct,
          },
          {
            productTypeId: productTypeId,
            price: { $gte: min, $lte: max },
          },
        ],
      }).count();
      //---------------------
      var pageNumber = 1;
      if (total % limit == 0) {
        pageNumber = total / limit;
      } else {
        pageNumber = Math.floor(total / limit) + 1;
      }
      return {
        message: "Successfully Get All Product By Type Id",
        success: true,
        data: { total, pageNumber, product },
      };
    }
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.getOneProductAsync = async (body) => {
  try {
    const { id } = body;

    const product = await Product.findOne({ _id: id });
    if (product == null) {
      return {
        message: "This product was not found",
        success: false,
        data: [],
      };
    }
    return {
      message: "Successfully Get One Product",
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
