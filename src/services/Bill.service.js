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
      subject: "Xa??c nh????n ta??o ho??a ????n tha??nh c??ng!",
      text: `
            Ma?? ????n ha??ng: ${newBill._id}
            T??n: ${newBill.name}
            ?????a ch???: ${newBill.address}
            S??? ??i???n tho???i: ${newBill.phone}
            T????ng ti????n cu??a ho??a ????n: ${format1(newBill.totalMoneyBill)} VN??
            Danh sa??ch sa??n ph????m ??a?? mua:
            ${newBill.products.map((data) => {
              return `
                T??n sa??n ph????m: ${data.product.name}
                S???? l??????ng: ${data.amount}
                S???? ti????n pha??i tra?? la??: ${format1(data.totalMoney)} VN??
                
                `;
            })}

            Ca??m ??n kha??ch ha??ng ??a?? mua ha??ng cu??a chu??ng t??i!
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
