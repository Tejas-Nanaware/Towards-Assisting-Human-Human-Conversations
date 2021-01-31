var con = require('../database/db');

function login(req,res){
    console.log("Login is called")
    var post = req.body;
     username  = post.user;
    var password = post.password;
    //console.log(username);
    var sql = "SELECT * FROM login WHERE username='" + username+"'";
    con.query(sql, function (err, result, fields) {
        console.log('result of login function')
		if (result.length === 1) {
			var jsonString = JSON.stringify(result);
			var jsonData = JSON.parse(jsonString);
			if(jsonData[0].password === password) {
				//console.log("User Identified");
				req.session.user = post.user;
				username = post.user;
				res.redirect("/chat_start");
			}else  {
				//console.log("user not Identified");
				res.redirect("/login");
			}
		} else {
			res.redirect("/login");
		}
    });
}


module.exports = {
    login: login
}