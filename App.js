import fs from 'fs';
import path from 'path';
import MainServer from './src/index';
//加载配置文件
const { SERVER_MODE, APP_CONFIG, MYSQL_CONFIG, WRITE_LOG } = JSON.parse(fs.readFileSync(path.resolve(__dirname, './config.json')).toString());
//设置环境变量
process.env.NODE_ENV = SERVER_MODE;
process.env.WRITE_LOG = WRITE_LOG;
//........
const main_server = new MainServer({
    app_config: APP_CONFIG,
    mysql_config: MYSQL_CONFIG
})
main_server.startServer()