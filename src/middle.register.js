import fs from 'fs';
import path from 'path';
import koaCompose from 'koa-compose';
import { requestLog, responseLog } from "./middlewares/log";
import wrapResult from "./middlewares/wrapResult";
import catchError from './middlewares/catchError';

const bodyparser = require('koa-bodyparser');


class MiddleRegister {
    constructor(props) {
        this.target = props.target;
    }

    //注册路由中间件
    createRoutesCompose() {
        let res = [];
        fs.readdirSync(path.resolve(__dirname, './routes')).filter(i => i.indexOf('.js') != -1).map(p => {
            let currentRoute = require(path.resolve(__dirname, './routes', p)).default;
            res.push(currentRoute.routes()), res.push(currentRoute.allowedMethods());
        })
        //拆分路由数组
        return koaCompose(res);
    }


    //排列中间件
    middleRegister() {
        this.target
            .use(bodyparser())
            .use(requestLog)
            .use(catchError)
            .use(this.createRoutesCompose())
            .use(wrapResult)
            .use(responseLog)
            
    }

}

export default MiddleRegister;