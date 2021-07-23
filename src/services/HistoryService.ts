import IHistoryRequestData from '@/types/IHistoryRequestData';
import IHistoryResult from '@/types/IHistoryResult';
import * as rest from 'typed-rest-client/RestClient'

export default class HistoryService {
    private readonly restClient: rest.RestClient;

    constructor(baseUrl: string){
        this.restClient = new rest.RestClient('dryer-client', baseUrl);
    }

    public async getHistory(data: IHistoryRequestData): Promise<IHistoryResult>
    {
        const result = await this.restClient.get<IHistoryResult>(`/History?no=${data.no}&from=${data.from}&to=${data.to}`);
        return new Promise((resolve, reject) => {
            if (result.statusCode === 200 && result.result) {
                resolve(result.result);
            }
            else
                reject(result.statusCode);
        });
    }
}
