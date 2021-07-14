let roleHarvester = require('role.harvester');
let roleOuterHarvester = require('role.outerharvester');
let roleUpgrader = require('role.upgrader');
let roleouterUpgrader = require('role.outerUpgrader');
let roleouterBuilder = require('role.outerBuilder');
let roleBuilder = require('role.builder');
const ui = require('ui');
var roleRepairer = require('role.repairer');
let roleclaim = require("role.claim")
let spawn2 = require('spawn2')




module.exports.loop = function () {
    let harvesterCount =3 ;
    let upgraderCount= 3 ;
    let repairerCount =1 ;
    let builderCount =3 ;
    let outHarvesterCount =3 ;
    let outHarvester2Count =0;
    let outUpgraderCount =1 ;
    let outBuilderCount =0 ;

    let claimCount = 0;
    let Count = 0;




    ui.displayUI(harvesterCount,upgraderCount,repairerCount,builderCount,outHarvesterCount,outHarvester2Count,outUpgraderCount,claimCount)
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    defendRoom('W4N3')
    defendRoom('W5N3')


    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    let body = []
    let bodyParts =7
    let isTroop=false;

    if (harvesters==0){

        bodyParts=1;
    }
    // else{
    //
    //    bodyParts=Math.floor(Game.spawns.Spawn1.room.energyCapacityAvailable / 200)
    //
    //
    //  }
    if (!isTroop){
    for (let i = 0; i < bodyParts; i++) {
        body.push(WORK)
    }
    for (let i = 0; i < bodyParts; i++) {
        body.push(CARRY)
    }
    for (let i = 0; i < bodyParts; i++) {
        body.push(MOVE)
    }
    }else{
    for (let i = 0; i < bodyParts; i++) {
        body.push(ATTACK)
    }
    for (let i = 0; i < bodyParts; i++) {
        body.push(RANGED_ATTACK)
    }
    for (let i = 0; i < bodyParts; i++) {
        body.push(MOVE)
    }
    }


    spawn2.run(body)


    let repairers= _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    console.log('Repairer: ' + repairers.length);

    if(repairers.length <repairerCount) {
        let newName = 'Repairer' + Game.time;
        console.log('Spawning new Repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(body, newName,
            {memory: {role: 'repairer',repairing:false}});
    }

    let builder= _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builder.length);

    if(builder.length < builderCount) {
        let newName = 'Builder' + Game.time;
        console.log('Spawning new Builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(body, newName,
            {memory: {role: 'builder'}});
    }

    let outerHarvester2= _.filter(Game.creeps, (creep) => creep.memory.role == 'outerHarvester2');
    console.log('outer harvester2: ' + outerHarvester2.length);

    if(outerHarvester2.length < outHarvester2Count) {
        let newName = 'OuterHarvester2' + Game.time;
        console.log('Spawning new OHarvester2: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(body, newName,
            {memory: {role: 'outerHarvester2',harvesting:true}});
    }

    let outerHarvester= _.filter(Game.creeps, (creep) => creep.memory.role == 'outerHarvester');
    console.log('outer harvester: ' + outerHarvester.length);

    if(outerHarvester.length <outHarvesterCount) {
        let newName = 'OuterHarvester' + Game.time;
        console.log('Spawning new OHarvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(body, newName,
            {memory: {role: 'outerHarvester',harvesting:true}});
    }




    let claimers= _.filter(Game.creeps, (creep) => creep.memory.role == 'claim');
    console.log('outer claimer: ' + outerHarvester.length);

    if(claimers.length < claimCount) {
        let newName = 'claimer' + Game.time;
        console.log('Spawning new claimer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,CLAIM,MOVE], newName,
            {memory: {role: 'claim',claiming:true}});
    }

    let upgraders= _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);

    if(upgraders.length < upgraderCount) {
        let newName = 'Upgrader' + Game.time;
        console.log('Spawning new Upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(body, newName,
            {memory: {role: 'upgrader'}});
    }

    let outerbuilder= _.filter(Game.creeps, (creep) => creep.memory.role == 'outerbuilder');
    console.log('outerBuilder: ' +outerbuilder.length);

    if(outerbuilder.length <outBuilderCount) {
        let newName = 'outerUpgrader' + Game.time;
        console.log('Spawning new outerbuilder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(body, newName,
            {memory: {role: 'outerbuilder'}});
    }

    let outerupgraders= _.filter(Game.creeps, (creep) => creep.memory.role == 'outerupgrader');
    console.log('outerUpgraders: ' + outerupgraders.length);

    if(outerupgraders.length <outUpgraderCount) {
        let newName = 'outerUpgrader' + Game.time;
        console.log('Spawning new outerUpgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(body, newName,
            {memory: {role: 'outerupgrader'}});
    }


    if(harvesters.length < harvesterCount) {
        let newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(body, newName,
            {memory: {role: 'harvester',harvesting:true}});
    }

    // if(Game.spawns['Spawn1'].spawning) {
    //     let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    //     Game.spawns['Spawn1'].room.visual.text(
    //         '🛠️' + spawningCreep.memory.role,
    //         Game.spawns['Spawn1'].pos.x + 1,
    //         Game.spawns['Spawn1'].pos.y,
    //         {align: 'left', opacity: 0.8});
    // }

    for(let name in Game.creeps) {
        let creep = Game.creeps[name];



        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } if(creep.memory.role == 'outerupgrader') {
            roleouterUpgrader.run(creep,'W4N3');
        } if(creep.memory.role == 'outerbuilder') {
            roleouterBuilder.run(creep,'W4N3');
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'outerHarvester') {
            roleOuterHarvester.run(creep,'W4N3');
        }

        if(creep.memory.role == 'outerHarvester2') {
            roleOuterHarvester.run(creep,'W5N2');
        }
        if(creep.memory.role == 'claim') {
            roleclaim.run(creep,'W4N3');
        }
    }




    function defendRoom(roomName) {
        var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${roomName}`);
            var towers = Game.rooms[roomName].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers.forEach(tower => tower.attack(hostiles[0]));
        }
    }
}
