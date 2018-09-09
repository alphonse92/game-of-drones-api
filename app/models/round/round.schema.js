const Config = global.Config;
const mongoose = require(Config.paths.db + "/mongo");
const Schema = mongoose.Schema;

module.exports = {
	name: "Round",
	schema: {
		cursor: {
			type: "String"
		},
		match: {
			type: Schema.Types.ObjectId,
			ref: "Match",
			required: true
		},
		round_players: [
			{
				player: {
					type: Schema.Types.ObjectId,
					ref: "Player",
					required: true
				},
				move: {
					type: "String",
					required: true
				}

			}
		],
		winner: {
			type: Schema.Types.ObjectId,
			ref: "Player",
			required: true
		},
	},
}