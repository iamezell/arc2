const Player = require('./Player')

class world {
    constructor() {
        this.players = []
    }

    addPlayer(id) {
        let player = new Player();
        player.playerId = id;
        this.players.push( player );
        return player;
    }

    updatePlayerData (data){
        var player = this.playerForId(data.playerId);
        player.x = data.x;
        player.y = data.y;
        player.z = data.z;
        player.r_x = data.r_x;
        player.r_y = data.r_y;
        player.r_z = data.r_z;

        return player;
    };

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
