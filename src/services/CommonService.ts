import ICommonStatus from '@/types/ICommonStatus';
import * as rest from 'typed-rest-client/RestClient'

export default class CommonService {
    private static actualState: ICommonStatus = { workingNow: 0, direction: false, inQueue: 0, turnedOn: 0 }
    private readonly restClient: rest.RestClient;

    constructor(baseUrl: string){
        this.restClient = new rest.RestClient('dryer-client', baseUrl);
    }

    public get ActualState() {
        return CommonService.actualState;
    }

    public async getStatus(): Promise<ICommonStatus>
    {
        const result = await this.restClient.get<ICommonStatus>(`/Common`);
        return new Promise((resolve, reject) => {
            if (result.statusCode === 200 && result.result) {
                CommonService.actualState = result.result;
                resolve(CommonService.actualState);
            }
            else
                reject(result.statusCode);
        });
    }

    public async sendStopAll(): Promise<ICommonStatus>
    {
        const result = await this.restClient.create<ICommonStatus>(`/Common`, true);
        return new Promise((resolve, reject) => {
            if (result.statusCode === 200 && result.result) {
                CommonService.actualState = result.result;
                resolve(CommonService.actualState);
            }
            else
                reject(result.statusCode);
        });
    }
}
