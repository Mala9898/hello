var express = require('express')
var router = express.Router()
var request = require('request');
var jsdom = require('jsdom')
var perfy = require('perfy')
var fs = require('fs')
var rp = require('request-promise')
var cheerio = require('cheerio')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

// setInterval(function(){
//   perfy.start('loop-stuff');
// 	request({uri: 'http://www.adidas.se/nmd?grid=true'}, function(err, response, body){
//             var self = this;
//         	self.items = new Array();//I feel like I want to save my results in an array
         
//         	//Just a basic error check
//             if(err && response.statusCode !== 200){console.log('Request error.');}
//                 //Send the body param as the HTML code we will parse in jsdom
//         	//also tell jsdom to attach jQuery in the scripts and loaded from jQuery.com
//     		// console.log("succes: " + body)

//     		fs.readFile(filePath, 'utf8', function(err, data) {
// 			  if (err) throw err;
// 			  console.log('Loaded normal site, comparing...')
// 			  if ( body == data ) {
// 			  	var result = perfy.end('loop-stuff');
// 			  	console.log("Nothing changed. time: " + result.summary)
// 			  } else {
// 			  	console.log("DIFFERENCE DETECTED!")
// 			  	//TODO: push notifications here
// 			  	// open("http://www.adidas.com/se/apps/yeezy/")
// 			  }
			  
// 			})

//     		jsdom.env(
// 			  body,
// 			  ["http://code.jquery.com/jquery.js"],
// 			  function (err, window) {
// 			    console.log("contents of a.the-link:", window.$("a").text());
// 			    // res.send(window.$("p").text())
// 			    //var result = perfy.end('loop-stuff');
// 				//console.log(result.summary);
// 			})
//         });
// }, 10000);      

//http://www.adidas.com/se/apps/yeezy/
router.get('/yay', function(req,res){

	var options = {
	    uri: 'http://www.adidas.se/nmd?grid=true',
	    headers: {
        'User-Agent': 'Request-Promise'
    	},
	    transform: function (body) {
	        return cheerio.load(body);
	    }
	};
 
	rp(options)
	    .then(function ($) {
	    	res.send($('span[class=title]').text())
	        console.log("this: "+$('span[class=title]').text()) 
	    })
	    .catch(function (err) {
	        console.log("fail"+err)
	    });
	// perfy.start('loop-stuff');
	// request({uri: 'http://www.adidas.se/nmd?grid=true'}, function(err, response, body){
 //            var self = this;
 //        	self.items = new Array();//I feel like I want to save my results in an array
         
 //        	//Just a basic error check
 //            if(err && response.statusCode !== 200){console.log('Request error.');}

 //            fs.writeFile('normal.txt', body, function (err) {
	// 		  if (err) return console.log(err);
	// 		  console.log('Hello World > helloworld.txt');
	// 		});
 //                //Send the body param as the HTML code we will parse in jsdom
 //        	//also tell jsdom to attach jQuery in the scripts and loaded from jQuery.com
 //    		// console.log("succes: " + body)

 //    		jsdom.env(
	// 		  body,
	// 		  ["http://code.jquery.com/jquery.js"],
	// 		  function (err, window) {
	// 		    //console.log("contents of a.the-link:", window.$("a").text());
	// 		    res.send(window.$("h1").text())
	// 		    var result = perfy.end('loop-stuff');
	// 			console.log(result.summary);
	// 		})
 //        });
	
})

module.exports = router;
