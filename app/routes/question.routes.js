module.exports = app => {
    const questions = require("../controllers/question.controller.js");

    app.get("/questions", questions.findAll)

    app.get("/questions/:questionId",questions.findById)

    app.post("/questions", questions.create);

    app.put("/questions/:questionId",questions.update)

    app.delete("/questions/:questionId",questions.delete)

}
