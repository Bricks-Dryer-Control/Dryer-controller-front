import IAutoControlItem from "./IAutoControlItem";

export default interface IAutoControl {
    name: string;
    timeToSetSeconds: number
    temperatureDifference: number
    controlDifference: number
    controlType: number
    kp: number
    ki: number
    minInFlow: number
    maxInFlow: number
    minOutFlow: number
    maxOutFlow: number
    percent: number
    offset: number
    sets: IAutoControlItem[]
}