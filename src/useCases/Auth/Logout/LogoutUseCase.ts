import { BadRequestError } from "../../../helpers/apiError";
import { prisma } from "../../../lib/prisma";

export class LogoutUseCase {
    static async execute(token: string) {
        const session = await prisma.session.update({
            where: {
                session_token: token,
            },
            data: {
                is_valid: false
            }
        })

        if(!session) {
            throw new BadRequestError('Invalid token')
        }

        return session
    }
}
