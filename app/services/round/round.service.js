const Config = global.Config;
const Util = require(Config.paths.utils);
const Round = require(Config.paths.models + "/round/round.mongo");
const PlayerService = require(Config.paths.services + "/player/player.service")
const rules = {
    "Rock": "Scissors",
    "Scissors": "Paper",
    "Paper": "Rock"
}
module.exports.getRules = getRules;
function getRules() {
    return rules;
}


module.exports.createMultiple = createMultiple;
function createMultiple(match_id, rounds) {
    rounds = Array.isArray(rounds) ? rounds : [rounds];
    return Promise.all(rounds.map(round => create(match_id, round)));
}

module.exports.create = create;
function create(match, round) {
    let RoundPlayerWithDocs = round.round_players
        .map(rp => {
            rp.player = match.players.find(PlayerDoc=>PlayerDoc.name === rp.player.name)._id
            return Promise.resolve(rp)
        })
    let promiseCreateRound = Promise.all(RoundPlayerWithDocs)
        .then(RoundPlayers => {
            let winner = getWinner(RoundPlayers);
            
            //set the ids of players
            round.round_players = RoundPlayers.map(rp => {
                rp.player = rp.player._id;
                return rp;
            })

            round.winner = winner._id;
            round.match = match._id;
            return Round.create(round)
        })

    return promiseCreateRound;
}

module.exports.getWinner = getWinner
function getWinner(round_players) {
    let roundPlayer1 = round_players[0];
    let roundPlayer2 = round_players[1];

    if (roundPlayer1.move === roundPlayer2.move) return null;
    return validePlayerBeatTo(roundPlayer1, roundPlayer2) ?
        roundPlayer1.player :
        roundPlayer2.player;
}

module.exports.validePlayerBeatTo = validePlayerBeatTo;
function validePlayerBeatTo(roundPlayer1, roundPlayer2) {
    return getRules()[roundPlayer1.move] === roundPlayer2.move;
}