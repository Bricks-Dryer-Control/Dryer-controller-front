export interface IChamberStatus {
    working: 'off' | 'waiting' | 'queued' | 'working' | 'addon';
    isAuto: boolean;
    queuePosition?: number | undefined;
}