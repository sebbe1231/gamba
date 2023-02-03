import { failed, success } from '$lib/server/response'
import type { RequestHandler } from './$types'
import prisma from '$lib/server/prisma';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

export const POST: RequestHandler = async ({ request }) => {
    const req = await request.json()
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


    const money = await prisma.stats.findFirst({
        where: {
            userId: decoded.id
        },
        select: {
            money: true
        }
    })

    if (Number(req.bet) > money!.money!){
        return failed(`User does not have $${req.bet}`)
    }
    
    var array = new Uint8Array(1);

    array[0] = 252;
    while (array[0] >= 252) {
        crypto.getRandomValues(array);
    }

    const guess = Number(req.guess)
    const num = array[0] % 6 + 1;

    if (guess === num){
        await prisma.stats.update({
            where: {
                userId: decoded.id
            },
            data: {
                money: money!.money + req.bet*2
            }
        })
        decoded.money = money!.money + req.bet*2
        console.log(decoded)
        return success({num, decoded}, `Dice rolled ${num}. You won $${req.bet*4}!`)
    }
    
    await prisma.stats.update({
        where: {
            userId: decoded.id
        },
        data: {
            money: money!.money - req.bet
        }
    })
    decoded.money = money!.money - req.bet
    console.log(decoded)
    return success({num, decoded}, `Dice rolled ${num}. You lost $${req.bet}.`)
}