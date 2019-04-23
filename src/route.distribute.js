import Router from 'koa-router';


const MethodMap = {
    GET: 'get',
    POST: 'post'
}

export function Request({ url, method }) {
    return function (target, name, descriptor) {
        let callback = descriptor.value;
        descriptor.value = (router) => {
            router[MethodMap[method.toUpperCase()] || 'get'](url, async (ctx, next) => {
                await callback(ctx, next);
            })
        }
    }
}

export function Combine({ prefix }) {
    //分别实例化router,避免混淆
    const router = new Router();
    if (prefix) { router.prefix(prefix) }
    return function (target) {
        //获取所有类属性
        let requestList = Object.getOwnPropertyDescriptors(target.prototype);
        Object.keys(requestList).map(i => {
            if (i != 'constructor') {
                requestList[i].value(router)
            }
        })
        return router;
    }

} 