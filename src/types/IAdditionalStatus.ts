import IChamberStatus from "./IChamberStatus";

export default interface IAdditionalStatus {
    actualValue: number;
    setValue: number;
    status: IChamberStatus;
}