
const sql = require("./db.js");

const Auth = function(auth) {
  this.username = auth.username;
  this.password = auth.password;
};

Auth.findByUsername = (username, result) => {
  sql.query("SELECT * FROM funcionarios WHERE username = ?", [username], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

module.exports = Auth;
