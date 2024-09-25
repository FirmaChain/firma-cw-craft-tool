import { CRAFT_CONFIGS } from '@/config';
import Api from '.';
import { AddContractInfo } from '@/interfaces/common';

const baseUri = CRAFT_CONFIGS.CRAFT_SERVER_URI;

class ContractApi {
    static async getMyContracts(params: { type: 'cw20' | 'cw721'; address: string }) {
        return await Api.get({
            url: `${baseUri}/api/my-contracts`,
            query: {
                ...params
            }
        }).then((res) => res.data);
    }

    static async getSearchContracts(params: { type: 'cw20' | 'cw721'; keyword: string; limit?: number }) {
        //? Limit is default 10 | no max value (for now)
        return await Api.get({
            url: `${baseUri}/api/search`,
            query: {
                ...params
            }
        }).then((res) => res.data);
    }

    static async addContractToDB(params: AddContractInfo) {
        return await Api.post({
            url: `${baseUri}/api/create`,
            body: params
        }).then((res) => res.data);
    }
}

export default ContractApi;
