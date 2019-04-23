import Koa from 'koa';
import MiddleRegister from './middle.register';

class MainServer {
    constructor(props) {
        this.props = props;
    }

    startServer() {
        const { app_config } = this.props;
        if (!app_config) {
            console.error('app_config required');
            return;
        }
        this.createServer(app_config);
    }

    createServer(app_config) {
        const { LISTEN_PORT } = app_config;
        this.server = new Koa();
        new MiddleRegister({ target: this.server }).middleRegister();
        // this.server.use(async (ctx) => {
        //     ctx.body = 'hahahah'
        // })

        this.server.listen(LISTEN_PORT, (err) => {
            if (err) { console.log(err) }
            else { console.log(`running at ${LISTEN_PORT}`) }
        })
    }

}

export default MainServer;