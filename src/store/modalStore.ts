import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { ModalContent } from '@/hooks/useModal';

interface Modal extends ModalContent {
    id: string;
}

interface ModalStore {
    modals: Modal[];
    openModal: (content: ModalContent) => string;
    closeModal: (id?: string) => void;
    closeAllModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
    modals: [],
    openModal: (content: ModalContent) => {
        const id = uuidv4();
        set((state) => ({
            modals: [...state.modals, { id, ...content }]
        }));
        return id;
    },
    closeModal: (id?: string) => {
        set((state) => ({
            modals: id ? state.modals.filter((modal) => modal.id !== id) : state.modals.slice(0, -1)
        }));
    },
    closeAllModal: () => {
        set({ modals: [] });
    }
}));

export default useModalStore;
