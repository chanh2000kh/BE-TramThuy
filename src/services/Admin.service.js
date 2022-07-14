const USER = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwtServices = require('./jwt.service');

exports.createUserAsync = async body => {
    try {
        const { username, password } = body;
        //check if email is already in the database
        const usernameExist = await USER.findOne({
            username: username
        });
        if (usernameExist)
            return {
                message: 'Username already exists',
                success: false
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
            message: 'Successfully Create User',
            success: true,
            token: generateToken,
            username: username,
            data: newUser,
            role: 1
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
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
        console.log(user);
        const generateToken = jwtServices.createToken({
            id: user._id,
            role: user.role,
            //expiresIn: '24h' // expires in 24 hours
        });
        console.log(generateToken);

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

