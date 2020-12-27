import { IChamberStatus } from "./IChamberStatus";
import { IChamberValues } from "./IChamberValues";

export interface IChamberInfo {
    no: number
    temperature: number
    humidity: number
    actualActuators: IChamberValues
    setActuators: IChamberValues
    status: IChamberStatus
}