import { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { Container, HeaderDescTypo, HeaderTitleTypo, TitleWrap, SummeryCard, HeaderWrap } from './styles';
import IconTooltip from '@/components/atoms/tooltip';
import Divider from '@/components/atoms/divider';
import LabelInput from '@/components/atoms/input/labelInput';
import VariableInput from '@/components/atoms/input/variableInput';
import MintNFTInfoList from '@/components/atoms/walletList/mintNFTInfoList';
import { v4 } from 'uuid';
// import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import useFormStore from '@/store/formStore';
import useCW721ExecuteAction from '../../hooks/useCW721ExecuteAction';

import { WALLET_ADDRESS_REGEX } from '@/constants/regex';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';
import { isValidAddress } from '@/utils/address';
import { useCW721Execute } from '@/context/cw721ExecuteContext';
import useWalletStore from '@/store/walletStore';

const TotalMintWrap = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
`;

const TotalMintLabelTypo = styled.div`
    color: var(--Gray-650, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const TotalMintSupplyBalance = styled.div`
    color: var(--Gray-800, #e6e6e6);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
`;

const BodyContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 36px;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    align-self: stretch;

    .title-box {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .title-text {
        color: var(--Gray-900, var(--Primary-Base-White, #fff));

        /* Body/Body1 - Bd */
        font-family: 'General Sans Variable';
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 22px; /* 137.5% */
    }

    .input-box {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
        align-self: stretch;
    }

    .token-id-input-box {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        align-self: stretch;

        .title {
            color: var(--Gray-800, #dcdcdc);

            /* Body/Body2 - Rg */
            font-family: 'General Sans Variable';
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px; /* 142.857% */
        }

        .input-row {
            display: flex;
            align-items: flex-start;
            gap: 32px;
            align-self: stretch;
        }

        .input-with-prefix {
            display: flex;
            width: 100%;
            align-items: center;
            gap: 10px;

            .prefix {
                color: var(--Gray-750, #999);

                /* Body/Body2 - Rg */
                font-family: 'General Sans Variable';
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 20px; /* 142.857% */
            }
        }
    }
`;

const BASE_URI_FORM_ID = 'PRESET_BASE_URI_INPUT'; //! DO NOT CHANGE | USING ON PREVIEW FOR BUTTON STATE

const Mint = () => {
    const address = useWalletStore((v) => v.address);
    // const address = useSelector((v: rootState) => v.wallet.address);

    const context = useCW721Execute();
    const contractAddress = context.contractAddress;
    const mintRecipientAddress = context.mintRecipientAddress;
    const mintBaseURI = context.mintBaseURI;
    const mintStartTokenId = context.mintStartTokenId;
    const mintEndTokenId = context.mintEndTokenId;
    const mintList = context.mintList;
    const setMintRecipientAddress = context.setMintRecipientAddress;
    const setMintList = context.setMintList;
    const clearMintForm = context.clearMintForm;

    const setFormError = useFormStore((v) => v.setFormError);
    const clearFormError = useFormStore((v) => v.clearFormError);

    const { setFctBalance, setMyNftList } = useCW721ExecuteAction();

    const { firmaSDK } = useFirmaSDKContext();

    const userNFTIds = context.myNftList;
    const alreadyMintList = context.alreadyMintList;
    const notYetMintList = context.notYetMintList;
    const setAlreadyMintList = context.setAlreadyMintList;
    const setNotYetMintList = context.setNotYetMintList;

    const disableMintIntoList = Boolean(mintStartTokenId && mintEndTokenId);
    const totalMintCount = useMemo(() => {
        if (mintList.length === 1 && mintList[0].token_id === '' && mintList[0].token_uri === '') {
            return '0';
        }

        return mintList.length;
    }, [mintList]);

    const mintIds = useMemo(() => {
        return mintList.filter((v) => v.token_id !== '').map((v) => BigInt(v.token_id).toString());
    }, [mintList]);

    const isCheckingMintable = useRef<null | NodeJS.Timeout>(null);
    useEffect(() => {
        if (isCheckingMintable.current) {
            // if waiting update, cancel update and re-start timer
            clearTimeout(isCheckingMintable.current);
            isCheckingMintable.current = null;

            isCheckingMintable.current = setTimeout(() => {
                checkMintable();
                isCheckingMintable.current = null;
            }, 500);
        } else {
            // if not waiting, set timer to start function
            isCheckingMintable.current = setTimeout(() => {
                checkMintable();
                isCheckingMintable.current = null;
            }, 500);
        }
    }, [mintIds]);

    const checkMintable = async () => {
        // get ids that requires async check (not included already, notYet)
        // mintIds filtered empty string once, so trust value is string-number.
        const targetIds = mintIds.filter((v) => !alreadyMintList.includes(v) && !notYetMintList.includes(v) && !userNFTIds.includes(v));

        const minted: string[] = [];
        const notYet: string[] = [];

        for (const id of targetIds) {
            try {
                await firmaSDK.Cw721.getNftData(contractAddress?.toLowerCase(), id);
                minted.push(id);
            } catch (error) {
                notYet.push(id);
            }
        }

        setAlreadyMintList([...alreadyMintList, ...minted]);
        setNotYetMintList([...notYetMintList, ...notYet]);
    };

    const checkMintList = () => {
        mintList.forEach((v) => {
            const id = v.token_id;

            if (id !== '' && (alreadyMintList.includes(BigInt(id).toString()) || userNFTIds.includes(BigInt(id).toString()))) {
                //! not empty + included already mined list = set error
                setFormError({ id: `${v.id}_NFT_ID`, type: 'ALREADY_MINTED', message: 'This token ID is minted.' });
            } else {
                //? clear minted error
                clearFormError({ id: `${v.id}_NFT_ID`, type: 'ALREADY_MINTED' });
            }

            const exceptSelf = mintList.filter((one) => one.id !== v.id);
            const othersIds = exceptSelf.filter((one) => one.token_id !== '').map((one) => BigInt(one.token_id).toString());
            if (id !== '' && othersIds.includes(BigInt(id).toString())) {
                //! not empty + already included on other id = duplicated error
                setFormError({ id: `${v.id}_NFT_ID`, type: 'DUPLICATED', message: 'This token ID is duplicated.' });
            } else {
                //? clear duplicated error
                clearFormError({ id: `${v.id}_NFT_ID`, type: 'DUPLICATED' });
            }
        });
    };

    useEffect(() => {
        checkMintList();
    }, [mintList, alreadyMintList, notYetMintList, userNFTIds]);

    useEffect(() => {
        if (contractAddress === null) return;

        setFctBalance(address);
        setMyNftList(contractAddress, address);

        //? clear error and input before unmount
        return () => {
            clearMintForm();
            useFormStore.getState().clearForm();
        };
    }, []);

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Mint</HeaderTitleTypo>
                    <HeaderDescTypo>Create a new NFT and assign it to an address</HeaderDescTypo>
                </TitleWrap>
                <SummeryCard>
                    <TotalMintWrap>
                        <TotalMintLabelTypo>Total Mint Count :</TotalMintLabelTypo>
                        <TotalMintSupplyBalance>{totalMintCount}</TotalMintSupplyBalance>
                        <TotalMintSupplyBalance style={{ fontWeight: '400' }}>NFT</TotalMintSupplyBalance>
                    </TotalMintWrap>
                </SummeryCard>
            </HeaderWrap>
            <BodyContainer>
                {/* <Section>
                    <div className="title-box">
                        <div className="title-text">Minting Preset (Optional)</div>
                        <IconTooltip size="12px" tooltip={MINTING_PRESET_TOOLTIP} />
                    </div>
                    <div className="input-box">
                        <LabelInput
                            labelProps={{ label: 'Base URI' }}
                            inputProps={{
                                value: mintBaseURI,
                                formId: BASE_URI_FORM_ID,
                                placeHolder: 'Input base uri ends with ‘/’',
                                onChange: (v) => {
                                    setMintBaseURI(v);
                                    if (v.length === 0) {
                                        setMintList([{ token_id: '', token_uri: '', id: v4(), isAlreadyMint: false }]);
                                    }

                                    if (!v || v.endsWith('/')) clearFormError({ id: BASE_URI_FORM_ID, type: 'URI_RULE' });
                                    else setFormError({ id: BASE_URI_FORM_ID, type: 'URI_RULE', message: `Base uri must end with a '/'.` });
                                }
                            }}
                        />
                        <div className="token-id-input-box">
                            <div className="title">Token ID</div>
                            <div className="input-row">
                                <div className="input-with-prefix">
                                    <span className="prefix">Start</span>
                                    <VariableInput
                                        value={mintStartTokenId}
                                        placeHolder={'0'}
                                        textAlign="right"
                                        onChange={(v) => setMintStartTokenId(v)}
                                        type="number"
                                        decimal={0}
                                    />
                                </div>
                                <div className="input-with-prefix">
                                    <span className="prefix">End</span>
                                    <VariableInput
                                        value={mintEndTokenId}
                                        placeHolder={'0'}
                                        textAlign="right"
                                        onChange={(v) => setMintEndTokenId(v)}
                                        type="number"
                                        decimal={0}
                                        maxValue={String(Number(mintStartTokenId) + 19)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
                <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-500, #383838)" /> */}
                <Section>
                    <div className="input-box">
                        <LabelInput
                            labelProps={{ label: 'Recipient Address' }}
                            inputProps={{
                                value: mintRecipientAddress,
                                formId: 'RECIPIENT_ADDRESS',
                                placeHolder: 'Input wallet address',
                                onChange: (v) => {
                                    if (!v || isValidAddress(v)) clearFormError({ id: 'RECIPIENT_ADDRESS', type: 'INVALID_ADDRESS' });
                                    else
                                        setFormError({
                                            id: 'RECIPIENT_ADDRESS',
                                            type: 'INVALID_ADDRESS',
                                            message: 'Please input firmachain wallet address.'
                                        });

                                    setMintRecipientAddress(v);
                                },
                                emptyErrorMessage: 'Please input firmachain wallet address.',
                                regex: WALLET_ADDRESS_REGEX
                            }}
                        />
                    </div>
                    <MintNFTInfoList
                        onChangeWalletList={(v) => {
                            setMintList(v);
                        }}
                        list={mintList}
                        disableInput={disableMintIntoList}
                        onClickDeleteAll={() => {}}
                    />
                </Section>
            </BodyContainer>
        </Container>
    );
};

export default Mint;
