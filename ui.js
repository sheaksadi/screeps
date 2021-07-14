function displayUI(h,u,r,b,oh,oh2,ou,c){
     displayWorkers(h,u,r,b,oh,oh2,ou,c)
    displaySpawner()
    displayResources()
}

function displayWorkers(h,u,r,b,oh,oh2,ou,c){
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    const builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    let repairers= _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    let outerHarvester2= _.filter(Game.creeps, (creep) => creep.memory.role == 'outerHarvester2');
    let outerHarvester= _.filter(Game.creeps, (creep) => creep.memory.role == 'outerHarvester');
    let claimers= _.filter(Game.creeps, (creep) => creep.memory.role == 'claim');
    let outerupgraders= _.filter(Game.creeps, (creep) => creep.memory.role == 'outerupgrader');




    Game.spawns['Spawn1'].room.visual.text(
        '⛏ ' + harvesters.length + " / " + h,
        1,
        1,
        {align: 'left', opacity: 0.8});


    Game.spawns['Spawn1'].room.visual.text(
        '➕ ' + upgraders.length + " / " +u,
        1,
        2,
        {align: 'left', opacity: 0.8});
    Game.spawns['Spawn1'].room.visual.text(
        '🔧 ' + repairers.length + " / " +r,
        1,
        3,
        {align: 'left', opacity: 0.8});

    Game.spawns['Spawn1'].room.visual.text(
        '🛠️ ' + builders.length + " / " +b,
        1,
        4,
        {align: 'left', opacity: 0.8});


    Game.spawns['Spawn1'].room.visual.text(
        '1⛏ ' + outerHarvester.length + " / " + oh,
        1,
        5,
        {align: 'left', opacity: 0.8});



    Game.spawns['Spawn1'].room.visual.text(
        '2⛏' + outerHarvester2.length + " / " + oh2,
        1,
        6,
        {align: 'left', opacity: 0.8});


    Game.spawns['Spawn1'].room.visual.text(
        '1➕ ' + outerupgraders.length + " / " + ou,
        1,
        7,
        {align: 'left', opacity: 0.8});



}

function displayResources(){
    Game.spawns['Spawn1'].room.visual.text(
        '🔋 ' + Game.spawns['Spawn1'].room.energyAvailable,
        5,
        1,
        {align: 'left', opacity: 0.8});
}

function displaySpawner(){
    Game.spawns['Spawn1'].room.visual.text(
        '🔋 ' + Game.spawns['Spawn1'].room.energyAvailable,
        Game.spawns['Spawn1'].pos.x + 1,
        Game.spawns['Spawn1'].pos.y,
        {align: 'left', opacity: 0.8});

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y +1,
            {align: 'left', opacity: 0.8});
    }
}

module.exports = {
    displayUI
};