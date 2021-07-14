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
            let source = creep.pos.findClosestByPath(FIND_SOURCES);

            let sources = creep.room.find(FIND_SOURCES)

            let source1=sources[0]
            let source2=sources[1]


            if (source1.energy!= 0&& source2.energy!=0) {
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else if (source1.energy!=0){

                if (creep.harvest(source1) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source1, {visualizePathStyle: {stroke: '#ffaa00'}});
                }

            }else if (source2.energy!=0){

                if (creep.harvest(source2) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source2, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};
module.exports = roleRepairer;