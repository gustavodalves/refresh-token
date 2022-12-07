import { Request, Response } from "express";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

export class RefreshTokenController {
    static async handle(request: Request, response: Response) {
        const { refresh_token } = request.body;

        const { access_token } = await RefreshTokenUseCase.execute(refresh_token);

        return response.status(200).json({
            access_token
        })
    }
}
