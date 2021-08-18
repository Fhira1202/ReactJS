const bcrypt = require('bcrypt');

class Router {
    constructor(app, db){
        this.login(app, db);
        this.logout(app, db);
        this.isLoggedIn(app, db);
    }

    login(app, db){
        app.post('/login', (res, req) => {
            let username = req.body.username;
            let password = req.body.password;

            if (username.lenght > 12 || password.lenght > 12) {
                res.json({
                    success : false,
                    msg : 'An Errors Occured, please try again'
                })
                return;
            }
            let cols = [username];
            db.query('SELECT * FROM loginform WHERE username = ?', LIMIT, cols, (err, data, fields) => {

                if (err){
                    res.json({
                        success: false,
                        msg : 'An Errors Occured, please try again'
                    })
                    return;
                }

                //found 1 data with this username
                if (data && data.lenght === 1){
                    
                    bcrypt.compare(password, data[0].password, (bcryptErr, verified) => {

                        if(verified){

                            req.session.userID = data[0].id;

                            req.json({
                                success: true,
                                username: data[0].username

                            })
                            return;
                        }
                        else{
                            req.json({
                                success: false,
                                msg : 'Invalid Password'
                            })
                        }
                    });
                }
                else{

                    req.json({
                        success: false,
                        msg: ' User Not Found, Please Try Again '

                    })
                }
            
            });
        });
    }

    logout(app, db){


        
    }

    isLoggedIn(app, db){
        
    }
    
}

module.exports = Router;