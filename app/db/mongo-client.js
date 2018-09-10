const Config = global.Config;
const MongoClient = require('mongodb').MongoClient
const uri = Config.db.mongo;
module.exports.get = function () {
  return new Promise((resolve, reject) => {
    MongoClient.connect(uri, function (err, dbOut) {
      return err ? reject(err) : resolve(dbOut);
    });
  })
}

