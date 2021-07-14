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
	 }
};

module.exports = roleBuilder;