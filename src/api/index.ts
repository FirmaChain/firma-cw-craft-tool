import { stringifyUrl } from '@/utils/common';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

const REQUEST_TIMEOUT_MS = 60000;

export const apiRequestConfig = {
    timeout: REQUEST_TIMEOUT_MS,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
};

const axiosInstance: AxiosInstance = axios.create();

const requestInterceptors: any[] = [];
const responseInterceptors: any[] = [];

requestInterceptors.forEach((interceptor) => {
    axiosInstance.interceptors.request.use(interceptor as any);
});

axiosInstance.interceptors.response.use(...responseInterceptors);

class Api {
    static async get({ url, query, config }: { url: string; query?: any; config?: AxiosRequestConfig }) {
        return axiosInstance.get(stringifyUrl({ url: url, query }), config);
    }

    static async post({ url, query, body, config }: { url: string; body?: any; query?: any; config?: AxiosRequestConfig }) {
        return axiosInstance.post(stringifyUrl({ url: url, query: query }), body, config);
    }

    static async put({ url, query, body, config }: { url: string; body?: any; query?: any; config?: AxiosRequestConfig }) {
        return axiosInstance.put(stringifyUrl({ url: url, query: query }), body, config);
    }

    static async patch({ url, query, body, config }: { url: string; body?: any; query?: any; config?: AxiosRequestConfig }) {
        return axiosInstance.patch(stringifyUrl({ url: url, query: query }), body, config);
    }

    static async delete({ url, query, config }: { url: string; query?: any; config?: AxiosRequestConfig }) {
        return axiosInstance.delete(stringifyUrl({ url: url, query: query }), config);
    }
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export default Api;
