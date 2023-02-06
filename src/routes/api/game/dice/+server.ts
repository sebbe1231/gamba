import { failed, success } from '$lib/server/response'
import type { RequestHandler } from './$types'
import prisma from '$lib/server/prisma';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

export const POST: RequestHandler = async ({ request }) => {
    const weight = 3;
    const req = await request.json()
    const token = request.headers.get("Authorization")?.split("Bearer ")[1]
    
    if (!token) {
        return failed("Unauthorized", 401)
    }

    let decoded;

    try {
        decoded = jwt.verify(token, JWT_SECRET)
    } catch (err) {
        console.log(err)
        return failed("No/wrong token")
    }

    if (typeof decoded == "string") {
        return failed("Invalid JWT data");
    }

    if (req.guess < 1 || req.guess > 6) {
        return failed("Invalid guess");
    }

    if (req.bet <= 0){
        return failed("Invalid bet amount");
    }


    const user = await prisma.user.findFirst({
        where: {
            id: decoded.id
        },
        include: {
            stats: true
        }
    })

    if (Number(req.bet) > user?.stats?.money!){
        return failed(`User does not have $${req.bet}`)
    }
    
    var array = new Uint8Array(1);

    array[0] = 252;
    while (array[0] >= 252) {
        crypto.getRandomValues(array);
    }

    const num = array[0] % 6 + 1;

    let newMoney;
    let msg;
    let newData

    if (Number(req.guess) === num){
        newMoney = user?.stats?.money! + req.bet*weight - req.bet;
        msg = `Dice rolled ${num}. You won $${req.bet*weight}!`;
        newData = {
            money: newMoney,
            won: user?.stats?.won! + 1,
            deposit: user?.stats?.deposit + req.bet,
            winnings: user?.stats?.winnings! + req.bet*weight
        }
    }
    else {
        newMoney = user?.stats?.money! - req.bet;
        msg = `Dice rolled ${num}. You lost $${req.bet}.`;
        newData = {
            money: newMoney,
            lost: user?.stats?.lost! + 1,
            deposit: user?.stats?.deposit + req.bet,
        }
    }
    
    await prisma.stats.update({
        where: {
            userId: decoded.id
        },
        data: newData
    })

    const store = {
        id: user?.id,
        name: user?.name,
        money: newMoney
    }

    return success({num, store}, msg)
}