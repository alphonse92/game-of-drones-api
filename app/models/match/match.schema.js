const Config = global.Config;
const mongoose = require(Config.paths.db + "/mongo");
const Schema = mongoose.Schema;

module.exports = {
	name: "Match",
	schema: {
		cursor: {
			type: "number"
		},
		n_rounds: {
			type: "number",
			required: true,
		},
		emperor: {
			type: "Boolean",
			default: false
		},
		winner: {
			type: Schema.Types.ObjectId,
			ref: "Player",
		}

	},
}