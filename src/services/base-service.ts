import { IFetchResponse } from "../types/IFetchResponse";
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiBaseUrl } from "@/configuration";

export class BaseService<TEntity> {
    protected contentType: string | undefined;

    private authHeaders = {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
    };

    constructor(protected apiEndpointUrl: string) {
        this.apiEndpointUrl = apiEndpointUrl;
    }

    async get(): Promise<IFetchResponse<TEntity>> {
        try {
            const url = ApiBaseUrl + this.apiEndpointUrl;
            const response = await axios.get(url, { headers: this.authHeaders });
            if (this.wasSuccess(response)) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity,
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    return {
                        statusCode: error.response.status,
                        data: error.response.data,
                        errorMessage: error.response.statusText
                    }
                } else {
                    return {
                        statusCode: 0,
                        errorMessage: JSON.stringify(error)
                    }
                }
            } else {
                return {
                    statusCode: 0,
                    errorMessage: JSON.stringify(error)
                }
            }
        }
    }

    async post(entity: TEntity): Promise<IFetchResponse<TEntity>> {
        const url = ApiBaseUrl + this.apiEndpointUrl
        const entityStr = JSON.stringify(entity);
        try {
            const response = await axios.post(url, entityStr, { headers: this.authHeaders });
            if (this.wasSuccess(response)) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity,
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    return {
                        statusCode: error.response.status,
                        data: error.response.data,
                        errorMessage: error.response.statusText
                    }
                } else {
                    return {
                        statusCode: 0,
                        errorMessage: "Error"
                    }
                }
            } else {
                return {
                    statusCode: 0,
                    errorMessage: JSON.stringify(error)
                }
            }
        }
    }

    private wasSuccess(response: AxiosResponse<any, any>): boolean {
        return response.status >= 200 && response.status < 300;
    }
}
