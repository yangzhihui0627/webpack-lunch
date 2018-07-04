const Router = require('koa-router');
const router = Router();
const db = require('../dao/db.js');
var path = require('path');
var fs = require('fs');
const {pool,sqlOpration} = db;

router.get('/', async(ctx,next) => {
	console.log('ctx-url:'+ctx.url);
	var page = fs.readFileSync(path.join(__dirname,'../../dist/index.html'),'utf-8');
	return ctx.body = page;
});

router.get('/addCategory', async(ctx, next) => {
    let name = ctx.query.name;
    pool.getConnection(function(err,connection){
    		// 先根据名称判断数据库是否已存在
			connection.query("select * from lunch where name = ?",[name],function(erro,results,fields){
					connection.release();
					if(results[0]){
						console.log("添加内容已存在");
						return ctx.body = {"status":"rename"};
					}else{
						console.log("开始添加内容了。。。");
						var post  = {"name": name, "count": 0};
					    pool.getConnection(function(err,connection){
								connection.query("INSERT INTO `mysql`.`lunch` SET ?",post,function(erro,results,fields){
										connection.release();
										return ctx.body = {"status":"success"};
									})
								})
					}
					
				})
			})
    return ctx.body = {"status":"success"};
});

router.get('/countCategory',async(ctx,next) =>{
	console.log("添加类型："+ctx.query.name);
	let name = ctx.query.name;
	let count = 1;
	pool.getConnection(function(err,connection){
		connection.query("select * from lunch where name = ?",[name],function(error,results,fields){
			console.log("数据查询结果..."+results[0].name);
			count += results[0].count;
			connection.release();
			pool.getConnection(function(err,connection){
			connection.query('UPDATE lunch SET count = ? WHERE name = ?',[count,name],function(erro,results,fields){
					connection.release();
					console.log("更新的count值："+count + "  name值:"+name);
				})
			})
		})
	})
	// mysql.query("select * from lunch where name = ?",[ctx.query.name],function(error,results,fields){
	// 	console.log("数据查询结果..."+results[0].name);
	// 	count += results[0].count;
	// })
	
	// mysql.query("UPDATE lunch SET count = ? WHERE name = ?",[count,name],function(erro,results,fields){
	// 	console.log("更新的count值："+count + "  name值:"+name);
	// })
	
	return ctx.body = {"status":"success"};
})

router.get('/selectAll', async(ctx, next) => {
	//查询数据库需要等待，因此做了异步处理
	let output = await sqlOpration({"type":"select"});
    return ctx.body = {"status":"success","data":output};
});

router.get('/reset', async(ctx, next) => {
	//查询数据库需要等待，因此做了异步处理
	let output = await sqlOpration({"type":"update"});
    return ctx.body = {"status":"success"};
})
router.get('/socket.io',async(ctx,next) =>{
	return next();
})
module.exports = router;
