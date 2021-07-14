let roleHarvester = require('role.harvester');

let roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        let targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(targets) {
                if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
				roleHarvester.run(creep);

			}
	    }
	    else {
			var Storage= creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (s) => s.structureType == STRUCTURE_STORAGE
					&& s.store[RESOURCE_ENERGY] > 0
			})
			if (Storage!=null&&Storage.store[RESOURCE_ENERGY]!=0){
				if(creep.withdraw(Storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(Storage)
				}
			}else {
	        let sources = creep.pos.findClosestByPath(FIND_SOURCES)
            	if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                	creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            	}
			}
	    }
	 }
};

module.exports = roleBuilder;