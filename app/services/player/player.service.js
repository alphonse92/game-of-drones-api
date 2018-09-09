const Config = global.Config;
const Util = require(Config.paths.utils);
const Player = require(Config.paths.models + "/player/player.mongo");

module.exports.list = list;
function list(req) {
	let paginator = Util.mongoose.getPaginatorFromRequest(req, Config.app.paginator);
	let query = Util.mongoose.getQueryFromRequest(req);
	return Util.mongoose.list(Player, null, query, paginator)
}

module.exports.findOrCreate = findOrCreate;
function findOrCreate(query, data) {
	return Player.findOne(query)
		.then(PlayerDoc => {
			if (!PlayerDoc) {
				return Player.create(data);
			}
			return Promise.resolve(PlayerDoc)
		})
}