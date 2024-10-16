import { useQuery } from '@tanstack/react-query';
import ContractApi from './contractApi';
import { UseQueryOptionsWrapper } from '@/types';
import {
    DeleteContractFromDBReq,
    DeleteContractFromDBRes,
    FetchContractResult,
    RefreshTokenRes,
    SearchContractResult
} from '@/interfaces/common';

type ContractType = 'cw20' | 'cw721';

export const useContractSearchQuery = (
    params: { type: ContractType; keyword: string; limit?: number; filter: 'address' | 'any' },
    options?: UseQueryOptionsWrapper<SearchContractResult>
) => {
    const { type, keyword, filter } = params;

    const queryKey = ['CONTRACT_SEARCH', type, keyword, filter];

    return useQuery({
        queryKey,
        queryFn: () =>
            ContractApi.getSearchContracts({
                ...params
            }),
        ...options
    });
};

export const useMyContractQuery = (
    params: { type: ContractType; address: string; sortBy?: 'name' | 'createdAt' | string; sortOrder?: 'asc' | 'desc' },
    options?: UseQueryOptionsWrapper<FetchContractResult>
) => {
    const { type, address } = params;

    const queryKey: any = ['MY_CONTRACT', type, address];

    return useQuery({
        queryKey,
        queryFn: () =>
            ContractApi.getMyContracts({
                ...params
            }),
        ...options
    });
};

export const useRefreshToken = (params: { walletAddress: string }, options?: UseQueryOptionsWrapper<RefreshTokenRes>) => {
    const queryKey = ['REFRESH_TOKEN', params.walletAddress];

    return useQuery({
        queryKey,
        queryFn: () => ContractApi.refreshToken(params),
        ...options
    });
};

export const useDeleteContractFromDB = (params: DeleteContractFromDBReq, options?: UseQueryOptionsWrapper<DeleteContractFromDBRes>) => {
    const queryKey = ['DELETE_CONTRACT_FROM_DB'];

    return useQuery({
        queryKey,
        queryFn: () => ContractApi.deleteContractFromDB(params),
        ...options
    });
};
