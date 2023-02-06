import type { RequestHandler } from './$types'
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { failed, success } from '$lib/server/response';
import prisma from '$lib/server/prisma';

export const GET: RequestHandler = async ({ request }) => {
    const token = request.headers.get("Authorization")?.split("Bearer ")[1]

    if (!token) {
        return failed("Unauthorized", 401)
    }

    let decoded;

    try {
        decoded = jwt.verify(token, JWT_SECRET)
    } catch (err) {
        return failed("No/wrong token")
    }

    if (typeof decoded == "string") {
        return failed("Invalid JWT data");
    }

    const user = await prisma.user.findFirst({
        where: {
            id: decoded.id,
            name: decoded.name
        },
        include: {
            stats: true
        }
    })

    if (!user){
        return failed("No/wrong token")
    }

    const store = {
        id: user?.id,
        name: user?.name,
        money: user?.stats?.money
    }

    return success({token, store});
}