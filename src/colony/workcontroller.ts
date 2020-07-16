import { PriorityQueueExtention } from "utils/priorityqueueextention";
import { Log } from "utils/log";

export class WorkController {
    queue: PriorityQueue<WorkTask>;// 其实可以不放在memory中，但为了与其他的queue统一，就这么写了
    addedTarget: Set<Id<Structure | ConstructionSite>> | null = null;
    roomName: string;
    constructor(_q: PriorityQueue<WorkTask>, _r: string) {
        this.queue = _q
        this.roomName = _r;
    }
    addTask() {
        const room = Game.rooms[this.roomName];
        const constructionSites = room.find(FIND_CONSTRUCTION_SITES);
        for (const o of constructionSites) {
            if (this.addedTarget?.has(o.id)) continue;
            const task: WorkTask = { type: WorkType.WORK_BUILD, priority: 1, targetId: o.id };
            switch (o.structureType) {
                case STRUCTURE_EXTENSION:
                    task.priority = 8;
                    break;
                case STRUCTURE_CONTAINER:
                    task.priority = 6;
                    break;
                case STRUCTURE_ROAD:
                    task.priority = 5;
                    break;
                default:
                    task.priority = 1;
            }
            PriorityQueueExtention.push(this.queue, task, task.priority);
        }
        const structures = room.find(FIND_STRUCTURES, { filter: (structure) => { return structure.hits < structure.hitsMax; } });
        for (const o of structures) {
            if (this.addedTarget?.has(o.id)) continue;
            const task: WorkTask = { type: WorkType.WORK_REPAIR, priority: 1, targetId: o.id };
            switch (o.structureType) {
                case STRUCTURE_CONTAINER:
                    if (o.hits < o.hitsMax / 2)
                        task.priority = 6;
                    break;
                case STRUCTURE_ROAD:
                    if (o.hits < o.hitsMax / 2)
                        task.priority = 5;
                    break;
                case STRUCTURE_WALL:
                case STRUCTURE_RAMPART:
                case STRUCTURE_TOWER:
                    if (room.memory.waring)
                        task.priority = 10;
                    else task.priority = 2;
                    task.targetHits = Math.min(o.hitsMax, o.hits + 10000);
                default:
                    task.priority = 4;
            }
            PriorityQueueExtention.push(this.queue, task, task.priority);
        }
    }
    getTask(creep: WorkerCreep): WorkTask | null {
        return PriorityQueueExtention.pop(this.queue, (t: WorkTask): number => {
            const o = Game.getObjectById(t.targetId);
            if (!o) {
                Log.reportError('can\'t find object', 'workcontroller');
                return 10000;
            }
            return Math.abs(creep.pos.x - o.pos.x) + Math.abs(creep.pos.y - o.pos.y);
        });
    }
    run() {
        if (this.addedTarget === null) {
            this.addedTarget = new Set<Id<Structure | ConstructionSite>>();
            PriorityQueueExtention.claer(this.queue);
            this.addTask();
        } else if (Game.time % 1000 === 0) {
            this.addTask();
        }
    }
}
