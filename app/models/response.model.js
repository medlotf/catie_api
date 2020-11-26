const sql = require("./db.js")

// constructor
const Response = function (r) {
    this.questionId = r.questionId;
    this.ratingResponse = r.ratingResponse;
    this.textResponse = r.textResponse;
}

Response.create = (newResponse, result) => {
    sql.query("INSERT INTO response SET ?", newResponse, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Question created: ", { id: res.insertId, ...newResponse });
        result(null, { id: res.insertId, ...newResponse });
    });
};

module.exports = Response;