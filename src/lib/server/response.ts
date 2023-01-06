export const failed = (msg: string, status = 400) => {
    return new Response(JSON.stringify({
        success: false,
        message: "User already exists"
    }), {
        headers: {
            "content-type": "application/json"
        }, status
    })
}

export const success = (data: any = null, status = 200) => {
    return new Response(JSON.stringify({
        success: true,
        message: null,
        data
    }), {
        headers: {
            "content-type": "application/json"
        }, status
    })
}