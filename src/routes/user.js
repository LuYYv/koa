import { Request, Combine } from '../route.distribute';

@Combine({ prefix: '/user' })
class UserRoute {

    @Request({ url: '/userinfo', method: 'get' })
    async userinfo(ctx, next) {
        ctx.body = 'userinfo'
    }

    
}

export default UserRoute;