import { omitKey } from '@/utils/common';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type DataTypes = string;

interface FormData {
    id: string;
    value: DataTypes;
}

interface FormError {
    id: string;
    type: string;
    message: string;
}

interface ClearFormErrorTarget {
    id: string;
    type?: string;
}

type DataStore = Record<string, DataTypes>;
type ErrorStore = Record<string, Record<string, string>>;

interface FormProps {
    formData: DataStore;
    formError: ErrorStore;
    initFormData: (data: Record<string, DataTypes>) => void;
    setFormData: (data: FormData) => void;
    setFormError: (error: FormError) => void;
    clearFormError: (target: ClearFormErrorTarget) => void;
    clearForm: () => void;
}

const useFormStore = create<FormProps>()(
    immer((set) => ({
        formData: {},
        formError: {},
        initFormData: (data) => {
            set((state) => {
                state.formData = data;
            });
        },
        setFormData: (data) =>
            set((state) => {
                state.formData[data.id] = data.value;
            }),
        setFormError: (error) =>
            set((state) => {
                if (!state.formError[error.id]) {
                    state.formError[error.id] = {};
                }
                state.formError[error.id] = { [error.type]: error.message, ...state.formError[error.id] };
            }),
        clearFormError: (target) =>
            set((state) => {
                const targetError = state.formError[target.id];

                if (!targetError) {
                    return;
                }

                if (target.type) {
                    const newError = omitKey(target.type, targetError);
                    state.formError = { ...state.formError, [target.id]: newError };
                } else {
                    state.formError = { ...state.formError, [target.id]: {} };
                }
            }),
        clearForm: () =>
            set((state) => {
                state.formData = {};
                state.formError = {};
            })
    }))
);

export default useFormStore;
