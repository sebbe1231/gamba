import { success } from '$lib/server/response'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request }) => {
    const req = await request.json()
    
    const diceArray = new Uint32Array(6)
    
    const num = crypto.getRandomValues(diceArray)
    console.log(num)

    return success({num})
}