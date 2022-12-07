import { Request, Response } from "express";
import { InternalServerError } from "../../../helpers/apiError";
import { LogoutUseCase } from "./LogoutUseCase";

export class LogoutController {
    static async handle(request: Request, response: Response) {
        const { authorization } = request.headers;
        if(!authorization) {
            throw new InternalServerError('Token not provided')
        }
        const [_, token] = authorization?.split(' ')
        const session = await LogoutUseCase.execute(token)

        return response.status(200).json(session)
    }
}