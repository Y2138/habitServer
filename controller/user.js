const Router = require('koa-router');
const mongoose = require('mongoose');

let router = new Router();

router.post('/regist', async (ctx) => {
    // 获取Model
    const User = mongoose.model('User');
    // 接收Post请求封装成user对象
    let newUser = new User(ctx.request.body);
    // 使用save保存用户信息
    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        }
    })
})

router.post('/login', async (ctx) => {
    // 接收数据
    let loginUser = ctx.request.body;
    let userName = loginUser.userName;
    let password = loginUser.password;
    // 引入model
    const User = mongoose.model('User');
    // 先查询用户名是否存在
    await User.findOne({userName: userName}).exec().then(async (result) => {
        if (result) {
            let newUser = new User();
            await newUser.comparePassword(password, result.password)
            .then(isMatch => {
                // 登录成功
                if (isMatch) {
                    ctx.body = {
                        code: 200,
                        message: '登录成功',
                        userInfo: result
                    }
                } else {
                    ctx.body = {
                        code: 202,
                        message: '密码错误'
                    }
                }
            })
        } else {
            ctx.body = {
                code: 201,
                message: '用户名不存在'
            }
        }
    })
})

module.exports = router;