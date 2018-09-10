function getMock() {
    return {
        rounds: []
    }
}

function getPlayerMock(name, move) {
    return { player: { name}, move }
}

module.exports.getFactory = () => {
    let mock = getMock()
    let self = this;
    this.createRoundPlayer = (name, round) => {
        return getPlayerMock(name, round)
    }

    this.withRound = (players) => {
        mock.rounds.push({ round_players: players })
        return self;
    }

    this.build = () => {
        return mock;
    }

    return self;

}

module.exports.dummy = {
    "rounds": [
        {
            "round_players": [
                {
                    "player": {
                        "games_played": 0,
                        "games_won": 0,
                        "name": "Alejandro"
                    },
                    "move": "Rock"
                },
                {
                    "player": {
                        "games_played": 0,
                        "games_won": 0,
                        "name": "Camilo"
                    },
                    "move": "Paper"
                }
            ]
        },
        {
            "round_players": [
                {
                    "player": {
                        "games_played": 0,
                        "games_won": 0,
                        "name": "Alejandro"
                    },
                    "move": "Rock"
                },
                {
                    "player": {
                        "games_played": 0,
                        "games_won": 0,
                        "name": "Camilo"
                    },
                    "move": "Paper"
                }
            ]
        },
        {
            "round_players": [
                {
                    "player": {
                        "games_played": 0,
                        "games_won": 0,
                        "name": "Alejandro"
                    },
                    "move": "Rock"
                },
                {
                    "player": {
                        "games_played": 0,
                        "games_won": 0,
                        "name": "Camilo"
                    },
                    "move": "Paper"
                }
            ]
        }
    ]
}