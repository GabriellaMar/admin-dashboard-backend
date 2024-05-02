import { Request, Response, NextFunction } from "express";


export type MiddlewareFnType = (req: Request, res: Response, next: NextFunction) => void;

export type MiddlewareFnWithActionType = (req: Request, res: Response, action: string, next: NextFunction) => void;