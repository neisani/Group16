var db = require('../dbconnection');

var User = {
    getAllUsers: function(callback) {
        return db.query("Select * from  systemusersTest", callback);
    },
    getUserById: function(id, callback) {
      return db.query("Select * from systemusersTest where Userid = ?", [id], callback);
    },
    loginCheck: function(User, callback) {
      // console.log(User);
      // return db.query("Select * from systemusersTest where UserName = ? AND UserPassword = ?", [User.username, User.password], callback);
      sql ="Select * from systemusersTest where UserName = ? AND UserPassword = ?";
      // query = db.query(sql, [User.username, User.password], function(err, results, fields)
      // {
      //   if(results.length > 0){
      //     // console.log(results);
      //     return results;
      //   }else{
      //     return "Incorrect Username and / or Password";
      //   }
          // })
      return db.query(sql, [User.username, User.password], callback);


    },
    addUser: function(User, callback) {
      console.log(User);
        let sql = 'INSERT INTO systemusersTest (station, FirstName, SurName, UserName, UserPassword, UserRole, UserEmail, UserPhone) VALUES (?,?,?,?,?,?,?,?)';
        return db.query(sql,[User.station, User.FirstName, User.SurName, User.UserName,User.UserPassword, User.UserRole,User.UserEmail, User.UserPhone], callback );



      },
      deleteUser: function(id, callback) {
        return db.query("delete from systemusersTest where Userid = ?", [id], callback);
      },
      updateUser: function(id, User, callback){
          let sql = "UPDATE systemusersTest SET UserName=? , UserEmail=?, UserPassword=? WHERE Userid =?";
          let data = [User.UserName, User.UserEmail, User.UserPassword, Userid];
          return db.query(sql, data, callback );
      }
};

module.exports = User;
