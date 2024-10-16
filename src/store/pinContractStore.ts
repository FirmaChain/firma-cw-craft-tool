import { ContractInfoFromDB } from '@/interfaces/common';
import { isValidAddress } from '@/utils/address';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface ContractInfoFromLocal extends ContractInfoFromDB {
    type: 'cw20' | 'cw721';
}

const LOCAL_PINNED_CONTRACTS_KEY = 'PINNED_CONTRACTS';

const rawList = localStorage.getItem(LOCAL_PINNED_CONTRACTS_KEY);

const getParsedList = () => {
    try {
        if (rawList === null) return [];

        const parsed = JSON.parse(rawList); // pretended interface: Record<string, ContractInfoFromDB[]>

        return parsed;
    } catch (error) {
        return {};
    }
};

const parsedList = getParsedList();

interface FormProps {
    pinList: Record<string, ContractInfoFromLocal[]>;
    addPin: (address: string, data: ContractInfoFromLocal) => void;
    updatePin: (address: string, data: ContractInfoFromLocal) => void;
    removePin: (address: string, contractAddress: string) => void;
}

const usePinContractStore = create<FormProps>()(
    immer((set, get) => ({
        pinList: parsedList,

        addPin: (address: string, data: ContractInfoFromLocal) => {
            if (!isValidAddress(address)) return;

            const currentObj = get().pinList;
            const oldList = currentObj[address.toLowerCase()] || [];

            const listFilteredWithType = oldList.filter((v) => v.type === data.type);

            if (listFilteredWithType.length >= 10) {
                enqueueSnackbar({ message: 'You cannot pin more than 10 contracts.', variant: 'error' });
                return;
            }

            set((state) => {
                const newList = [data, ...oldList];
                const newObj = { ...state.pinList, [address.toLowerCase()]: newList };

                localStorage.setItem(LOCAL_PINNED_CONTRACTS_KEY, JSON.stringify(newObj));
                state.pinList = newObj;

                const prefix = data.type === 'cw20' ? 'Token' : data.type === 'cw721' ? 'NFT' : 'Contract';

                enqueueSnackbar({ message: `${prefix} pinned successfully!`, variant: 'success' });
            });
        },
        updatePin: (address: string, data: ContractInfoFromLocal) => {
            if (!isValidAddress(address)) return;

            const currentObj = get().pinList;
            const oldList = currentObj[address.toLowerCase()] || [];

            set((state) => {
                const updateIndex = oldList.findIndex((v) => v.contractAddress.toLowerCase() === data.contractAddress.toLowerCase());

                if (updateIndex === -1) {
                    // console.warn(`Cannot find contract ${data.contractAddress?.toLowerCase()}`);
                    return;
                }

                const newList = [...oldList];
                newList[updateIndex] = data;

                const newObj = { ...state.pinList, [address.toLowerCase()]: newList };
                localStorage.setItem(LOCAL_PINNED_CONTRACTS_KEY, JSON.stringify(newObj));
                state.pinList = newObj;

                console.log(`Contract ${data.address} information updated.`);
            });
        },
        removePin: (address: string, targetContractAddress: string) => {
            if (!isValidAddress(address)) return;

            const currentObj = get().pinList;
            const oldList = currentObj[address.toLowerCase()] || [];

            set((state) => {
                const removeTarget = oldList.find((v) => v.contractAddress.toLowerCase() === targetContractAddress.toLowerCase());

                const newList = oldList.filter((v) => v.contractAddress.toLowerCase() !== targetContractAddress.toLowerCase());
                const newObj = { ...state.pinList, [address.toLowerCase()]: newList };

                const prefix = removeTarget.type === 'cw20' ? 'Token' : removeTarget.type === 'cw721' ? 'NFT' : 'Contract';

                localStorage.setItem(LOCAL_PINNED_CONTRACTS_KEY, JSON.stringify(newObj));
                state.pinList = newObj;

                enqueueSnackbar({ message: `${prefix} unpinned successfully!`, variant: 'success' });
            });
        }
    }))
);

export default usePinContractStore;
