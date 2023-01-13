import type { RequestHandler } from './$types'
import prisma from '$lib/server/prisma';
import { failed, success} from '$lib/server/response'
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

export const POST: RequestHandler = async ({ request }) => {
    let req = await request.json()

    const user = await prisma.user.findFirst({
        where: {
            name: req.name,
            password: req.password
        },
    })

    if (!user) {
        return failed("Wrong username")
    }

    const token = jwt.sign({id: user?.id, name: user?.name}, JWT_SECRET)

    return success({token})
}