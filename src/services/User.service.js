const USER = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwtServices = require("./jwt.service");
const otpGenerator = require("otp-generator");
const { sendMail } = require("./sendMail.service");
const { configEnv } = require("../config/index");

exports.registerByEmailAsync = async (body) => {
  try {
    const { email } = body;
    //check if email is already in the database
    const emailExist = await USER.findOne({
      email: email,
    });
    if (emailExist)
      return {
        message: "Email already exists",
        success: false,
      };
    var otp = await otpGenerator.generate(8, {
      upperCase: false,
      specialChars: false,
    });

    const hashedPassword = await bcrypt.hash(otp, 8);
    const mailOptions = {
      to: email,
      from: configEnv.Email,
      subject: "Đăng ký tài khoản Tram Thuy",
      text: "Mật khẩu của bạn là: " + otp,
    };
    const resultSendMail = await sendMail(mailOptions);
    if (!resultSendMail) {
      return {
        message: "Send Email Failed",
        success: false,
      };
    } else {
      const newUser = new USER({
        email: email,
        password: hashedPassword,
        username: email,
        role: 0,
        verify: true,
      });
      await newUser.save();
      const generateToken = jwtServices.createToken({
        id: newUser._id,
        role: newUser.role,
        //expiresIn: '24h' // expires in 24 hours
      });
      return {
        message: "Successfully register by email",
        success: true,
        data: {
          token: generateToken,
          user: newUser,
        },
      };
    }
  } catch (err) {
    console.log(err);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.createUserAsync = async (body) => {
  try {
    const { email, password, username } = body;
    //check if email is already in the database
    const emailExist = await USER.findOne({
      email: email,
    });
    if (emailExist)
      return {
        message: "Email already exists",
        success: false,
      };
    //check if username is already in the database
    const usernameExist = await USER.findOne({
      username: username,
    });
    if (usernameExist)
      return {
        message: "Username already exists",
        success: false,
      };
    var otp = await otpGenerator.generate(4, {
      upperCase: false,
      specialChars: false,
    });
    const hashedPassword = await bcrypt.hash(password, 8);
    const mailOptions = {
      to: email,
      from: configEnv.Email,
      subject: "Đăng ký tài khoản Tram Thuy",
      text: "Mã OTP của bạn là: " + otp,
    };

    const resultSendMail = await sendMail(mailOptions);
    if (!resultSendMail) {
      return {
        message: "Send Email Failed",
        success: false,
      };
    } else {
      const newUser = new USER({
        email: email,
        password: hashedPassword,
        username: username,
        otp: otp,
        role: 0,
      });
      await newUser.save();
      const generateToken = jwtServices.createToken({
        id: newUser._id,
        role: newUser.role,
        //expiresIn: '24h' // expires in 24 hours
      });
      return {
        message: "Successfully Register",
        success: true,
        data: generateToken,
        email: email,
        role: newUser.role,
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

exports.loginUserAsync = async (body) => {
  try {
    const { username, password } = body;
    const user = await USER.findOne({
      $or: [{ username: username }, { email: username }],
    });
    if (!user) {
      return {
        message: "Invalid Username or Email !!",
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

    if (!user.verify) {
      return {
        message: "Unverified account !!",
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

exports.loginwithGoogleAsync = async (body) => {
  try {
    const { email, name } = body;
    const user = await USER.findOne({
      email: email,
    });

    var generateToken;
    if (user != null) {
      generateToken = jwtServices.createToken({
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
    } else {
      const newUser = new USER({
        email: email,
        name: name,
        username: email,
        otp: "",
        verify: true,
      });

      await newUser.save();
      const googleUser = await USER.findOne({
        email: email,
      });
      generateToken = jwtServices.createToken({
        id: googleUser._id,
        role: googleUser.role,
        //expiresIn: '24h' // expires in 24 hours
      });
    }

    return {
      message: "Successfully login google",
      success: true,

      data: {
        token: generateToken,
        // user: user,
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

exports.findUserByIdAsync = async (id) => {
  try {
    const user = await USER.findOne({ _id: id });
    if (!user) {
      return {
        message: "Get User Fail",
        success: false,
      };
    }
    return {
      message: "Successfully Get User",
      success: true,
      data: user,
    };
  } catch (err) {
    console.log(err);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.editProfileAsync = async (id, body) => {
  try {
    const user = await USER.findOneAndUpdate({ _id: id }, body, { new: true });
    return {
      message: "Edit Profile Successfully",
      success: true,
      data: user,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.fotgotPassword = async (body) => {
  try {
    const email = body.email;
    var otp = await otpGenerator.generate(4, {
      upperCase: false,
      specialChars: false,
    });
    const result = await USER.findOneAndUpdate(
      { email: email },
      { otp: otp },
      { new: true }
    );
    if (result != null) {
      const mailOptions = {
        to: result.email,
        from: configEnv.Email,
        subject: "Quên mật khẩu Tram Thuy",
        text: "Mã OTP của bạn là: " + result.otp,
      };
      const resultSendMail = await sendMail(mailOptions);
      if (!resultSendMail) {
        return {
          message: "Send Email Failed",
          success: false,
        };
      } else {
        return {
          message: "Send Email Success",
          success: true,
        };
      }
    } else {
      return {
        message: "Do not email",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Internal Server",
      success: false,
    };
  }
};

exports.resetPassword = async (body) => {
  try {
    const { otp, password, email } = body;

    let user = await USER.findOne({ email: email });
    if (user != null) {
      if (otp == user.otp) {
        const hashedPassword = await bcrypt.hash(password, 8);
        // const otp = otpGenerator.generate(6, {
        // 	upperCase: false,
        // 	specialChars: false
        // });
        user.password = hashedPassword;
        user.otp = "";
        user.save();
        return {
          message: "Reset Password success",
          success: true,
        };
      } else {
        return {
          message: "OTP invalid",
          success: false,
        };
      }
    } else {
      return {
        message: "Do not Email",
        success: false,
      };
    }
  } catch (error) {
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.verifyUser = async (body) => {
  try {
    const { otp, email } = body;
    let user = await USER.findOne({ email: email });
    if (user != null) {
      if (otp == user.otp) {
        user.verify = true;
        user.otp = "";
        user.save();
        return {
          message: "Account Verification Successful",
          success: true,
        };
      } else {
        return {
          message: "OTP invalid",
          success: false,
        };
      }
    } else {
      return {
        message: "Do not Email",
        success: false,
      };
    }
  } catch (error) {
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.changePasswordAsync = async (id, body) => {
  try {
    const user = await USER.findOne({ _id: id });
    const oldPassword = body.oldPassword;
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return {
        message: "Wrong PassWord Old",
        success: false,
        data: user,
      };
    }
    const newPassword = await bcrypt.hash(body.newPassword, 8);
    user.password = newPassword;
    await user.save();
    return {
      message: "Change Password Successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};
