const pagesRouter = require("express").Router();
const Page = require("../models/page");

pagesRouter.get("/", (request, response) => {
  Page.find({}).then((pages) => {
    response.json(pages);
  });
});

pagesRouter.post("/", (request, response, next) => {
  const body = request.body;

  const page = new Page({
    date: body.date,
  });

  page
    .save()
    .then((savedPage) => {
      response.json(savedPage);
    })
    .catch((error) => next(error));
});

module.exports = pagesRouter;
