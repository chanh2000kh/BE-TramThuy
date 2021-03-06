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
    const listBill = await Bill.find({idUser: id})
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
