import IChamberStatus, { fixStatus } from "./IChamberStatus";
import IChamberValues from "./IChamberValues"
import IAutoControlStatus from "./IAutoControlStatus"

export default interface IChamberInfo {
    no: number
    temperature: number
    humidity: number
    readingTime: Date
    actualActuators: IChamberValues
    setActuators: IChamberValues
    status: IChamberStatus
    autoControlStatus: IAutoControlStatus
}

export function fixChamberInfoStatus(chamberInfo: IChamberInfo) {
    fixStatus(chamberInfo.status);
}