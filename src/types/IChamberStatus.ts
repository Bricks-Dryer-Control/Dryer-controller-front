export default interface IChamberStatus {
    working: number | 'off' | 'waiting' | 'queued' | 'working' | 'addon' | 'error';
    isAuto: boolean;
    queuePosition?: number | undefined;
    isActive: boolean;
    outFlowOffset: number;
}

const statuses = ["off", "waiting", "queued", "working", "addon", "error"];
export function fixStatus(status: IChamberStatus) {
    if (Number.isInteger(status.working)) {
        status.working = statuses[Number(status.working)] as "off" | "waiting" | "queued" | "working" | "addon" | "error";
    }
    if (status.working === "waiting" && !status.isActive)
        status.working = "off";
}