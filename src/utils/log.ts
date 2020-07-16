export class Log {
    static reportError(msg: string, fileName: string) {
        const fullMsg = 'Err message:' + msg + 'in ' + fileName;
        console.log(fullMsg);
        Game.notify(fullMsg, 30);
    }
}
