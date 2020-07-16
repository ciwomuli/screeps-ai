import { Log } from 'utils/log';
export class HarvesterExtention extends CreepExtention {
    run() {
        const creep = Game.getObjectById(this.id) as HarvesterCreep;
        if (!creep) {
            return;
        }
        if (creep.store.getFreeCapacity() === 0 && !creep.memory.working) creep.memory.working = true;
        if (creep.store.getUsedCapacity() === 0 && creep.memory.working) creep.memory.working = false;
        if (!creep.memory.working) {
            const source = Game.getObjectById(creep.memory.sourceId);
            if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            } if (!source) {
                Log.reportError('harvester has no target', 'harvester.ts');
            }
        }
        if (creep.memory.working) {
            if (creep.room.memory.constructionLevel === 0) {  // 房间启动阶段由harvester担任所有功能
                switch (creep.memory.tmpRole) {
                    case 'transfer': {// 防止变量名冲突加了{}
                        const targets = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN;
                            }
                        });
                        if (targets[0]) {
                            if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(targets[0]);
                            }
                        }
                    }
                        break;
                    case 'worker': {
                        const target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                        if (target) {
                            if (creep.build(target) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(target);
                            }
                        }
                    }
                        break;
                    case 'upgrader': {
                        const target = creep.room.controller;
                        if (target) {
                            if (creep.upgradeController(target) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(target);
                            }
                        }
                    }
                        break;
                    default:
                        Log.reportError('tmpRole is unexpected', 'harvester.ts');
                }
            } else {
                let target: StructureLink | StructureContainer | null = null;
                if (creep.memory.storeId) {
                    target = Game.getObjectById(creep.memory.storeId);
                }
                if (!target) {
                    target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_LINK;
                        }
                    }) as StructureLink | StructureContainer | null;
                }
                if (target) {
                    creep.memory.storeId = target.id;
                    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
        }
    }
}
