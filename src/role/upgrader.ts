export class Upgrader {
    static run(creep: Creep) {
        if (creep.room.controller && creep.room.controller.level <= 2) {
            if (creep.store.getFreeCapacity() !== 0) {
                const target = creep.room.find(FIND_SOURCES_ACTIVE)
                if (target[0] && creep.harvest(target[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target[0]);
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
}
