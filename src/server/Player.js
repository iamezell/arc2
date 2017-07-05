class Player {
    constructor(id){
        this.playerId = id
        this.x = 1;
        this.y = 1;
        this.z = 1;
        this.r_x = 0;
        this.r_y = 0;
        this.r_z = 0;
        this.sizeX = 1;
        this.sizeY = 1;
        this.sizeZ = 1;
        this.speed = 0.1;
        this.turnSpeed = 0.03;
    }

    
}

module.exports = Player