const path = require("path");
const send = require("koa-send");
// 静态资源请求路径处理
module.exports = async(ctx,next)=>{
	//过滤请求类型
	if(ctx.path.indexOf('dist') > -1){
		const opts = {root: path.join(__dirname,'')};
		//定义处理路径的请求文件类型
		const  matchArr = ['js','css','img','png','jpg'];
		const reqPath = ctx.path,
		      param = ctx.querystring,
		      indexSuffix = reqPath.lastIndexOf('.'),
		      filePath = reqPath.substring(0, indexSuffix),
	          suffix = reqPath.substring(indexSuffix + 1);
	    if (filePath && suffix && matchArr.indexOf(suffix) >= 0){
	    	const file = path.resolve(__dirname,reqPath);
	    	console.log("path:"+ctx.path);
	    	return send(ctx,ctx.path);
	    }
	}else{
		return next();
	}
	
}