import { Request, Combine } from '../route.distribute';
import { userService } from "../service/index";

@Combine({ prefix: '/user' })
class UserRoute {

    @Request({ url: '/userinfo', method: 'get' })
    async userinfo(ctx, next) {
        let res = await userServer.userinfo(ctx);
        ctx.body = res;
        await next();
    }

    @Request({ url: '/userlogin', method: 'post'})
    async userlogin(ctx, next){
        let res = userService.userLogin(ctx);
        ctx.body = res;
        await next();
    }




    

    
}

export default UserRoute;