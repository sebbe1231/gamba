import { failed, success } from '$lib/server/response'
import type { RequestHandler } from './$types'
import { userTokenDecoded } from '$lib/server/stores';
import { get } from 'svelte/store'

export const GET: RequestHandler = async () => {
    const user = get(userTokenDecoded)

    return success({user})
}