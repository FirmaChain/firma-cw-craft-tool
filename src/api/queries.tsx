import { useQuery } from '@tanstack/react-query';
import ContractApi from './contractApi';
import { UseQueryOptionsWrapper } from '@/types';
import { FetchContractResult } from '@/interfaces/common';

type ContractType = 'cw20' | 'cw721';

export const useContractSearchQuery = (
    params: { type: ContractType; keyword: string; limit?: number },
    options?: UseQueryOptionsWrapper<FetchContractResult>
) => {
    const { type, keyword, limit = 10 } = params;

    const queryKey = ['SEARCH', type, keyword];

    return useQuery({
        queryKey,
        queryFn: () =>
            ContractApi.getSearchContracts({
                type,
                keyword,
                limit
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
