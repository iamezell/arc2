const Player = require('./Player')

class world {
    constructor() {
        console.log('hello from world constructor')
        this.players = []
    }

    addPlayer(id) {
        let player = new Player();
        player.playerId = id;
        this.players.push( player );
        console.log('Player added', this.players)
        return player;
    }
    playerForId(id) {
        let player
        for (var i = 0; i < this.players.length; i++){
            if (this.players[i].playerId === id){

                player = this.players[i]
                break;

            }
        }

        return player;
    }
}

module.exports = world;
