import IChamberStatus from "./IChamberStatus";
import IChamberValues from "./IChamberValues";

export default interface IChamberInfo {
    no: number
    temperature: number
    humidity: number
    readingTime: Date
    actualActuators: IChamberValues
    setActuators: IChamberValues
    status: IChamberStatus
}