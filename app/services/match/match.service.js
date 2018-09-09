const Config = global.Config;
const Util = require(Config.paths.utils);
const Match = require(Config.paths.models + "/match/match.mongo");
const RoundService = require(Config.paths.services + "/round/round.service")
const PlayerService = require(Config.paths.services + "/player/player.service")
const MatchErrors = require(Config.paths.errors + "/match.errors")
const _ = require("lodash")

module.exports.list = list;
function list(req) {
	let paginator = Util.mongoose.getPaginatorFromRequest(req, Config.app.paginator);
	let query = Util.mongoose.getQueryFromRequest(req);
	return Util.mongoose.list(Match, null, query, paginator)
}

module.exports.create = create;
function create(match) {
	if (!match || !Object.keys(match).length)
		return Promise.reject(MatchErrors.missing_data);

	return createPlayers(match)
		.then(Players => {
			match.players = Players;
			match._id = Util.mongoose.createObjectId();
			return Promise.resolve(match)
		})
		.then(match => RoundService.createMultiple(match, match.rounds))
		.then(Rounds => {
			let ids_map = getIdsMapsFromRounds(Rounds)
			let winners_ids = Object.keys(ids_map)
			if (winners_ids.length === 1) {
				match.emperor = true;
				match.winner = Rounds[0].winner;
			} else {
				match.winner = winners_ids.reduce((playerCounterCurrentWinner, _id) => {
					let playerCounter = ids_map[_id];
					let thereANewWinner = playerCounterCurrentWinner.counter < playerCounter.counter;
					return thereANewWinner ? playerCounter : playerCounterCurrentWinner
				}, ids_map[winners_ids[0]])
				match.winner = match.winner._id;
			}
			match.n_rounds = Rounds.length;
			return updateMatchPlayersStadistics(match);
		})
		.then((match) => Match.create(match))
		.then(MatchDoc => MatchDoc.populate({ path: "winner" }).execPopulate())
}

function updateMatchPlayersStadistics(match) {
	let promise = match.players.map(PlayerDoc => {
		if (PlayerDoc._id.toString() === match.winner.toString()) {
			PlayerDoc.games_won++
			PlayerDoc.markModified('games_won');
		}
		PlayerDoc.games_played++;
		PlayerDoc.markModified('games_won');
		return PlayerDoc.save();
	})
	promise = Promise.all(promise)
		.then(Players => {
			match.players = Players;
			return Promise.resolve(match)
		});
	return promise;
}

function createPlayers(match) {
	let map = {}
	match.rounds.forEach(round => {
		round.round_players.forEach(rp => {
			let player = rp.player;
			map[player.name] = player
		})
	})
	//get player arrays without duplicates
	map = Object.keys(map)
		.map(name => {
			return map[name];
		});
	//promifing
	map = map.map(player => {
		player = { name: player.name }
		return PlayerService.findOrCreate(player, player)
	})

	// return when all promises will be resolved
	return Promise.all(map);
}

function getIdsMapsFromRounds(Rounds) {
	return Rounds.reduce((map, round) => {
		let winner = map[round.winner.toString()]
		if (!winner)
			winner = { count: 0, _id: round.winner };

		winner.count++;
		map[round.winner.toString()] = winner
		return map;
	}, {})
}

module.exports.get = get;
function get(query) {
	query = query || {};
	return Match
		.find(query)
		.populate({ path: "winner" })
		.exec();

}

module.exports.getSummary = getSummary;
function getSummary(Matches) {
	let players = {};
	Matches.forEach(MatchDoc => {
		let winner = MatchDoc.winner
		let id = winner._id.toString();
		if (!players[id]) {
			players[id] = {
				name: winner.name,
				wins: winner.games_won,
				played: winner.games_played,
				emperor: 0
			}
		}
		players[id].emperor += (+MatchDoc.emperor)
	})
	players = Object.keys(players)
		.reduce((array, id) => {
			array.push(players[id])
			return array;
		}, [])

	players = _.orderBy(players, ["wins"], ["desc"]);
	return Promise.resolve(players)
}







