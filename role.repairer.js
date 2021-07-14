let roleBuilder = require('role.builder');

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
        }
        if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
        }

        if (creep.memory.repairing) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < (object.hitsMax / 4)
            });

            targets.sort((a, b) => a.hits - b.hits);

            if (targets.length > 0) {


                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0],{visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else{
                roleBuilder.run(creep);

            }


        } else {
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources ,{visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};
module.exports = roleRepairer;