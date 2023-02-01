export const failed = (msg: string, status = 400) => {
    return new Response(JSON.stringify({
        success: false,
        message: msg
    }), {
        headers: {
            "content-type": "application/json"
        }, status
    })
}

export const success = (data: any = null, msg: any = null, status = 200) => {
    return new Response(JSON.stringify({
        success: true,
        message: msg,
        data
    }), {
        headers: {
            "content-type": "application/json"
        }, status
    })
}