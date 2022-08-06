const Bill = require("../models/Bill.model");
const BillDetail = require("../models/BillDetail.model");
const Product = require("../models/Product.model");
const jwtServices = require("./jwt.service");
const otpGenerator = require("otp-generator");
const { sendMail } = require("./sendMail.service");
const { configEnv } = require("../config/index");
function format1(n) {
  return n.toFixed(0).replace(/./g, function (c, i, a) {
    return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
  });
}
exports.getBillAsync = async (id, body) => {
  try {
    const listBill = await Bill.find({ idUser: id });
    return {
      message: "Successfully Get Bill",
      success: true,
      data: listBill,
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Internal Server",
      success: false,
    };
  }
};

exports.getBillByStatusAsync = async (body) => {
  try {
    const { skip, limit, status } = body;

    const listBill = await Bill.find({ status: status })
      .sort({ createdAt: -1 })
      .skip(Number(limit) * Number(skip) - Number(limit))
      .limit(Number(limit));
    return {
      message: "Successfully Get list Bill",
      success: true,
      data: listBill,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.changeStatusAsync = async (body) => {
  try {
    const bill = await Bill.findOne({ _id: body.billId });
    if (bill == null) {
      return {
        message: "Invalid bill",
        success: false,
      };
    }
   
    if (body.status == 1) {
      for (let i = 0; i < bill.products.length; i++) {
        var product = await Product.findOne({
          _id: bill.products[i].product._id,
        });
        var add = product.numberOfSold + bill.products[i].amount;
        product.numberOfSold = add;
        var calculateAmount = product.numberOfRemain - bill.products[i].amount;
        if(calculateAmount < 0) return {
          message: "Not enough products to confirm!",
          success: false,
          data: product.numberOfRemain
        };
        product.numberOfRemain = calculateAmount
        await product.save()
      }
    }
    bill.status = body.status;
    await bill.save();
    return {
      message: "Successfully change bill status",
      success: true,
      data: bill,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.getBillByIdAsync = async (body) => {
  try {
    const bill = await Bill.findOne({ _id: body.id });
    return {
      message: "Successfully Get A Bill",
      success: true,
      data: bill,
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Internal Server",
      success: false,
    };
  }
};
exports.createBillAsync = async (id, body) => {
  try {
    var newBill = new Bill(body);
    newBill.idUser = id;
    const products = [];
    var totalMoneyBill = 0;
    for (let i = 0; i < newBill.products.length; i++) {
      var product = await Product.findOne({
        _id: newBill.products[i].product._id,
      });
      var totalMoney = newBill.products[i].amount * product.price;

      totalMoneyBill = totalMoneyBill + totalMoney;

      products.push({
        totalMoney: totalMoney,
        product: product,
        amount: newBill.products[i].amount,
      });
    }
    // newBill.products.map(async (data)=>{
    //     var product = await Product.findOne({_id: data.product._id})
    //     var totalMoney = data.amount * product.price

    //     totalMoneyBill = totalMoneyBill + totalMoney

    //     products.push({
    //         totalMoney: totalMoney,
    //         product: product,
    //         amount: data.amount
    //     });
    // })
    // console.log(products)
    console.log(totalMoneyBill);
    newBill.totalMoneyBill = totalMoneyBill;
    newBill.products = products;
    await newBill.save();
    const mailOptions = {
      to: body.email,
      from: configEnv.Email,
      subject: "Xác nhận tạo hóa đơn thành công!",
      text: `
            Mã đơn hàng: ${newBill._id}
            Tên: ${newBill.name}
            Địa chỉ: ${newBill.address}
            Số điện thoại: ${newBill.phone}
            Tổng tiền của hóa đơn: ${format1(newBill.totalMoneyBill)} VNĐ
            Danh sách sản phẩm đã mua:
            ${newBill.products.map((data) => {
              return `
                Tên sản phẩm: ${data.product.name}
                Số lượng: ${data.amount}
                Số tiền phải trả là: ${format1(data.totalMoney)} VNĐ
                
                `;
            })}

            Cảm ơn khách hàng đã mua hàng của chúng tôi!
            `,
    };
    const resultSendMail = await sendMail(mailOptions);
    if (!resultSendMail) {
      return {
        message: "Send Email Failed",
        success: false,
      };
    } else {
      return {
        message: "Successfully Create Bill",
        success: true,
        data: newBill,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      error: "Internal Server",
      success: false,
    };
  }
};
exports.createBillHaventTokenAsync = async (body) => {
  try {
    var newBill = new Bill(body);
    const products = [];
    var totalMoneyBill = 0;
    for (let i = 0; i < newBill.products.length; i++) {
      var product = await Product.findOne({
        _id: newBill.products[i].product._id,
      });
      if (product.size.length > 0)
        var totalMoney =
          newBill.products[i].amount *
          (product.price +
            Number(product.size[newBill.products[i].check].priceAdd));

      if (product.type.length > 0)
        var totalMoney =
          newBill.products[i].amount *
          (product.price +
            Number(product.type[newBill.products[i].check].priceAdd));
      if (product.type.length == 0 && product.size.length == 0)
        var totalMoney = newBill.products[i].amount * product.price;
      totalMoneyBill = totalMoneyBill + totalMoney;

      products.push({
        totalMoney: totalMoney,
        product: product,
        amount: newBill.products[i].amount,
        check: newBill.products[i].check,
      });
    }
    newBill.totalMoneyBill = totalMoneyBill;
    newBill.products = products;
    await newBill.save();
    const mailOptions = {
      to: body.email,
      from: configEnv.Email,
      subject: "Xác nhận tạo hóa đơn thành công!",
      text: `
            Mã đơn hàng: ${newBill._id}
            Tên: ${newBill.name}
            Địa chỉ: ${newBill.address}
            Số điện thoại: ${newBill.phone}
            Tổng tiền của hóa đơn: ${format1(newBill.totalMoneyBill)} VNĐ
            Danh sách sản phẩm đã mua:
            ${newBill.products.map((data) => {
              return `
                Tên sản phẩm: ${data.product.name}
                Số lượng: ${data.amount}
                Số tiền phải trả là: ${format1(data.totalMoney)} VNĐ
                
                `;
            })}

            Cảm ơn khách hàng đã mua hàng của chúng tôi!
            `,
    };
    const resultSendMail = await sendMail(mailOptions);
    if (!resultSendMail) {
      return {
        message: "Send Email Failed",
        success: false,
      };
    } else {
      return {
        message: "Successfully Create Bill",
        success: true,
        data: newBill,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      error: "Internal Server",
      success: false,
    };
  }
};
