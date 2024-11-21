import { stringifyUrl } from '@/utils/common';
import { getAccessToken, setAccessToken } from '@/utils/token';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { CRAFT_CONFIGS } from '@/config';
// import { store } from '@/redux';
import ContractApi from './contractApi';
import useWalletStore from '@/store/walletStore';

export interface CustomApiOptions extends AxiosRequestConfig {
    withJWT?: boolean;
}

const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    async (config) => {
        let token = getAccessToken();

        if (!config.url.replace(CRAFT_CONFIGS.CRAFT_SERVER_URI, '').startsWith(`/connect/sign/refreshToken`)) {
            if (!token) {
                const walletAddress = useWalletStore.getState().address;
                const data = await ContractApi.refreshToken({ walletAddress });

                setAccessToken(data.result.token, { minutes: 14 });
                token = data.result.token;
            }

            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

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
