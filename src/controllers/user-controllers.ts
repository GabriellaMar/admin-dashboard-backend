import { MiddlewareFnType } from "../types/middlewares";
import User from "../models/user-model/User";
 import bcrypt from "bcryptjs";
//  import jwt from 'jsonwebtoken';
 import { default as jwt } from 'jsonwebtoken';

import { nanoid } from "nanoid";
import ctrlWrapper from "../decorators/ctrlWrappers";
import HttpError from "../helpers/HTTPErrors";

const JWT_SECRET: string = process.env.JWT_SECRET || '';


const signUp: MiddlewareFnType = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
         throw HttpError(409, "Email in use")
    }

     const hasPassword = await bcrypt.hash(password, 10);

    // const avatarURL = gravatar.url(email);

    const varificationToken = nanoid();

     const newUser = await User.create({ ...req.body, password: hasPassword, varificationToken });

    // const verifyEmail = {
    //     to: email,
    //     subject: "Verify email",
    //     html: `<a target = "_blank" href = "${BASE_URL}/api/users/verify/${varificationToken}">Click to verify email</a>`
    // }

    // await sendEmail(verifyEmail);

    res.status(201).json({
        user: {
             userName: newUser.userName,
             email: newUser.email,
        }
    });
}

const signIn:  MiddlewareFnType = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    }

    // if (!user.verify) {
    //     throw HttpError(401, "Email not verify")
    // }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    }
    const { _id: id } = user;
    const payload = {
        id,
    }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "48h" });

    await User.findByIdAndUpdate(id, { token });

    res.status(200).json({
        token,
        user: {
            email: email,
        }
    })

}



export default {
    signUp: ctrlWrapper(signUp),
    // verify: ctrlWrapper(verify),
    // resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    signIn: ctrlWrapper(signIn),
    // logout: ctrlWrapper(logout),
    // getCurrent: ctrlWrapper(getCurrent),
    // updateAvatar: ctrlWrapper(updateAvatar),
}
