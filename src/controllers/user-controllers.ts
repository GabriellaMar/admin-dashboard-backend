import { MiddlewareFnType } from "../types/middlewares";
import User from "../models/user-model/User";
 import bcrypt from "bcryptjs";
 import * as jwt from "jsonwebtoken"


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

    
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    }
    const { _id: id } = user;
    const payload : object= {
        id,
    }
    const token = jwt.sign(payload, JWT_SECRET as string, { expiresIn: "48h" });

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
    signIn: ctrlWrapper(signIn),

}
