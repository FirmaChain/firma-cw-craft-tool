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
                state.formError[error.id][error.type] = error.message;
            }),
        clearFormError: (target) =>
            set((state) => {
                const targetError = state.formError[target.id];

                if (!targetError) {
                    console.warn(`[FORM]: There is no error with id ${target.id}`);
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

//? Orig code
// import { omitKey } from '@/utils/common';
// import { create } from 'zustand';
// import { immer } from 'zustand/middleware/immer';

// type DataTypes = string; //? add other types in the future

// type DataStore = Record<string, DataTypes>;
// type ErrorStore = Record<string, Record<string, string>>;

// interface FormProps {
//     formData: DataStore;
//     /*
//     {
//         id: string, //? form input id
//         value: string | number | Date //? idk what kind of data would be stored
//     }
//     */
//     formError: ErrorStore;
//     /*
//     {
//         id: string, //? form input id
//         data: {
//             key: string, //? variant of error. like VALIDATION, EMPTY, etc
//             message: string //? message for error type
//         }
//     }
//     */
//     initFormData: (data: Record<string, DataTypes>) => void;
//     /*
//     ! set up form store for page
//     ! intended to use once "on page load"
//     */
//     setFormData: (data: { id: string; value: DataTypes }) => void;
//     /*
//     {
//         id: string, //? new id for new input or sth
//         defaultValue: string | number | Date //? idk too
//     }
//     ! update form data with id + value
//     */
//     setFormError: (error: { id: string; type: string; message: string }) => void;
//     /*
//     {
//         id: string, //? form id
//         message: string //? error message for that error type
//     }
//     ! if error.id is already added, message will be overwritten to new one.
//     */
//     clearFormError: (target?: { id: string; type?: string }) => void;
//     /*
//     ! remove error message of requested target, type
//     ! if there is no type, clear all error message.
//     */

//     clearForm: () => void;
//     /*
//     ! clear form store / error store to use other page
//     ! intended to use at end of page life-cycle
//     */
// }

// const useFormStore = create<FormProps>()(
//     immer((set) => ({
//         formData: {},
//         formError: {},
//         initFormData: (data) => {
//             set((state) => {
//                 state.formData = data;
//             });
//         },
//         setFormData: (data) =>
//             set((state) => {
//                 const oldData = state.formData;
//                 const newData = { ...oldData, [data.id]: data.value };

//                 state.formData = newData;
//             }),
//         setFormError: (error) =>
//             set((state) => {
//                 const oldError = state.formError[error.id];
//                 const newError = { ...oldError, [error.type]: error.message };

//                 state.formError = { ...state.formError, [error.id]: newError };
//             }),
//         clearFormError: (target) =>
//             set((state) => {
//                 const targetError = state.formError[target.id];

//                 if (!targetError) console.error(`[FORM]: There is no error with id ${target.id}`);
//                 else {
//                     try {
//                         if (target.type) {
//                             //? remove error message of requested type
//                             const newError = omitKey(target.type, targetError);
//                             state.formError = { ...state.formError, [target.id]: newError };
//                         } else {
//                             //? if not given type, clear all errors
//                             state.formError = { ...state.formError, [target.id]: {} };
//                         }
//                     } catch (error) {
//                         if (target.type) console.error(`[FORM]: form id ${target.id} not found`);
//                     }
//                 }
//             }),
//         clearForm: () =>
//             set((state) => {
//                 state.formData = {};
//                 state.formError = {};
//             })
//     }))
// );

// export default useFormStore;
