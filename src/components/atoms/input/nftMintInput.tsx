import React, { useEffect, useMemo } from 'react';
import Icons from '../icons';
import IconButton from '../buttons/iconButton';
import LabelInput from './labelInput';
import useFormStore from '@/store/formStore';
import { IC_MINUS_CIRCLE_DISABLE } from '../icons/pngIcons';
import useCW721ExecuteStore from '@/components/organisms/cw721/execute/hooks/useCW721ExecuteStore';
import { INT_NUMBERS } from '@/constants/regex';
import { CW721_MAX_MINTABLE_ID, isZeroStringValue } from '@/utils/balance';
import WalletRemoveButton from '../buttons/walletRemoveButton';
// import useCW721ExecuteAction from '@/components/organisms/cw721/execute/hooks/useCW721ExecuteAction';

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
}

const NFTMintInput = ({
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
    disabled
}: IProps) => {
    const id = inputId;
    const setFormError = useFormStore((state) => state.setFormError);
    const clearFormError = useFormStore((state) => state.clearFormError);

    // const mintList = useCW721ExecuteStore((state) => state.mintList);
    // const nftDatas = useCW721ExecuteStore((state) => state.nftDatas);

    // const mintTokenIdsExceptSelf = useMemo(() => {
    //     //? get all list except self
    //     const idsMap = new Map();
    //     const allTokenInputs = mintList.filter((oneValue) => oneValue.id !== id).map((v) => v.token_id);
    //     allTokenInputs.map((id) => id !== '' && idsMap.set(BigInt(id).toString(), parseInt(id)));

    //     return Array.from(idsMap.keys());
    // }, [id, mintList]);

    const handleNFTId = (value: string) => {
        if (!isZeroStringValue(value)) clearFormError({ id: `${id}_NFT_ID`, type: 'MINT_NFT_ID' });
        else
            setFormError({
                id: `${id}_NFT_ID`,
                type: 'MINT_NFT_ID',
                message: 'Please enter a value other than 0.'
            });
        onChangeLeft(value);
    };

    const handleNFTUri = (value: string) => {
        onChangeRight(value);
    };

    const handleRemoveWallet = () => {
        onRemoveClick();
    };

    // const checkMintable = () => {
    //     if (leftValue) {
    //         if (isValid) {
    //             clearFormError({ id: `${id}_${leftTitle}`, type: 'ALREADY_MINTED' });
    //         } else {
    //             setFormError({ id: `${id}_${leftTitle}`, type: 'ALREADY_MINTED', message: 'Already minted' });
    //             return;
    //         }

    //         if (mintTokenIdsExceptSelf.includes(parseInt(leftValue))) {
    //             setFormError({ id: `${id}_${leftTitle}`, type: 'DUPLICATED_ID', message: 'Duplicated' });
    //             return;
    //         } else {
    //             clearFormError({ id: `${id}_${leftTitle}`, type: 'DUPLICATED_ID' });
    //         }
    //     } else {
    //         clearFormError({ id: `${id}_${leftTitle}` });
    //     }
    // };

    // useEffect(() => {
    //     checkMintable();
    // }, [mintTokenIdsExceptSelf, leftValue]);

    return (
        <div style={{ display: 'flex', width: '100%', minHeight: '76px' }}>
            <div style={{ display: 'flex', width: '100%', flexDirection: 'row', gap: '12px' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        maxWidth: '133px',
                        width: '100%',
                        gap: '8px'
                    }}
                >
                    <LabelInput
                        labelProps={{ label: leftTitle }}
                        inputProps={{
                            formId: `${id}_NFT_ID`,
                            value: leftValue,
                            onChange: handleNFTId,
                            placeHolder: leftPlaceholder,
                            type: 'number',
                            decimal: 0,
                            readOnly: disabled,
                            emptyErrorMessage: 'Please input the token id.',
                            regex: INT_NUMBERS,
                            maxValue: CW721_MAX_MINTABLE_ID
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
                            formId: `${id}_NFT_URI`,
                            value: rightValue,
                            onChange: handleNFTUri,
                            placeHolder: rightPlaceholder,
                            disabled: disabled,
                            maxLength: 300,
                            emptyErrorMessage: 'Please input the NFT URI.'
                        }}
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '32px',
                        height: '100%',
                        justifyContent: 'flex-start',
                        gap: '8px'
                    }}
                >
                    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
                        <WalletRemoveButton size="32px" onClick={handleRemoveWallet} disabled={index === 1 && isLast} />
                        {/* <IconButton
                            style={{
                                width: '32px',
                                height: '32px',
                                padding: '0',
                                background: 'transparent',
                                border: 'unset',
                                filter: 'unset !important'
                            }}
                            disabled={index === 1 && isLast}
                            onClick={handleRemoveWallet}
                        >
                            {index === 1 && isLast ? (
                                <img style={{ width: '32px', height: '32px' }} src={IC_MINUS_CIRCLE_DISABLE} />
                            ) : (
                                <Icons.MinusCircle />
                            )}
                        </IconButton> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(NFTMintInput);
