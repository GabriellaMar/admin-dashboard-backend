import { Router } from "express";
import authController from '../controllers/user-controllers';
import validateBodyWrapper from "../decorators/validateBodyWrapper";
import { userSignInJoiSchema, userSignUpJoiSchema } from "../shemas/user-schema";

const authRouter: Router = Router();

const userSignUpValidate = validateBodyWrapper(userSignUpJoiSchema);
const userSignIpValidate = validateBodyWrapper(userSignInJoiSchema)

authRouter.post("/sign_up", userSignUpValidate, authController.signUp);
authRouter.post("/sign_in", userSignIpValidate, authController.signIn);



export default authRouter