import useExecuteStore from "@/components/organisms/execute/hooks/useExecuteStore";
import useInstantiateStore from "@/components/organisms/instantiate/instaniateStore";
import useSearchStore from "@/components/organisms/search/searchStore";
import { useCW20MyTokenContext } from "@/context/cw20MyTokenContext";
import useFormStore from "@/store/formStore";

const useResetStoreData = () => {
    // CW20
    const instantiateFormClear = useFormStore((state) => state.clearForm);
    const instantiateClear = useInstantiateStore((v) => v.clearForm);
    const { clearForm: clearExecuteForm, clearInfo: clearExecuteInfo } = useExecuteStore();
    const { clearCW20MyTokenData } = useCW20MyTokenContext();
    const { clearAll: clearSearchAll } = useSearchStore();

    const resetAll = () => {
        instantiateFormClear();
        instantiateClear();
        clearExecuteForm();
        clearExecuteInfo();
        clearCW20MyTokenData();
        clearSearchAll();
    }

    const resetForm = () => {
        instantiateFormClear();
        clearExecuteForm();
        clearSearchAll();
    }

    const resetInfo = () => {
        instantiateClear();
        clearExecuteInfo();
        clearCW20MyTokenData();
        clearSearchAll();
    }

    const resetForCWSwitch = () => {
        resetForm();
        instantiateClear();
        clearExecuteInfo();
        clearSearchAll();
    }

    return {
        resetAll,
        resetForm,
        resetInfo,
        resetForCWSwitch
    }
}

export default useResetStoreData