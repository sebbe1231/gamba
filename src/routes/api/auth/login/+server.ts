import type { RequestHandler } from './$types'
import prisma from '$lib/server/prisma';
import { failed, success} from '$lib/server/response'
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { userTokenDecoded, type User } from '$lib/stores';

export const POST: RequestHandler = async ({ request }) => {
    let req = await request.json()

    const user = await prisma.user.findFirst({
        where: {
            name: req.name,
            password: req.password
        },
        include: {
            stats: true
        }
    })

    if (!user) {
        return failed("Wrong username or password")
    }

    const token = jwt.sign({id: user?.id, name: user?.name}, JWT_SECRET)

    const store = {
        id: user?.id,
        name: user?.name,
        money: user?.stats?.money
    }

    return success({token, store})
}