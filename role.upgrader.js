var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);

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

module.exports = roleUpgrader;