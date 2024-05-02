import { MiddlewareFnType } from "../types/middlewares";

const ctrlWrapper = (ctrl: MiddlewareFnType) => {
    const func: MiddlewareFnType = async (req, res, next) => {
        try {
             ctrl(req, res, next);
        } catch (error) {
            next(error);
        }
    };

    return func;
};

export default ctrlWrapper;