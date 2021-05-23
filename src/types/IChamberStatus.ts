export default interface IChamberStatus {
    working: 'off' | 'waiting' | 'queued' | 'working' | 'addon' | 'error';
    isAuto: boolean;
    queuePosition?: number | undefined;
    isActive: boolean;
}