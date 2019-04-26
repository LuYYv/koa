import path from "path";
import fs from "fs";

class userServer {
    constructor(props) {
        this.props = props;
    }

    async userLogin(ctx) {
        let userinfo = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../static/userinfo.json')).toString());
        const { username, password } = ctx.request.body;
        let res = userinfo.users.find(i =>
            i.username == username && i.password == password
        );
        if (res) {
            return 'hahah'
        } else {
            return '11111'
        }

    }

    async userinfo(ctx) {
        let haha = await this.props.Query(`select username from hhhh where username = ?`, ['haha']);
        return haha;
    }
}

export default userServer;