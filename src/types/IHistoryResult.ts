export default interface IHistoryResult {
    no: number,
    sensors: {
        time: number
        timestampUtc: string,
        temperature: number,
        humidity: number,
    }[],
    status: {
        time: number
        timestampUtc: string,
        working: 'off' | 'waiting' | 'queued' | 'working' | 'addon' | 'error',
        isAuto: boolean,
        queuePosition: number | null | undefined,
        inFlowPosition: number,
        outFlowPosition: number,
        throughFlowPosition: number,
        inFlowSet: number,
        outFlowSet: number,
        throughFlowSet: number,
        isListening: boolean
    }[],
}


const statuses = ["off", "waiting", "queued", "working", "addon", "error"];
export function fixHistoryResult(historyResult: IHistoryResult) {  
    historyResult.sensors.forEach(s => s.time = Date.parse(s.timestampUtc+'Z'))
    historyResult.status.forEach(s => s.time = Date.parse(s.timestampUtc+'Z'))

    historyResult.status.forEach(s => {
        if (Number.isInteger(s.working)) {
            s.working = statuses[Number(s.working)] as "off" | "waiting" | "queued" | "working" | "addon" | "error";
        }  
    });
}