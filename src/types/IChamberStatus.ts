export default interface IChamberStatus {
    working: 'off' | 'waiting' | 'queued' | 'working' | 'addon';
    isAuto: boolean;
    queuePosition?: number | undefined;
}