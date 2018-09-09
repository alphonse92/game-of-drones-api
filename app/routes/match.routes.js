const Router = require("express").Router();
const Config = global.Config;
const Util = require(Config.paths.utils);
const Base = '/' + Config.app.apiPath + '/' + Config.app.version + '/' + "match";
const MatchController = require(Config.paths.controllers + "/match.controller");


Router.get("/health", (req, res) => res.send("ok"));
Router.get("/:id?", MatchController.list);
Router.post("/", MatchController.create);


// Router.get("/", UserCtr.list);
// Router.get("/token/:id", UserCtr.getToken);
// Router.post("/", UserCtr.create);
// Router.delete("/:id", UserCtr.delete);


Util.log(Base);
module.exports = { Base, Router };