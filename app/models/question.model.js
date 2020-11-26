const sql = require("./db.js")

// constructor
const Question = function(q){
    this.question = q.question;
    this.textType = q.textType;
    this.scaleType = q.scaleType;
}

Question.getAll = result => {
    sql.query("SELECT * FROM question",(err,res)=>{
        if(err){
            console.log("error: "+ err)
            result(err,null)
            return
        }
        console.log("Questions: ",res)
        result(null,res)
    })
} 

Question.getById = (questionId,result) =>{
    sql.query(`SELECT * FROM question WHERE id=${questionId}`,(err,res)=>{
        if(err){
            console.log("error: "+ err)
            result(err,null)
            return
        }
        if(res.length){
            console.log("Question found: ",res[0])
            result(null,res[0])
            return
        }
        result({kind:"Question not found"},null)
    })
}

Question.create = (newQuestion, result) => {
    sql.query("INSERT INTO question SET ?", newQuestion, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Question created: ", { id: res.insertId, ...newQuestion });
      result(null, { id: res.insertId, ...newQuestion });
    });
};

Question.updateById = (questionId,newQuestion,result) =>{
    sql.query("UPDATE question SET question=?, textType=?, scaleType=? WHERE id=?",[newQuestion.question, newQuestion.textType, newQuestion.scaleType, questionId],(err,res)=>{
        if(err){
            console.log("error: "+ err)
            result(err,null)
            return
        }
        if(res.affectedRows==0){
            result({kind:"Question not found"},null)
            return
        }
        console.log("Question updated : ",{id:questionId,...newQuestion})
        result(null,{id:questionId,...newQuestion})
    })
}

Question.removeById = (questionId, result) => {
    sql.query("DELETE FROM question WHERE id = ?", questionId, (err, res) => {
        if(err) {
            console.log("error: ", err)
            result(null, err)
            return
        }
        if(res.affectedRows == 0) {
            result({kind:"Question not found"},null)
            return;
        }
        console.log("Question deleted with id: ", questionId);
        result(null, res);
    });
};

module.exports = Question;