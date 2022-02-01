import { IFetchResponse } from "../types/IFetchResponse";
import { ApiBaseUrl } from '../configuration';
import axios from 'axios';

export class BaseService<TEntity> {
    constructor(protected apiEndpointUrl: string) {
        this.apiEndpointUrl = apiEndpointUrl
    }

    private authHeaders = {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };

    async getAll(): Promise<IFetchResponse<TEntity[]>> {
        const url = ApiBaseUrl + this.apiEndpointUrl;

        try {
            const response = await axios.get(url, { headers: this.authHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity[],
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async get(): Promise<IFetchResponse<TEntity>> {
        const url = ApiBaseUrl + this.apiEndpointUrl;

        try {
            const response = await axios.get(url, { headers: this.authHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity,
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async post(entity: TEntity): Promise<IFetchResponse<TEntity>> {
        const url = ApiBaseUrl + this.apiEndpointUrl;
        const entityStr = JSON.stringify(entity);

        try {
            const response = await axios.post(url, entityStr, { headers: this.authHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity,
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }
}
