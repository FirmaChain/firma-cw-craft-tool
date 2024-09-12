import useExecuteStore from '@/components/organisms/execute/hooks/useExecuteStore';
import useInstantiateStore from '@/components/organisms/instantiate/instaniateStore';
import useSearchStore from '@/components/organisms/search/searchStore';
import { useCW20MyTokenContext } from '@/context/cw20MyTokenContext';
import { useCW721NFTContractsContext } from '@/context/cw721MyNFTContractsContext';
import { useCW721NFTListContext } from '@/context/cw721NFTListContext';

import useInstantiateStoreCW721 from '@/components/organisms/cw721/instantiate/instantiateStore';
import useExecuteStoreCW721 from '@/components/organisms/cw721/execute/hooks/useCW721ExecuteStore';
import useSearchStoreCW721 from '@/components/organisms/cw721/search/cw721SearchStore';

import useFormStore from '@/store/formStore';
import { useCW721OwnedNFTListContext } from '@/context/cw721OwnedNFTListContext';
import useNFTContractDetail from './useNFTContractDetail';
import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';

const useResetStoreData = () => {
    // CW20
    const formClear = useFormStore((state) => state.clearForm);
    const { clearForm: cw20ClearInstantiateForm } = useInstantiateStore();
    const { clearForm: cw20ClearExecuteForm, clearInfo: cw20ClearExecuteInfo } = useExecuteStore();
    const { clearCW20MyTokenData } = useCW20MyTokenContext();
    const { clearAll: cw20ClearSearchAll } = useSearchStore();

    // CW721
    const { clearCW721NFTListData } = useCW721NFTListContext();
    const { clearCW721NFTListData: clearCW721OwnedNFTListData } = useCW721OwnedNFTListContext();
    const { clearCW721NFTContractsData } = useCW721NFTContractsContext();
    const { clearForm: cw721ClearDetailInfo } = useNFTContractDetailStore();
    const { clearForm: cw721ClearInstantiacteForm } = useInstantiateStoreCW721();
    const { clearForm: cw721ClearExecuteForm, clearInfo: cw721ClearExecuteInfo } = useExecuteStoreCW721();
    const { clearAll: cw721ClearSearchAll } = useSearchStoreCW721();

    const resetAll = () => {
        formClear();
        cw20ClearInstantiateForm();
        cw20ClearExecuteForm();
        cw20ClearExecuteInfo();
        clearCW20MyTokenData();
        cw20ClearSearchAll();

        clearCW721NFTListData();
        clearCW721OwnedNFTListData();
        clearCW721NFTContractsData();
        cw721ClearDetailInfo();
        cw721ClearInstantiacteForm();
        cw721ClearExecuteForm();
        cw721ClearExecuteInfo();
        cw721ClearSearchAll();
    };

    const resetForm = () => {
        formClear();
        cw20ClearInstantiateForm();
        cw20ClearExecuteForm();
        cw20ClearSearchAll();

        cw721ClearInstantiacteForm();
        cw721ClearExecuteForm();
        cw721ClearSearchAll();
    };

    const resetInfo = () => {
        cw20ClearExecuteInfo();
        clearCW20MyTokenData();
        cw20ClearSearchAll();

        clearCW721NFTListData();
        clearCW721OwnedNFTListData();
        cw721ClearDetailInfo();
        clearCW721NFTContractsData();
        cw721ClearExecuteInfo();
        cw721ClearSearchAll();
    };

    const resetForCWSwitch = () => {
        resetForm();
        cw20ClearExecuteInfo();
        cw20ClearSearchAll();

        cw721ClearExecuteInfo();
        cw721ClearSearchAll();
    };

    return {
        resetAll,
        resetForm,
        resetInfo,
        resetForCWSwitch
    };
};

export default useResetStoreData;
