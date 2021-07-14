let roleHarvester = require('role.harvester');
let roleOuterHarvester = require('role.outerharvester');
let roleUpgrader = require('role.upgrader');
let roleouterUpgrader = require('role.outerUpgrader');
let roleouterBuilder = require('role.outerBuilder');
let roleBuilder = require('role.builder');
const ui = require('ui');
var roleRepairer = require('role.repairer');
let roleclaim = require("role.claim")




 let spawn2= {


     run: function () {

         let body = []
         let bodyParts =6
         let isTroop=false;


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







         let harvesterCount = 3;
         let upgraderCount = 3;
         let repairerCount = 1;
         let builderCount = 3;
         let outHarvesterCount = 3;
         let outHarvester2Count = 0;
         let outUpgraderCount = 1;
         let outBuilderCount =4;

         let claimCount = 0;
         let Count = 0;
         let repairers= _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer2');
         console.log('Repairer: ' + repairers.length);

         if(repairers.length <repairerCount) {
             let newName = 'Repairer' + Game.time;
             console.log('Spawning new Repairer: ' + newName);
             Game.spawns['Spawn2'].spawnCreep(body, newName,
                 {memory: {role: 'repairer2',repairing:false}});
         }
         let builder= _.filter(Game.creeps, (creep) => creep.memory.role == 'outerbuilder');
         console.log('Builders: ' + builder.length);

         if(builder.length < outBuilderCount) {
             let newName = 'Builder' + Game.time;
             console.log('Spawning new Builder: ' + newName);
             Game.spawns['Spawn2'].spawnCreep(body, newName,
                 {memory: {role: 'outerbuilder'}});
         }

         let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
         console.log('Harvesters: ' + harvesters.length);

         if(harvesters.length < harvesterCount) {
             let newName = 'Harvester' + Game.time;
             console.log('Spawning new harvester: ' + newName);
             Game.spawns['Spawn2'].spawnCreep(body, newName,
                 {memory: {role: 'harvester2',harvesting:true}});
         }


         for(let name in Game.creeps) {
             let creep = Game.creeps[name];
             if(creep.memory.role == 'harvester2') {
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

             if(creep.memory.role == 'repairer2') {
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

     }
 }

     module.exports = spawn2
