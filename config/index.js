const cwd = process.cwd();
const app = cwd + "/app";
const config = cwd + "/config";
const public = cwd + "/public";
const utils = app + "/utils";
const controllers = app + "/controllers";
const db = app + "/db";
const routes = app + "/routes";
const models = app + "/models";
const services = app + "/services";
const errors = app + "/errors";
const lang = app + "/language";
const webservices = app + "/webservices";
const defaultConfig = {
	env:process.env.NODE_ENV,
	service:{
		name:"api"
	},
	client:{
		username:process.env.PUBLIC_USERNAME || "__API__"
	},
	app:{
		version:"v1",
		apiPath:"api",
		init:{
			user:process.env.INIT_USER_TYPE || "reset",
			policy:process.env.INIT_USER_TYPE || "reset",
		},
		paginator:{
			limit:+process.env.APP_PAGINATION || 10,
			page:+process.env.APP_PAGE || 1,
		}
	},
	system:{
		cores:+process.env.SYSTEM_CORES || require('os').cpus().length
	},
	db:{
		mongo:process.env.MONGO || "your mongo credentials",
		mysql:process.env.MYSQL || "your mysql credentials"
	},
	security:{
		token:process.env.TOKEN_SECRET || "secret",
		expiration_minutes:60 * 60 * 24,
		salt_rounds:process.env.SALT_ROUNDS || 10,
		salt:process.env.SALT_ROUNDS || "",
	},
	web:{
		host:process.env.HOST || "localhost",
		port:process.env.PORT || "1337"
	},
	paths:{cwd, app, config, public, utils, controllers, db, routes, models, services, errors, lang, webservices}
};

module.exports = (function(){
	const _ = require('lodash');
	const envConfig = require('./env/' + (process.env.NODE_ENV ? process.env.NODE_ENV : 'local') + '/config');
	const config = _.merge(defaultConfig, envConfig);
	if(!config.security.token){
		throw new Error("God, staph, ¡ token security is required ! ");
	}
	config.client.email = config.client.username + "@" + config.web.host;
	return config;
})();
