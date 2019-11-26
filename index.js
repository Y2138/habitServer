const Koa = require('koa');
const app = new Koa();

// 解决跨域
const cors = require('koa2-cors');
app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true
}));

// 接收Post请求
const  bodyParser = require('koa-bodyparser');
app.use(bodyParser())

// 加载路由
const Router = require('koa-router');
let user = require('./controller/user.js');

let router = new Router();
router.use('/user', user.routes());

app.use(router.routes());
// 设置允许的请求方式
app.use(router.allowedMethods)


// 初始化数据库连接和model
const {connect, initSchemas} = require('./init');
(async () => {
    await connect();
    initSchemas();
})();


app.use(async (ctx) => {
    ctx.body = 'hello world'
})

app.listen(3000, () => {
    console.log('start server in 3000')
})