const mongoose = require('mongoose');
const db = 'mongodb://localhost/habit';

// 引入 schema
const glob = require('glob');
const path = require('path');
exports.initSchemas = () => {
    glob.sync(path.resolve(__dirname, './model', '*.js')).forEach(require)
}
 
exports.connect = () => {
    // 连接数据库
    mongoose.connect(db, {useNewUrlParser: true})
    // 数据库连接失败
    mongoose.connection.on('disconnected', () => {
        mongoose.connect(db);
    });

    // 数据库出现错误
    mongoose.connection.on('error', err => {
        console.log(err);
        mongoose.connect(db);
    })
    // 数据库连接成功
    mongoose.connection.on('open', err => {
        console.log('DataBase Connect Success');
    })
}