const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");


// const getAllProductFromCart = async (id) => {
//   //get products from the cart all
//   const listIdProductCart = await Cart.find(
//     { idUser: id },
//     { amount: 1, idProduct: 1 }
//   );
//   const data = [];
//   for (let i = 0; i < listIdProductCart.length; i++) {
//     var product = await Product.findOne({
//       _id: listIdProductCart[i].idProduct,
//     });
//     data.push({
//       amount: listIdProductCart[i].amount,
//       product: product,
//     });
//   }
//   return data;
// };

exports.getCartAsync = async (id, body) => {
  try {
    //get products from the cart all
    const listIdProductCart = await Cart.find(
      { idUser: id },
      { amount: 1, idProduct: 1 }
    );
    const data = [];
    for (let i = 0; i < listIdProductCart.length; i++) {
      var product = await Product.findOne({
        _id: listIdProductCart[i].idProduct,
      });
      data.push({
        amount: listIdProductCart[i].amount,
        product: product,
      });
    }

    return {
      message: "Successfully Add Product To Cart !!",
      success: true,
      data: data,
    };

   
  } catch (err) {
    console.log(err);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};
exports.getCartHaventTokenAsync = async ( body) => {
  try {
    const data = [];
    for (let i = 0; i < body.listCart.length; i++) {
      var product = await Product.findOne({
        _id: body.listCart[i].idProduct,
      });
      data.push({
        amount: body.listCart[i].amount,
        product: product,
      });
    }

    return {
      message: "Successfully Add Product To Cart !!",
      success: true,
      data: data,
    };

   
  } catch (err) {
    console.log(err);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.addCartAsync = async (id, body) => {
  try {
    const cart = await Cart.findOne({
      idUser: id,
      idProduct: body.idProduct,
    });
    if (cart) {
      const newAmount = cart.amount + body.amount;
      cart.amount = newAmount;
      await cart.save();
    } else {
      const newCart = new Cart({
        idUser: id,
        amount: body.amount,
        idProduct: body.idProduct,
      });
      await newCart.save();
    }

    //get products from the cart all
    const listIdProductCart = await Cart.find(
      { idUser: id },
      { amount: 1, idProduct: 1 }
    );
    const data = [];
    for (let i = 0; i < listIdProductCart.length; i++) {
      var product = await Product.findOne({
        _id: listIdProductCart[i].idProduct,
      });
      data.push({
        amount: listIdProductCart[i].amount,
        product: product,
      });
    }

    return {
      message: "Successfully Add Product To Cart !!",
      success: true,
      data: data,
    };
  } catch (err) {
    console.log(err);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.updateCartAsync = async (id, body) => {
  try {
    const cart = await Cart.findOne({
      idUser: id,
      idProduct: body.idProduct,
    });
    if (cart) {
      const newAmount = body.amount;
      cart.amount = newAmount;
      await cart.save();
    } else {
      const newCart = new Cart({
        idUser: id,
        amount: body.amount,
        idProduct: body.idProduct,
      });
      await newCart.save();
    }

    //get products from the cart all
    const listIdProductCart = await Cart.find(
      { idUser: id },
      { amount: 1, idProduct: 1 }
    );
    const data = [];
    for (let i = 0; i < listIdProductCart.length; i++) {
      var product = await Product.findOne({
        _id: listIdProductCart[i].idProduct,
      });
      data.push({
        amount: listIdProductCart[i].amount,
        product: product,
      });
    }

    return {
      message: "Successfully Update Amount Product To Cart !!",
      success: true,
      data: data,
    };
  } catch (err) {
    console.log(err);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.deleteCartAsync = async (id, body) => {
  try {
    const cart = await Cart.findOneAndDelete({
      idUser: id,
      idProduct: body.idProduct,
    });
    //   if (cart) {
    //     cart.remove();
    //   } else {
    //     return {
    //         message: "Don't Product In Cart to Delete!!",
    //         success: false,
    //       };
    //   }

    //get products from the cart all
    const listIdProductCart = await Cart.find(
      { idUser: id },
      { amount: 1, idProduct: 1 }
    );
    const data = [];
    if (listIdProductCart != null) {
      for (let i = 0; i < listIdProductCart.length; i++) {
        var product = await Product.findOne({
          _id: listIdProductCart[i].idProduct,
        });
        data.push({
          amount: listIdProductCart[i].amount,
          product: product,
        });
      }
    }

    return {
      message: "Successfully Delete Product To Cart !!",
      success: true,
      data: data,
    };
  } catch (err) {
    console.log(err);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};
