import { CRAFT_CONFIGS } from '@/config';
import Api, { CustomApiOptions } from '.';
import { AddContractInfo, AddContractReq, DeleteContractFromDBReq, UpdateContractOwnerReq, UpdateTokenLogo } from '@/interfaces/common';

const baseUri = CRAFT_CONFIGS.CRAFT_SERVER_URI;

class ContractApi {
    static async getMyContracts(params: { type: 'cw20' | 'cw721'; address: string }, options?: CustomApiOptions) {
        // const accessToken = getAccessToken();

        return await Api.get({
            url: `${baseUri}/api/my-contracts`,
            query: { ...params }
            // config: {
            //     headers: { Authorization: `Bearer ${accessToken}` }
            // }
        }).then((res) => res.data);
    }

    static async getSearchContracts(
        params: {
            type: 'cw20' | 'cw721';
            keyword: string;
            filter: 'address' | 'any';
        },
        options?: CustomApiOptions
    ) {
        return await Api.get({
            url: `${baseUri}/api/search`,
            query: {
                ...params
            }
        }).then((res) => res.data);
    }

    static async addContractToDB(params: AddContractReq, options?: CustomApiOptions) {
        // const accessToken = getAccessToken();

        return await Api.post({
            url: `${baseUri}/api/create`,
            body: params,
            config: {
                ...options
            }
            // config: {
            //     headers: { Authorization: `Bearer ${accessToken}` }
            // }
        }).then((res) => res.data);
    }

    static async updateTokenLogo(params: UpdateTokenLogo, options?: CustomApiOptions) {
        // const accessToken = getAccessToken();

        return await Api.put({
            url: `${baseUri}/api/token-logo-url`,
            body: params,
            config: {
                ...options
            }
        }).then((res) => res.data);
    }

    static async refreshToken(params: { walletAddress: string }, options?: CustomApiOptions) {
        // const accessToken = getAccessToken();

        return await Api.get({
            url: `${baseUri}/connect/sign/refreshToken`,
            query: { ...params },
            config: {
                ...options
            }
        }).then((res) => res.data);
    }

    static async deleteContractFromDB(params: DeleteContractFromDBReq, options?: CustomApiOptions) {
        return await Api.delete({
            url: `${baseUri}/api/admin`,
            query: {
                ...params,
                hash: '0x' + params.hash
            },
            config: {
                ...options
            }
        }).then((res) => res.data);
    }

    static async updateContractOwner(params: UpdateContractOwnerReq, options?: CustomApiOptions) {
        return await Api.put({
            url: `${baseUri}/api/admin`,
            body: {
                ...params
            },
            config: {
                ...options
            }
        }).then((res) => res.data);
    }
}

export default ContractApi;
