const Question = require("../models/question.model.js")

exports.findAll = (req, res) => {
    Question.getAll((err, data) => {
        if (err)
            res.status(500).send({ message: err.message || "Some error occurred while retrieving questions." });
        else 
            res.send(data);
    });
};

exports.findById = (req, res) => {
    Question.getById(req.params.questionId,(err,data)=>{
        if(err){
            if(err.kind=="Question not found")
                res.status(404).send({message:`Not found question with id ${req.params.questionId}.`})
            else 
                res.status(500).send({message: "Error retrieving question with id " + req.params.questionId})
        }
        else
            res.send(data)
    })
};

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({message:"content can not be empty"})
    }

    const question= new Question({
        question:req.body.question,
        textType:req.body.textType,
        scaleType:req.body.scaleType
    });

    Question.create(question,(err,data)=>{
        if(err)
            res.status(500).send({message:err.message || "Some error occurred while creating the question."})
        else
            res.send(data)
    })
};

exports.update = (req, res) => {
    if(!req.body){
        res.status(404).send({message:"content can not be empty"})
    }
    Question.updateById(req.params.questionId,new Question(req.body),(err, data) => {
        if (err) {
            if (err.kind === "Question not found")
                res.status(404).send({ message: `Not found question with id ${req.params.questionId}.`});
            else
                res.status(500).send({message: "Error updating question with id " + req.params.questionId});
        } 
        else 
            res.send(data);
    });
};

exports.delete = (req, res) => {
    Question.removeById(req.params.questionId, (err, data) => {
        if (err) {
            if (err.kind === "Question not found")
                res.status(404).send({message: `Not found question with id ${req.params.questionId}.`});
            else
                res.status(500).send({message: "Could not delete question with id " + req.params.questionId});
        } 
        else 
            res.send({ message: `Question was deleted successfully!` });
      });
};