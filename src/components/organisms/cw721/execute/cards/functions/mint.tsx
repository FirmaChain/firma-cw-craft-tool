import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Container, HeaderDescTypo, HeaderTitleTypo, TitleWrap, SummeryCard, HeaderWrap } from './styles';
import IconTooltip from '@/components/atoms/tooltip';
import Divider from '@/components/atoms/divider';
import LabelInput from '@/components/atoms/input/labelInput';
import VariableInput from '@/components/atoms/input/variableInput';
import MintNFTInfoList from '@/components/atoms/walletList/mintNFTInfoList';
import { v4 } from 'uuid';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import useFormStore from '@/store/formStore';
import { isValidAddress } from '@/utils/common';
import useCW721ExecuteAction from '../../hooks/useCW721ExecuteAction';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';

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

const MINTING_PRESET_TOOLTIP = `You can input a range of numbers using\n"Start" and "End", or specify multiple\nrandom numbers in the 'Token ID' field.`;

const BASE_URI_FORM_ID = 'PRESET_BASE_URI_INPUT'; //! DO NOT CHANGE | USING ON PREVIEW FOR BUTTON STATE

const Mint = () => {
    const address = useSelector((v: rootState) => v.wallet.address);
    const contractAddress = useCW721ExecuteStore((state) => state.contractAddress);
    const mintRecipientAddress = useCW721ExecuteStore((state) => state.mintRecipientAddress);
    const mintBaseURI = useCW721ExecuteStore((state) => state.mintBaseURI);
    const mintStartTokenId = useCW721ExecuteStore((state) => state.mintStartTokenId);
    const mintEndTokenId = useCW721ExecuteStore((state) => state.mintEndTokenId);
    const mintList = useCW721ExecuteStore((state) => state.mintList);
    const setMintRecipientAddress = useCW721ExecuteStore((state) => state.setMintRecipientAddress);
    const setMintBaseURI = useCW721ExecuteStore((state) => state.setMintBaseURI);
    const setMintStartTokenId = useCW721ExecuteStore((state) => state.setMintStartTokenId);
    const setMintEndTokenId = useCW721ExecuteStore((state) => state.setMintEndTokenId);
    const setMintList = useCW721ExecuteStore((state) => state.setMintList);
    const clearMintForm = useCW721ExecuteStore((state) => state.clearMintForm);

    const setFormError = useFormStore((v) => v.setFormError);
    const clearFormError = useFormStore((v) => v.clearFormError);

    const { setFctBalance, setMyNftList } = useCW721ExecuteAction();

    const disableMintIntoList = mintBaseURI.length > 0;
    const totalMintCount = useMemo(() => {
        if (mintList.length === 1 && mintList[0].token_id === '' && mintList[0].token_uri === '') {
            return '0';
        }

        return mintList.length;
    }, [mintList]);

    useEffect(() => {
        if (mintBaseURI) {
            if (mintStartTokenId && mintEndTokenId && !isNaN(Number(mintStartTokenId)) && !isNaN(Number(mintEndTokenId))) {
                const parsedStart = parseInt(mintStartTokenId);
                let parsedEnd = parseInt(mintEndTokenId);
                if (parsedEnd > parsedStart + 19) parsedEnd = parsedStart + 19;

                if (parsedEnd >= parsedStart) {
                    setMintList(
                        new Array(Number(parsedEnd) - Number(mintStartTokenId) + 1).fill(null).map((_, idx) => ({
                            token_id: (idx + parsedStart).toString(),
                            token_uri: mintBaseURI + (idx + parsedStart),
                            id: v4()
                        }))
                    );
                }
            } else {
                setMintList([{ token_id: '', token_uri: '', id: v4() }]);
            }
        }
    }, [mintBaseURI, mintStartTokenId, mintEndTokenId]);

    useEffect(() => {
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
                        <TotalMintSupplyBalance>NFT</TotalMintSupplyBalance>
                    </TotalMintWrap>
                </SummeryCard>
            </HeaderWrap>
            <BodyContainer>
                <Section>
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
                                        setMintList([{ token_id: '', token_uri: '', id: v4() }]);
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
                                        maxValue={Number(mintStartTokenId) + 19}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
                <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-500, #383838)" />
                <Section>
                    <div className="title-box">
                        <div className="title-text">Required Informations</div>
                    </div>
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
                                emptyErrorMessage: 'Please input wallet address.'
                            }}
                        />
                    </div>
                    <MintNFTInfoList
                        onChangeWalletList={(v) => {
                            if (mintBaseURI) {
                                //? if using preset
                                setMintBaseURI('');
                                setMintStartTokenId('');
                                setMintEndTokenId('');
                                clearFormError({ id: BASE_URI_FORM_ID });
                            }

                            setMintList(v);
                        }}
                        list={mintList}
                        disableInput={disableMintIntoList}
                        onClickDeleteAll={() => {
                            setMintBaseURI('');
                            setMintStartTokenId('');
                            setMintEndTokenId('');
                            clearFormError({ id: BASE_URI_FORM_ID });
                        }}
                    />
                </Section>
            </BodyContainer>
        </Container>
    );
};

export default Mint;
