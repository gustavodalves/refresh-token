import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

export const prisma = new PrismaClient({
    log: ['query']
});

prisma.$use(async (params, next) => {
    if( params.model === "User" && params.action === "create" ) {
        const hashedPassword = await hash(params.args.data.password, 10);
        params.args.data.password = hashedPassword;
    }
      return await next(params)
})
