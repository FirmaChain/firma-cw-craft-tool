import { useMutation } from '@tanstack/react-query';
import ContractApi from './contractApi';
import { UseMutationOptionsWrapper } from '@/types';
import {
    AddContractInfo,
    AddContractReq,
    FetchContractResult,
    UpdateContractOwnerReq,
    UpdateContractOwnerRes,
    UpdateTokenLogo
} from '@/interfaces/common';

export const useAddContractMutation = (params: AddContractReq, options?: UseMutationOptionsWrapper<FetchContractResult>) => {
    return useMutation({
        mutationFn: () => {
            return ContractApi.addContractToDB(params);
        },
        ...options
    });
};

export const useUpdateTokenLogo = (params: UpdateTokenLogo, options?: UseMutationOptionsWrapper<FetchContractResult>) => {
    return useMutation({
        mutationFn: () => {
            return ContractApi.updateTokenLogo(params);
        },
        ...options
    });
};

export const useUpdateContractOwner = (params: UpdateContractOwnerReq, options?: UseMutationOptionsWrapper<UpdateContractOwnerRes>) => {
    return useMutation({
        mutationFn: () => {
            return ContractApi.updateContractOwner(params);
        },
        ...options
    });
};
