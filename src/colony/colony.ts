import { Log } from "utils/log";

export class Colony {
    roomName: string;
    creeps: { [role: string]: CreepExtention[] } = {};
    constructor(name: string) {
        this.roomName = name;
        this.sign();
    }
    sign() {
        global.colonys[this.roomName] = this;
    }
    registerCreep(creep: CreepExtention, role: string) {
        this.creeps[role].push(creep);
    }
    clear() {
        for (const role in this.creeps) {
            for (const index in this.creeps[role]) {
                if (!Game.getObjectById(this.creeps[role][index].id)) {
                    this.creeps[role].splice(+index, 1);
                }
            }
        }
    }
    run() {
        const room = Game.rooms[this.roomName];
        if (!room) {
            Log.reportError('can\'t find room ' + this.roomName, 'colony.ts');
            return;
        }
        room.memory.constructionLevel = 1;
        switch (room.memory.constructionLevel) {
            case 1: {

            }
                break;
            default:
                Log.reportError('wrong constructionLevel', 'colony.ts');
        }
    }
}
