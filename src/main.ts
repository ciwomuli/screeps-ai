import { ErrorMapper } from "utils/ErrorMapper";
import { Harvester } from "role/harvester";
import { Upgrader } from "role/upgrader";
// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
const roomNameList = ['E38N43'];
export const loop = ErrorMapper.wrapLoop(() => {
  /*   for (const roomName in roomNameList) {
      if(Game.rooms[roomName]){
        let room = Game.rooms[roomName];
        for(const creepName in room.cr)
      }
    } */
  let cnt = 0;
  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName];
    if (creep.memory.role === 'harvester')
      Harvester.run(creep);
    if (creep.memory.role === 'upgrader')
      Upgrader.run(creep);
    cnt++;
  }
  console.log(cnt);
  const spawnName = 'Spawn1';
  if (Game.spawns[spawnName]) {
    if (cnt <= 5) {
      Game.spawns[spawnName].spawnCreep([MOVE, MOVE, CARRY, CARRY, WORK], 'harvester' + Game.time, { memory: { role: 'harvester', room: 'E38N43', working: false } });
    } else if (cnt <= 7) {
      Game.spawns[spawnName].spawnCreep([MOVE, MOVE, CARRY, CARRY, WORK], 'upgrader' + Game.time, { memory: { role: 'upgrader', room: 'E38N43', working: false } });
    }
  }
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
