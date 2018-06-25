var mysql = require('mysql');
//配置数据库链接
var pool = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'mysql',
  typeCast :  true
});

pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});
// The pool will emit an enqueue event when a callback has been queued to wait for an available connection.
pool.on('enqueue', function () {
  console.log('Waiting for available connection slot');
});

pool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});

// pool.end(function (err) {
//   // all connections in the pool have ended
// });
// pool.getConnection(function(err,connection){
// 	connection.query('select * from lunch limit 1', function(err, rows, fields) {
// 	  connection.release();
// 	  if (err) throw err;
// 	  console.log('The solution is: ', rows[0].name);
// 	}
// });

async function sqlOpration(options) {
    
    let output = new Promise(resolve=> {
        
    	if(options.type == "select"){
    		pool.getConnection(function(err,connection){
    			connection.query("SELECT * FROM lunch",function(error,results,fields){
					// fields内容：
					//  fields:[{"catalog":"def","db":"mysql","table":"lunch","orgTable":"lunch","name":"id","orgNa
					// 	me":"id","charsetNr":63,"length":11,"type":3,"flags":16899,"decimals":0,"zeroFil
					// 	l":false,"protocol41":true},{"catalog":"def","db":"mysql","table":"lunch","orgTa
					// 	ble":"lunch","name":"name","orgName":"name","charsetNr":33,"length":765,"type":2
					// 	53,"flags":4097,"decimals":0,"zeroFill":false,"protocol41":true},{"catalog":"def
					// 	","db":"mysql","table":"lunch","orgTable":"lunch","name":"count","orgName":"coun
					// 	t","charsetNr":63,"length":2,"type":3,"flags":32,"decimals":0,"zeroFill":false,"
					// 	protocol41":true}]

					console.log("数据返回列表:"+JSON.stringify(results));
					connection.release();
					if(results){
						resolve(JSON.stringify(results))
					}else{
						console.log("数据查询失败...");
					}
				})
    		})
    		
    	}else if(options.type == "update"){
    		pool.getConnection(function(err,connection){
    			connection.query('UPDATE lunch SET count = ?',[0],function(erro,results,fields){
					connection.release();
					//在Promise中必须调用resolve或reject,否则会导致无法响应，一直处于等待状态直到超时
					resolve();
				})
    		})
    		
    	}
					
    });
    return await output;
}
module.exports = {"pool":pool,"sqlOpration":sqlOpration};