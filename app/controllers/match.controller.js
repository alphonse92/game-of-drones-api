const Config = global.Config;
const Util = require(Config.paths.utils);
const MatchService = require(Config.paths.services + "/match/match.service")

module.exports.list = list;
function list(req, res, next) {
	MatchService.list(req)
		.then(Matchs => res.send(Matchs))
		.catch(err => Util.response.handleError(err, res))
}


module.exports.create = create;
function create(req, res, next) {
	MatchService.create(req.body)
		.then(MatchDoc => res.send(MatchDoc))
		.catch(err => Util.response.handleError(err, res))
}




