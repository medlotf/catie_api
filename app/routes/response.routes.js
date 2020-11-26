module.exports = app => {
    const responses = require("../controllers/response.controller.js");

    app.post("/responses", responses.create);

}
