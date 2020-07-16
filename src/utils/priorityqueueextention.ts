import { Log } from "./log";

export class PriorityQueueExtention {
    static push<T>(queue: PriorityQueue<T>, content: T, priority: number) {
        if (priority < 0 || priority > 10) {
            Log.reportError('priority exceeded', 'priorityqueueextention.ts');
        }
        if (priority > queue.ptr) queue.ptr = priority;
        queue.queue[priority].push(content);
    }
    static pop<T>(queue: PriorityQueue<T>, calcCost?: (t: T) => number): T | null {
        let res: T | null = null;
        for (let i = queue.ptr; i > 0; i--) {
            if (queue.queue[i].length !== 0) {
                let resIdx: number | null = null;
                let minCost: number | null = null;
                for (const j in queue.queue[i]) {
                    const cost = calcCost ? calcCost(queue.queue[i][j]) : 0;
                    minCost = minCost === null ? cost : Math.min(cost, minCost);
                    if (cost === minCost) {
                        res = queue.queue[i][j];
                        resIdx = +j;
                    }
                }
                if (!res || !resIdx) {
                    Log.reportError('res shouldn\'t be empty', 'priorityqueueextention.ts');
                    return null;
                }
                queue.queue[i].splice(resIdx, 1);
                break;
            }
        }
        for (let i = queue.ptr; i > 0; i--) {
            if (queue.queue[i].length !== 0) {
                queue.ptr = i;
                return res;
            }
        }
        queue.ptr = 0;
        return res;
    }
    static claer<T>(queue: PriorityQueue<T>) {
        for (const i in queue.queue) {
            queue.queue[i] = [];
            queue.ptr = 0;
        }
    }
}
