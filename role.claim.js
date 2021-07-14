
module.exports = {
    run: function (creep,room) {


        if (true) {
            if (true){

                let exit =creep.room.findExitTo(room)
                creep.moveTo(creep.pos.findClosestByRange(exit));
                creep.claimController(creep.room.controller)
            }


            else if (creep.room.name == room) {





            }
        }



    }
};