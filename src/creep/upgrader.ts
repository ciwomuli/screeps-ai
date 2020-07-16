export class Upgrader {
    static run(creep: Creep) {
        if (creep.store.getFreeCapacity() === 0 && !creep.memory.working) creep.memory.working = true;
        if (creep.store.getUsedCapacity() === 0 && creep.memory.working) creep.memory.working = false;
        if (!creep.memory.working) {
            const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_STORAGE;
                }
            }) as StructureStorage | StructureContainer | null;
            if (target && creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            const target = creep.room.controller;
            if (target) {
                if (creep.upgradeController(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
}
