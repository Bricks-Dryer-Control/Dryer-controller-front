import IAutoControl from '@/types/IAutoControl';
import * as rest from 'typed-rest-client/RestClient'

export default class AutoControlService {
    private readonly restClient: rest.RestClient;

    constructor(baseUrl: string){
        this.restClient = new rest.RestClient('dryer-client', baseUrl);
    }

    public async getList(): Promise<string[]> {
        const result = await this.restClient.get<string[]>(`/auto`);
        return new Promise((resolve, reject) => {
            if (result.statusCode === 200 && result.result) {
                resolve(result.result);
            }
            else
                reject(result.statusCode);
        });
    }

    public async getOne(name: string): Promise<IAutoControl>
    {
        const result = await this.restClient.get<IAutoControl>(`/auto/${encodeURI(name)}`);
        return new Promise((resolve, reject) => {
            if (result.statusCode === 200 && result.result) {
                resolve(result.result);
            }
            else
                reject(result.statusCode);
        });
    }

    public async sendOne(value: IAutoControl)
    {
        this.restClient.create<IAutoControl>(`/auto`, value);
    }

    public async delete(name: string)
    {
        await this.restClient.del<string>(`/auto/${encodeURI(name)}`);
    }
}
