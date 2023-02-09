import type { RequestHandler } from './$types'
import prisma from '$lib/server/prisma';
import { Prisma } from '@prisma/client';
import { failed, success } from '$lib/server/response';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import { userTokenDecoded, type User } from '$lib/stores';

export const POST: RequestHandler = async ({ request }) => {
    let req = await request.json()

    let user;
    try {
        user = await prisma.user.create({
            data: {
                name: req.name,
                password: req.password,
                stats: {
                    create: {}
                },
                userSettings: {
                    create: {}
                }
            },
            include: {
                stats: true
            }
        })
    }
    catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return failed("User already exists!")
            }
        }
    }
    const token = jwt.sign({id: user?.id, name: user?.name}, JWT_SECRET)

    const store = {
        id: user?.id,
        name: user?.name,
        money: user?.stats?.money
    }

    return success({token, store});
}