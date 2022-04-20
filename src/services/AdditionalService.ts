import IAdditionalInfo from '@/types/IAdditionalInfo';
import { fixStatus } from '@/types/IChamberStatus';
import * as rest from 'typed-rest-client/RestClient'

export default class AdditionalService {
    private static actualState: IAdditionalInfo = { roofs: [], wents: [] }
    private readonly restClient: rest.RestClient;

    constructor(baseUrl: string){
        this.restClient = new rest.RestClient('dryer-client', baseUrl);
    }

    public get ActualState() {
        return AdditionalService.actualState;
    }

    public async getStatus(): Promise<IAdditionalInfo>
    {
        const result = await this.restClient.get<IAdditionalInfo>(`/Additional`);
        return new Promise((resolve, reject) => {
            if (result.statusCode === 200 && result.result) {
                var roofStatuses = result.result.roofs.map(r => r.roof.status);
                var wentStatuses = result.result.wents.map(w => w.status);
                roofStatuses.concat(wentStatuses).forEach(fixStatus);

                AdditionalService.actualState = result.result;
                resolve(AdditionalService.actualState);
            }
            else
                reject(result.statusCode);
        });
    }

    public async setWent(no: number, value: number): Promise<IAdditionalInfo>
    {
        const result = await this.restClient.create<IAdditionalInfo>(`/Additional/Went/${no}`, value);
        return new Promise((resolve, reject) => {
            if (result.statusCode === 200 && result.result) {
                AdditionalService.actualState = result.result;
                resolve(AdditionalService.actualState);
            }
            else
                reject(result.statusCode);
        });
    }

    public async setRoof(no: number, roof: boolean): Promise<IAdditionalInfo>
    {
        const result = await this.restClient.create<IAdditionalInfo>(`/Additional/Roof/${no}`, roof);
        return new Promise((resolve, reject) => {
            if (result.statusCode === 200 && result.result) {
                AdditionalService.actualState = result.result;
                resolve(AdditionalService.actualState);
            }
            else
                reject(result.statusCode);
        });
    }
}
