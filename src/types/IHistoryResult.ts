export default interface IHistoryResult {
    no: number,
    sensors: {
        timeUtc: Date,
        value: {
            temperature: number,
            humidity: number,
        }
    }[],
    status: {
        timeUtc: Date,
        value: {
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
        }
    }[],
}


const statuses = ["off", "waiting", "queued", "working", "addon", "error"];
export function fixHistoryResultStatus(historyResult: IHistoryResult) {
    historyResult.status.forEach(s => {
        if (Number.isInteger(s.value.working)) {
            s.value.working = statuses[Number(s.value.working)] as "off" | "waiting" | "queued" | "working" | "addon" | "error";
        }  
    });
}