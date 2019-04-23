export async function requestLog(ctx, next) {
    console.log(ctx.request.body);
    await next();
}

export async function responseLog(ctx, next) {
    console.log(ctx.body);
    await next();
}