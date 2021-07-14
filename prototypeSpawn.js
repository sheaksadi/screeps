module.exports=function(){
    StructureSpawn.prototype.createAutoCreep=
        function (energy,roleName){
        let bodyParts=Math.floor(energy/200)

        let body=[]
        for (let i=0;i< bodyParts;i++){
            body.push(WORK)
        }
        for (let i=0;i< bodyParts;i++){
            body.push(CARRY)
        }
        for (let i=0;i< bodyParts;i++){
            body.push(MOVE)
        }

        this.spawnCreep(body,roleName+Game.time,{role:roleName,state:false})
        }
    }