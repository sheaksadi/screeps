let roleupgrader = require('role.upgrader');

let roleBuilder = require('role.builder');




var roleouterUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep,room) {
        if (creep.room.name != room) {
            let exit =creep.room.findExitTo(room)
            creep.moveTo(creep.pos.findClosestByRange(exit));
        } else {
            roleBuilder.run(creep)

        }
    }
};

module.exports = roleouterUpgrader;