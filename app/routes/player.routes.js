const Router = require("express").Router();
const Config = global.Config;
const Util = require(Config.paths.utils);
const Base = '/' + Config.app.apiPath + '/' + Config.app.version + '/' + "player";
const PlayerController = require(Config.paths.controllers + "/player.controller");


Router.get("/health", (req, res) => res.send("ok"));
Router.get("/summary", PlayerController.summary);
Router.get("/:id?", PlayerController.list);


// Router.post("/auth", UserCtr.auth);
// Router.get("/", UserCtr.list);
// Router.get("/token/:id", UserCtr.getToken);
// Router.post("/", UserCtr.create);
// Router.delete("/:id", UserCtr.delete);


Util.log(Base);
module.exports = { Base, Router };