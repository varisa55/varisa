const conn = require('./db');
const bcrypt = require('bcrypt');

const User = function(user) {
  this.email = user.email;
  this.password = user.password;
};

User.create = (newUser, result) => {
    conn.query(
      "INSERT INTO user SET ?",
      newUser,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("created user: ", { id: res.insertId, email: newUser.email });
        result(null, { 
          id: res.insertId, 
          email: newUser.email,
          password: newUser.password  // คืนค่า password
        });
      }
    );
};

User.loginByEmailAndPassword = (email, password, result) => {
  const qry = "SELECT id, email, password FROM user WHERE email = ? AND password = ?";

  conn.query(qry, [email, password], (err, response) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (response.length) {
      result(null, response[0]);
      return;
    }     
    result({ kind: "not_found" }, null);
  });
};

module.exports = User;