const Config = global.Config;
const Util = require(Config.paths.utils);
const PlayerService = require(Config.paths.services + "/player/player.service")
const MatchService = require(Config.paths.services + "/match/match.service")

module.exports.list = list;
function list(req, res, next) {
	console.log("listing")
	PlayerService.list(req)
		.then(Players => res.send(Players))
		.catch(err => Util.response.handleError(err, res))
}

module.exports.summary = summary;
function summary(req, res, next) {
	MatchService.get()
		.then(MatchService.getSummary)
		.then(Players => res.send(Players))
		.catch(err => Util.response.handleError(err, res))
}


