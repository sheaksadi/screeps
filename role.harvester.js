let roleUpgrader = require('role.upgrader');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {


        if (!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
            creep.say('🔄 harvest');
        }
        if (creep.memory.harvesting && creep.carry.energy == creep.carryCapacity ) {
            creep.memory.harvesting = false;
            creep.say('💦 fill')
        }




        if(creep.memory.harvesting) {
            // var Storage= creep.pos.findClosestByPath(FIND_STRUCTURES, {
            //     filter: (s) => s.structureType == STRUCTURE_STORAGE
            //         && s.store[RESOURCE_ENERGY] > 0
            // })
            //
            //
            //     let sources = creep.pos.findClosestByPath(FIND_SOURCES)
            //     if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            //     } else if (sources.store==0) {
            //         if(creep.withdraw(Storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //             creep.moveTo(Storage,{visualizePathStyle: {stroke: '#ffaa00'}})
            //         }
            //
            //     }
            let sources = creep.pos.findClosestByPath(FIND_SOURCES)
            var Storage= creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_STORAGE
                    && s.store[RESOURCE_ENERGY] > 0
            })

            console.log(sources.energy)
            if (sources.energy==0){
                if(creep.withdraw(Storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Storage)
                }
            }else {

                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else {
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType== STRUCTURE_TOWER|| structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets) {
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {

                roleUpgrader.run(creep);

            }
        }
	}
};

module.exports = roleHarvester;