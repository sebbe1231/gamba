import { failed, success } from '$lib/server/response'
import type { RequestHandler } from './$types'
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import prisma from '$lib/server/prisma';

export const GET: RequestHandler = async ({ request }) => {
    const token = request.headers.get("Authorization")?.split("Bearer ")[1]

    if (!token) {
        return failed("Unauthorized", 401)
    }
    console.log(token)

    let decoded;

    try {
        decoded = jwt.verify(token, JWT_SECRET)
        console.log(decoded)
    } catch (err) {
        console.log(err)
        return failed("No/wrong token")
    }

    if (typeof decoded == "string") {
        return failed("Invalid JWT data");
    }

    const user = await prisma.user.findFirst({
        where: {
            id: decoded.id
        },
        include: {
            stats: true,
        }
    })

    user!.password = ""

    return success({user})
}