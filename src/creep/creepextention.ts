import { Log } from "utils/log";

export class CreepExtention {
    id: Id<Creep>
    colony: Colony | null = null;
    constructor(id: Id<Creep>) {
        this.id = id;
        const creep = Game.getObjectById(id);
        if (!creep) {
            Log.reportError('can\'t find ' + id, 'creepextention.ts');
            return;
        }
        this.colony = global.colonys[creep.room.name];
        this.colony.registerCreep(this, creep.memory.role);
    }
}
