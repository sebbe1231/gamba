import type { RequestHandler } from './$types'
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { failed, success } from '$lib/server/response';
import prisma from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request }) => {
    let req = await request.json()

    let decoded;

    try {
        decoded = jwt.verify(req.token, JWT_SECRET)
    } catch (err) {
        return failed("No/wrong token")
    }

    if (typeof decoded == "string") {
        return failed("Invalid JWT data");
    }

    const money = await prisma.stats.findFirst({
        where: {
            userId: decoded.id
        },
        select: {
            money: true
        }
    })

    decoded.money = money!.money

    return success({decoded});
}