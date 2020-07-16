// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {// Memory相关
  role: string;
  room: string;
  working: boolean;
}

interface HarvesterCreepMemory extends CreepMemory {
  sourceId: Id<Source>;
  tmpRole: string;
  storeId?: Id<StructureContainer | StructureLink>;
}

interface RoomMemory {
  constructionLevel: number;
  spawnQueue: PriorityQueue<SpawnTask>;
  woekQueue: PriorityQueue<WorkTask>;
  transferQueue: PriorityQueue<TransferTask>;
  waring: boolean;
}

interface Memory {
  uuid: number;
  log: any;
}

interface Task {
  priority: number;
}

interface SpawnTask extends Task {
  body: BodyPartConstant[];
  spawnId: Id<StructureSpawn>;
  name: string;
  opts?: SpawnOptions;
}

declare enum WorkType {
  WORK_BUILD,
  WORK_REPAIR
}

interface WorkTask extends Task {
  type: WorkType;
  targetId: Id<Structure | ConstructionSite>;
  targetHits?: number;
}

interface TransferTask extends Task {
  type: ResourceConstant;
  fromId: Id<Structure>;
  toId: Id<Structure>;
  amount: number;
}

interface HarvesterCreep extends Creep {
  memory: HarvesterCreepMemory;
}
interface WorkerCreep extends Creep {

}
declare class Colony {
  roomName: string;
  creeps: { [role: string]: CreepExtention[] };
  constructor(name: string);
  sign(): void;
  registerCreep(creep: CreepExtention, role: string): void;
  clear(): void;
  run(): void;
}

declare class CreepExtention {
  id: Id<Creep>
  colony: Colony | null;
  constructor(id: Id<Creep>);
}
// `global` extension samples

interface PriorityQueue<T> {
  ptr: number;
  queue: T[][];
}

declare namespace NodeJS {
  interface Global {
    log: any;
    colonys: { [index: string]: Colony; };
  }
}
