


export default async function wrapResult(ctx, next) {
    if(ctx.status != 404 && ctx.response.no_wrapper != true){
        const data = ctx.response.body;

        const res = {
            "code": 200,
            "data": data
        }

        ctx.status = 200;
        ctx.body = res;
    }

    await next();
    

}