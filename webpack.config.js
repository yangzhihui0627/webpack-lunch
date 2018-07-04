var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
let htmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
module.exports = [
	{
		entry:{
			main:'./src/script/main.js',
			css:'./src/style/mui.min.css'
		},
		output:{
			path:path.resolve(__dirname,'dist'),
			publicPath:'http://localhost:3000/dist/',
			filename:'js/[name]-[chunkhash].js'
		},
		module:{
			rules:[
				{
					test:/\.css$/,
					use:[{
						  loader: 'style-loader' 
						},
			            {
			              loader: 'css-loader',
			              options: {
			                modules: true
			              }
			            }]
				},
				{
					test:/\.js$/,
					exclude: /(node_modules|dist)/,
					use:[{
							loader: 'babel-loader',
							options: {
					          presets: ['es2015']
					        }
						}]
				}
			]
		},
		plugins:[
	 	    new htmlWebpackPlugin({
	 	    	title: 'lunch time',
	 	    	template: 'index.html',
	 	    	inject: 'head',
	 	    	minify:{
	 	    		removeComments: true,
	 	    		collapseWhitespace: true
	 	    	}
	 	    	// inlineSource:'.(js|css)$'
	 	    })
	 	    // new htmlWebpackInlineSourcePlugin()
		]
	}
]
