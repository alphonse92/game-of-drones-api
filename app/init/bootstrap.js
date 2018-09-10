const Config = global.Config;
const Util = require(Config.paths.utils);

const listeners = {
	uncaughtException(err) {
		Util.log('============     uncaughtException    ===============')
		Util.log(err.message);
		Util.log(err.stack);
		Util.log('============     uncaughtException    ===============')
	},
	message(message) {
		if (message.type === "shutdown")
			process.exit(0);
	}
}

function addAppListeners() {
	Util.log("Adding listeners");
	Object.keys(listeners, listener => process.on('listener', listeners[listener]))
}

function prepareTestEnv() {

	if (Config.env === "test") {
		Util.log("TEST ENVIRONMENT FOUND")
		let promise = require(Config.paths.db + '/mongo-client')
			.get()
			.then(client => {
				return client.db().dropDatabase()
			})
			.then(result => {
				Util.log(" ---- Database Droped")
			})
			.catch(e => {
				Util.log(e)
			})
		return promise;
	}
	return Promise.resolve()
}



module.exports = bootstrap;
function bootstrap() {
	Util.log("Bootstraping");
	addAppListeners()
	return prepareTestEnv()
}