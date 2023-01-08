import type { RequestHandler } from './$types'
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { failed, success } from '$lib/server/response';
import { userTokenDecoded } from '$lib/server/stores';

export const POST: RequestHandler = async ({ request }) => {
    let req = await request.json()

    let decoded;

    try {
        decoded = jwt.verify(req.token, JWT_SECRET)
    } catch (err) {
        return failed("No/wrong token")
    }

    userTokenDecoded.set(decoded)
    return success({decoded});
}