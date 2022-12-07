import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { BadRequestError } from "../helpers/apiError";
import { prisma } from "../lib/prisma";

interface UserParamsJwtPayload {
    id: string
}

export class AuthMiddleware {
    static async execute(request: Request, response: Response, next: NextFunction) {
        const { authorization } = request.headers;

        if(!authorization) {
            return response.status(400).json({
                message: 'Token not provided'
            })
        }
    
        const [ scheme, token ] = authorization.split(' ');
    
        if(scheme.toLowerCase() !== 'bearer') {
            response.status(400).json({
                message: 'Token not provided'
            })
        }

        const tokenIsExpired = await prisma.session.findFirst({
            where: {
                session_token: token,
                is_valid: false,
            }
        })

        if(tokenIsExpired) {
            throw new BadRequestError("Token is expired")
        }
    
        const tokenDecoded = jwt.decode(token) as UserParamsJwtPayload;
    
        if(!tokenDecoded || !tokenDecoded.id) {
            response.status(400).json({
                message: 'Token not provided'
            })
        }
    
        const { id } = tokenDecoded;
        if(id) {
            request.body.id = id;
            return next();
        }
    }
}
