const superagent = require('superagent');
const expect = require('expect.js');
const port = 1337;
const api = 'http://localhost:' + port + "/api/v1"
const MatchMockFactory = require("./fixtures/match");

const rock = "Rock"
const sci = "Scissors"
const paper = "Paper"

// console.log(JSON.stringify(mock, null, 2))

describe('server', function () {

    describe("Testing the test", function (done) {
        it("This must pass", function (done) {
            done();
        })
    })

    describe("Test the health endpoints", function (done) {
        it("Testing player health", function (done) {
            superagent
                .get(api + "/player/health")
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    done();
                });
        })

        it("Testing match health", function (done) {
            superagent
                .get(api + "/match/health")
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    done();
                });
        })
    })
    describe("Test Match endpoints", function (done) {
        it("Read matches", function (done) {
            superagent
                .get(api + "/match/")
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    done();
                });
        })
        it("Create a match with emperor", function (done) {
            let winnerName = "Alejandro"
            let fact = MatchMockFactory.getFactory();
            let mock = fact
                .withRound([
                    fact.createRoundPlayer(winnerName, rock),
                    fact.createRoundPlayer("Camilo", sci),
                ])
                .withRound([
                    fact.createRoundPlayer(winnerName, rock),
                    fact.createRoundPlayer("Camilo", sci),
                ])
                .withRound([
                    fact.createRoundPlayer(winnerName, rock),
                    fact.createRoundPlayer("Camilo", sci),
                ]).build();

            superagent
                .post(api + "/match/", mock)
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    expect(res.body.emperor).to.equal(true);

                    expect(res.body.winner.name).to.equal(winnerName);
                    done();
                });
        })

        it("Create a match without emperor", function (done) {

            let winnerName = "Alejandro"
            let fact = MatchMockFactory.getFactory();
            let mock = fact
                .withRound([
                    fact.createRoundPlayer(winnerName, rock),
                    fact.createRoundPlayer("Camilo", sci),
                ])
                .withRound([
                    fact.createRoundPlayer(winnerName, rock),
                    fact.createRoundPlayer("Camilo", sci),
                ])
                .withRound([
                    fact.createRoundPlayer(winnerName, sci),
                    fact.createRoundPlayer("Camilo", rock),
                ]).build();
            superagent
                .post(api + "/match/", mock)
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    expect(res.body.emperor).to.equal(false);
                    expect(res.body.winner.name).to.equal(winnerName);
                    done();
                });
        })



    })

    describe("Test GET endpoints", function (done) {
        it("Get Summary", function (done) {
            //There must be just a one record because only a one player won
            superagent
                .get(api + "/player/summary")
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    expect(res.body.length).to.equal(1);
                    done();
                });
        })

        it("Get Total Players", function (done) {
            //There must be two records
            superagent
                .get(api + "/player")
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    expect(res.body.docs.length).to.equal(2);
                    done();
                });
        })
    })

});