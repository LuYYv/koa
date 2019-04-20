import koaRouter from 'koa-router';

const articlerRouter = new koaRouter();

articlerRouter.prefix('/article');

articlerRouter.get('/detail', async (ctx, next) => {
    ctx.body = '/article/info'
})

export default articlerRouter;

