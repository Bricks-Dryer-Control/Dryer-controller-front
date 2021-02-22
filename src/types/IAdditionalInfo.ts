import IAdditionalRoofInfo from "./IAdditionalRoofInfo";
import IAdditionalStatus from "./IAdditionalStatus";

export default interface IAdditionalInfo {
    roofs: IAdditionalRoofInfo[];
    wents: IAdditionalStatus[];
}