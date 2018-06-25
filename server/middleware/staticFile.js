const send =require('koa-send');
const path = require('path');

//@FIXME
module.exports =  async (ctx, next) => {
    const url = ctx.path;
    console.log("url:"+url);
    //其余的 js 与 css 文件都走源文件
    if(url.endsWith(".js") || url.endsWith(".css")){
        //请求文件的绝对路径
        const filePath = path.join(__dirname,'../../dist/', url);
        console.log("filePath:"+filePath);
        const opts = {root: path.join(__dirname,'../../dist/')};
        return send(ctx, ctx.path, opts);      
    }else{
        return next();
    }
}