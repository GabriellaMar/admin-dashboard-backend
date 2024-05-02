
import HttpError from "../helpers/HTTPErrors";
import { MiddlewareFnType } from "../types/middlewares";
import { Schema } from "joi";

const validateBodyWrapper = (schema:  Schema) => {
    const func: MiddlewareFnType = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return next(HttpError(400, error.message));
        }
        next();
    }

    return func;
}

export default validateBodyWrapper;