import React, { useEffect, useMemo } from 'react';
import Icons from '../icons';
import IconButton from '../buttons/iconButton';
import LabelInput from './labelInput';
import useFormStore from '@/store/formStore';
// import { IC_MINUS_CIRCLE_DISABLE } from '../icons/pngIcons';
// import { isValidAddress } from '@/utils/common';
// import { useSelector } from 'react-redux';
// import { rootState } from '@/redux/reducers';
import { IExecuteTransfer } from '@/interfaces/cw721';
// import useCW721ExecuteStore from '@/components/organisms/cw721/execute/hooks/useCW721ExecuteStore';
import { NUMBERS_WITH_COMMA, WALLET_ADDRESS_REGEX } from '@/constants/regex';

interface IProps {
    index: number;
    leftValue: string;
    rightValue: string;
    onChangeLeft: (value: string) => void;
    onChangeRight: (value: string) => void;
    onRemoveClick: () => void;
    isLast: boolean;
    isValid: boolean;
    // decimals: string;
    leftTitle: string;
    leftPlaceholder: string;
    rightTitle: string;
    rightPlaceholder: string;
    inputId: string;
    disabled?: boolean;
    allList: IExecuteTransfer[];
}

const TransferNFTInput = ({
    index,
    leftValue,
    rightValue,
    onChangeLeft,
    onChangeRight,
    onRemoveClick,
    isValid,
    isLast,
    leftTitle,
    leftPlaceholder,
    rightTitle,
    rightPlaceholder,
    inputId,
    disabled,
    allList
}: IProps) => {
    // const address = useSelector((state: rootState) => state.wallet.address);
    // const nftList = useCW721ExecuteStore((v) => v.myNftList);
    const id = inputId;
    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    const addressError = useFormStore((state) => state.formError[`${id}_${leftTitle}`]) || {};
    const idError = useFormStore((state) => state.formError[`${id}_${rightTitle}`]) || {};

    const hasAddrErr = Object.keys(addressError).length > 0;
    const hasIdErr = Object.keys(idError).length > 0;

    // const checkAddressValid = (value: string) => {
    //     if (value) {
    //         if (!isValidAddress(value)) {
    //             setFormError({ id: `${id}_${leftTitle}`, type: 'INVALID_ADDRESS', message: 'This is an invalid wallet address.' });
    //             return;
    //         } else {
    //             clearFormError({ id: `${id}_${leftTitle}`, type: 'INVALID_ADDRESS' });
    //         }
    //         if (address.toLowerCase() === value.toLowerCase()) {
    //             setFormError({ id: `${id}_${leftTitle}`, type: 'NO_NOT_SEND_TO_SELF', message: 'Cannot transfer to my wallet address.' });
    //         } else {
    //             clearFormError({ id: `${id}_${leftTitle}`, type: 'NO_NOT_SEND_TO_SELF' });
    //         }
    //     } else {
    //         clearFormError({ id: `${id}_${leftTitle}`, type: 'INVALID_ADDRESS' });
    //         clearFormError({ id: `${id}_${leftTitle}`, type: 'NO_NOT_SEND_TO_SELF' });
    //     }
    // };

    const handleAddress = (value: string) => {
        // checkAddressValid(value);

        onChangeLeft(value);
    };

    const handleTokenId = (value: string) => {
        const cleanedText = value.replace(/,+/g, ',').replace(/^,/, '');

        if (cleanedText.endsWith(','))
            setFormError({ id: `${id}_${rightTitle}`, type: 'ENDS_WITH_COMMA', message: 'Token ID list must end with number.' });
        else clearFormError({ id: `${id}_${rightTitle}`, type: 'ENDS_WITH_COMMA' });

        onChangeRight(cleanedText);
    };

    const handleRemoveWallet = () => {
        onRemoveClick();
    };

    const disableRemoveBtn = allList.length <= 1;

    // const allTokenIdsExceptThis = useMemo(() => {
    //     const ids = allList
    //         .filter((info) => info.id !== id)
    //         .map((v) => v.token_ids)
    //         .flat(1);

    //     const idsMap = new Map();
    //     ids.map((id) => {
    //         if (id !== '') {
    //             const parsedId = BigInt(id).toString();

    //             idsMap.set(parsedId, parsedId);
    //         }
    //     });

    //     return Array.from(idsMap.keys());
    // }, [allList, id]);

    // const thisTokenIdList = useMemo(() => {
    //     const ids = rightValue.split(',').filter((id) => id !== '');

    //     const idsMap = new Map();
    //     ids.map((id) => {
    //         if (id !== '') {
    //             const parsedId = BigInt(id).toString();

    //             idsMap.set(parsedId, parsedId);
    //         }
    //     });

    //     return Array.from(idsMap.keys());
    // }, [rightValue]);

    // const checkInput = () => {
    //     if (thisTokenIdList.length > 0) {
    //         //! If user tried to add id that does not own
    //         // if (!thisTokenIdList.every((inputId) => nftList.includes(inputId))) {
    //         //     setFormError({ id: `${id}_${rightTitle}`, type: 'INVALID_ID', message: `Contains an NFT ID that you don't own.` });
    //         //     return;
    //         // } else {
    //         //     clearFormError({ id: `${id}_${rightTitle}`, type: 'INVALID_ID' });
    //         // }

    //         //! if NFT ids in this form is duplicated
    //         const splited = rightValue.split(',').filter((v) => v !== '');

    //         if (splited.length !== thisTokenIdList.length) {
    //             setFormError({ id: `${id}_${rightTitle}`, type: 'DUPLICATED_ID', message: `Duplicated NFT id encluded.` });
    //             return;
    //         } else {
    //             clearFormError({ id: `${id}_${rightTitle}`, type: 'DUPLICATED_ID' });
    //         }

    //         //! if NFT ids from other form is dupliacted
    //         if (allTokenIdsExceptThis.some((outerId) => thisTokenIdList.includes(outerId))) {
    //             setFormError({ id: `${id}_${rightTitle}`, type: 'DUPLICATED_ID', message: `Duplicated NFT id encluded.` });
    //             return;
    //         } else {
    //             clearFormError({ id: `${id}_${rightTitle}`, type: 'DUPLICATED_ID' });
    //         }
    //     } else {
    //         clearFormError({ id: `${id}_${rightTitle}`, type: 'INVALID_ID' });
    //         clearFormError({ id: `${id}_${rightTitle}`, type: 'DUPLICATED_ID' });
    //     }
    // };

    // useEffect(() => {
    //     checkInput();
    // }, [allTokenIdsExceptThis, thisTokenIdList]);

    return (
        <div style={{ display: 'flex', width: '100%', flexDirection: 'row', gap: '12px' }}>
            <div style={{ display: 'flex', width: '100%', flexDirection: 'column', gap: '12px' }}>
                {/* Wallet Address */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        width: '100%',
                        gap: '8px'
                    }}
                >
                    <LabelInput
                        labelProps={{ index, label: leftTitle }}
                        inputProps={{
                            formId: `${id}_${leftTitle}`,
                            value: leftValue,
                            onChange: handleAddress,
                            placeHolder: leftPlaceholder,
                            regex: WALLET_ADDRESS_REGEX,
                            emptyErrorMessage: 'Please input firmachain wallet address.'
                        }}
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        width: '100%',
                        gap: '8px'
                    }}
                >
                    <LabelInput
                        labelProps={{ label: rightTitle }}
                        inputProps={{
                            formId: `${id}_${rightTitle}`,
                            value: rightValue,
                            onChange: handleTokenId,
                            placeHolder: rightPlaceholder,
                            regex: NUMBERS_WITH_COMMA,
                            emptyErrorMessage: 'Please input the token id.'
                        }}
                    />
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    // height: '100%',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    gap: '4px',
                    paddingTop: '48px'
                }}
            >
                <div
                    style={{
                        width: '16px',
                        height: hasAddrErr && hasIdErr ? '37px' : '28px',
                        borderTopRightRadius: '8px',
                        borderTop: '1px dashed #444444',
                        borderRight: '1px dashed #444444'
                    }}
                />
                <IconButton
                    disabled={disableRemoveBtn}
                    style={{
                        width: '32px',
                        height: '32px',
                        padding: '0',
                        background: 'transparent',
                        border: 'unset'
                    }}
                    onClick={handleRemoveWallet}
                >
                    <Icons.MinusCircle fill={disableRemoveBtn ? '#313131' : undefined} stroke={disableRemoveBtn ? '#1E1E1E' : undefined} />
                </IconButton>
                <div
                    style={{
                        width: '16px',
                        height: hasAddrErr && !hasIdErr ? '46px' : hasAddrErr && hasIdErr ? '37px' : '28px',
                        borderBottomRightRadius: '8px',
                        borderBottom: '1px dashed #444444',
                        borderRight: '1px dashed #444444'
                    }}
                />
            </div>
        </div>
    );
};

export default React.memo(TransferNFTInput);
