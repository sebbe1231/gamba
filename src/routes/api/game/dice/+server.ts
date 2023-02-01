import { failed, success } from '$lib/server/response'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request }) => {
    const req = await request.json()
    
    var array = new Uint8Array(1);

    array[0] = 252;
    while (array[0] >= 252) {
        crypto.getRandomValues(array);
    }

    const guess = Number(req.guess)
    const num = array[0] % 6 + 1;

    if (guess === num){
        return success({num}, `Dice rolled ${num}. You won!`)
    }
    
    return success({num}, `Dice rolled ${num}. You lost.`)
}