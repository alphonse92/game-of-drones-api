const Config = global.Config;
const mongoose = require(Config.paths.db + "/mongo");
const Schema = mongoose.Schema;
const errors = require(Config.paths.errors + "/player.errors");
const validators = require(Config.paths.utils).validators;

module.exports = {
	name: "Player",
	schema: {
		cursor: {
			type: "String"
		},
		name: {
			type: "String",
			required: true,
			unique: true
		},
		games_won: {
			type: "number",
			default: 0,
		},
		games_played: {
			type: "number",
			default: 0,
		}
	},
}