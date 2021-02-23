import IChamberInfo from '@/types/IChamberInfo';
import IChamberValues from '@/types/IChamberValues';
import * as rest from 'typed-rest-client/RestClient'

export default class ChamberService {
    private static actualState: IChamberInfo[] = [];
    private readonly restClient: rest.RestClient;

    constructor(baseUrl: string){
        this.restClient = new rest.RestClient('dryer-client', baseUrl);
    }

    public get ActualState() {
        return ChamberService.actualState;
    }

    public static get Count() {
        return ChamberService.actualState.length;
    }

    public async getAllChambers(): Promise<IChamberInfo[]>
    {
        var result = await this.restClient.get<IChamberInfo[]>('/Chamber');
        return new Promise((resolve, reject) => {
            if (result.statusCode === 200 && result.result) {
                ChamberService.MergeChamberInfosArray(result.result)
                resolve(ChamberService.actualState);
            }
            else
                reject(result.statusCode);
        })
    }

    public async getChamber(no: number): Promise<IChamberInfo>
    {
        if (!ChamberService.actualState[0]) {
            await this.getAllChambers();
            return new Promise((resolve, reject) => resolve(ChamberService.actualState[no - 1]));
        } else if (no > 0 && no < ChamberService.actualState.length) {
            const result = await this.restClient.get<IChamberInfo>(`/Chamber/${no}`);
            return new Promise((resolve, reject) => {
                if (result.statusCode === 200 && result.result) {
                    if (ChamberService.actualState[no - 1].readingTime < result.result.readingTime)
                        ChamberService.actualState[no - 1] = result.result;
                    resolve(ChamberService.actualState[no - 1]);
                }
                else
                    reject(result.statusCode);
            });
        } else {
            return new Promise((resolve, reject) => reject());
        }
    }

    public async setChamber(no: number, isOn: boolean, setValues?: IChamberValues): Promise<IChamberInfo>
    {
        const result = await this.restClient.create<IChamberInfo>(`/Chamber/${no}`, {isOn: isOn, newSets: setValues});
        return new Promise((resolve, reject) => {
            if (result.statusCode === 200 && result.result) {
                if (ChamberService.actualState[no - 1].readingTime < result.result.readingTime)
                    ChamberService.actualState[no - 1] = result.result;
                resolve(ChamberService.actualState[no - 1]);
            }
            else
                reject(result.statusCode);
        });
    }

    private static MergeChamberInfosArray(newOne: IChamberInfo[]) {
        if (newOne.length > this.actualState.length) {
            this.actualState = newOne;
        } else {
            this.actualState = this.actualState.map((v, i) => {
                if (v.readingTime < newOne[i].readingTime)
                    return newOne[i];
                return v;
            })
        }
    }
}
