import { useMutation } from '@tanstack/react-query';
import ContractApi from './contractApi';
import { UseMutationOptionsWrapper } from '@/types';
import { AddContractInfo, FetchContractResult } from '@/interfaces/common';

export const useAddContractMutation = (params: AddContractInfo, options?: UseMutationOptionsWrapper<FetchContractResult>) => {
    return useMutation({
        mutationFn: () => {
            return ContractApi.addContractToDB(params);
        },
        ...options
    });
};
