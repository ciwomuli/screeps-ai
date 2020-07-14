export class Harvester {
    static run(creep: Creep) {
        if (creep.room.controller && creep.room.controller.level <= 2) {
            if (creep.store.getFreeCapacity() !== 0) {
                const target = creep.room.find(FIND_SOURCES_ACTIVE)
                if (target[0] && creep.harvest(target[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target[0]);
                }
            } else {
                const spawnName = 'Spawn1';
                const target = Game.spawns[spawnName];
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
        }
    }
}
