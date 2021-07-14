var roleouterharvester = {

    run: function(creep,room) {

        if (!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
        }
        if (creep.memory.harvesting && creep.carry.energy == creep.carryCapacity ) {
            creep.memory.harvesting = false;
        }

        if (creep.memory.harvesting) {
            if (creep.room.name != room){
                let exit =creep.room.findExitTo(room)
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
            else if (creep.room.name == room) {
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
        } else {
            let exit =creep.room.findExitTo('W5N3')

            creep.moveTo(creep.pos.findClosestByRange(exit));
            var targets = creep.pos.findClosestByRange (FIND_STRUCTURES, {
                filter: (structure) => {
                    return (((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && (structure.energy < structure.energyCapacity)) ||
                        ((structure.structureType == STRUCTURE_STORAGE) && (_.sum(structure.store) < structure.storeCapacity)))
                }
            });

            if(targets) {

                if(creep.transfer(targets, RESOURCE_ENERGY) ==
                    ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }

};

module.exports = roleouterharvester;