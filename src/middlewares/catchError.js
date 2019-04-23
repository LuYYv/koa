import path from 'path';
import fs from 'fs';

const errorMap = {
    4001: "测试错误",
    4002: "数据库连接错误"
}

const catchError = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        if (typeof error == 'number') {
            const errMsg = errorMap[error] || '未知错误';
            ctx.response.body = {
                code: error,
                msg: errMsg
            }
            console.log(`Catch error ${JSON.stringify(ctx.response.body)}`);
            ctx.status = 200;
        } else {
            console.log(error);
            if (process.env.WRITE_LOG == 'true') {
                writeErrorLog(ctx.request, error);
            }
            ctx.status = 500;
        }
    }
}

const writeErrorLog = (request, error) => {
    let logsDirPath = path.resolve(__dirname, '../../logs');
    if (!fs.existsSync(logsDirPath)) {
        fs.mkdirSync(logsDirPath);
    }
    let logFilePath = path.resolve(__dirname, '../../logs', new Date().toLocaleDateString().replace(/\//g, '-') + '.log');
    const { url, method } = request;
    let writeError = `TIME: ${new Date().toLocaleString().replace(/\//g, '-')}\nURL: ${url}\nMETHOD: ${method}\nERROR: ${error}\n\n`;
    if (fs.existsSync(logFilePath)) {
        fs.appendFile(logFilePath, writeError, (err) => {
            if (!err) { console.log('错误已记录') }
            else { console.log(err) }
        })
    } else {
        fs.writeFile(logFilePath, new Buffer.from(writeError), (err) => {
            if (!err) { console.log('错误已记录') }
            else { console.log(err) }
        })
    }
}


export default catchError;
