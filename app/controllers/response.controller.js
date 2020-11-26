const Response = require("../models/response.model.js")

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "content can not be empty" })
    }

    const response = new Response({
        questionId: req.body.questionId,
        ratingResponse: req.body.ratingResponse,
        textResponse: req.body.textResponse
    });

    Response.create(response, (err, data) => {
        if (err)
            res.status(500).send({ message: err.message || "Some error occurred while creating the response." })
        else
            res.send(data)
    })
};
