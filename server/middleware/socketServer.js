const db = require('../dao/db.js');
const {pool,sqlOpration} = db;

module.exports = {
	socketServer:function(socket){
		socket.on("selected",function(data){
			// we tell the client to execute 'new message'
			console.log("检测到消息",data)
			pool.getConnection(function(err,connection){
    		// 先根据名称判断数据库是否已存在
			connection.query("select * from lunch where name = ?",[data],function(erro,results,fields){
					connection.release();
					if(results[0]){
						socket.broadcast.emit('selected', {
					      "name":data,
					      "sum":results[0].count+=1
					    });
					}else{
						
					}
				})
			})
		    
		});
		socket.on("new",function(data){
			console.log("UA消息",data);
			socket.broadcast.emit("new",{
				message:data
			});
		});
	}
};