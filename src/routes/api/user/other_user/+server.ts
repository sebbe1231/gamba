import { failed, success } from '$lib/server/response'
import type { RequestHandler } from './$types'
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import prisma from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request }) => {
    const req = await request.json()
    const token = request.headers.get("Authorization")?.split("Bearer ")[1]

    return(success({data: "lol"}))
}