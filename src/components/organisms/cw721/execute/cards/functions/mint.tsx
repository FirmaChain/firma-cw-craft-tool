import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, TitleWrap, SummeryCard, HeaderWrap } from './styles';
import { IC_DOTTED_DIVIDER } from '@/components/atoms/icons/pngIcons';
import {
    addStringAmount,
    compareStringNumbers,
    formatWithCommas,
    getTokenAmountFromUToken,
    getUTokenAmountFromToken,
    subtractStringAmount
} from '@/utils/balance';
import { IWallet } from '@/interfaces/wallet';
import IconTooltip from '@/components/atoms/tooltip';
import useExecuteStore from '../../hooks/useCW721ExecuteStore';
import Divider from '@/components/atoms/divider';
import LabelInput from '@/components/atoms/input/labelInput';
import VariableInput from '@/components/atoms/input/variableInput';
import MintNFTInfoList from '@/components/atoms/walletList/mintNFTInfoList';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import { v4 } from 'uuid';
import { setArgs } from '@craco/craco/dist/lib/args';

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

const TotalMintSubLabelTypo = styled.div`
    color: var(--Gray-550, #444);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const TotalMintSubBalance = styled.div`
    color: var(--Gray-600, #707070);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const DOTTED_DIVIDER = styled.img`
    width: 100%;
    height: auto;
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

const MINTING_PRESET_TOOLTIP = `You can input a range of Token ID numbers using\n"Start" and "End" , or specify multiple random numbers\nin the 'Token ID' field below in ‘Required Informations’.`;

const Mint = () => {
    const [baseurl, setBaseuri] = useState('');

    const [idRange, setIdRange] = useState({ start: '', end: '' });

    const [recipientAddress, setRecipientAddress] = useState('');

    const [mintInfo, setMintInfo] = useState<{ token_id: string; token_uri: string; id: string }[]>([
        { token_id: '', token_uri: '', id: v4() }
    ]);

    const disableMinIntoList = baseurl.length > 0;

    useEffect(() => {
        const { start, end } = idRange;

        if (baseurl) {
            if (start && end && !isNaN(Number(start)) && !isNaN(Number(end))) {
                const parsedStart = parseInt(start);

                setMintInfo(
                    new Array(Number(end) - Number(start) + 1)
                        .fill(null)
                        .map((_, idx) => ({ token_id: (idx + parsedStart).toString(), token_uri: baseurl + (idx + parsedStart), id: v4() }))
                );
            } else {
                setMintInfo([{ token_id: '', token_uri: '', id: v4() }]);
            }
        }
    }, [baseurl, idRange]);

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
                        <TotalMintSupplyBalance>0</TotalMintSupplyBalance>
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
                                value: baseurl,
                                formId: 'BASE_URI_INPUT',
                                placeHolder: 'Input base uri ends with ‘/’',
                                onChange: (v) => {
                                    setBaseuri(v);
                                    if (v.length === 0) {
                                        setMintInfo([{ token_id: '', token_uri: '', id: v4() }]);
                                    }
                                }
                            }}
                        />
                        <div className="token-id-input-box">
                            <div className="title">Token ID</div>
                            <div className="input-row">
                                <div className="input-with-prefix">
                                    <span className="prefix">Start</span>
                                    <VariableInput
                                        value={idRange.start}
                                        placeHolder={'0'}
                                        textAlign="right"
                                        onChange={(v) => setIdRange((orig) => ({ ...orig, start: v }))}
                                        type="number"
                                        decimal={0}
                                        maxValue={20}
                                    />
                                </div>
                                <div className="input-with-prefix">
                                    <span className="prefix">End</span>
                                    <VariableInput
                                        value={idRange.end}
                                        placeHolder={'0'}
                                        textAlign="right"
                                        onChange={(v) => setIdRange((orig) => ({ ...orig, end: v }))}
                                        type="number"
                                        decimal={0}
                                        maxValue={20}
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
                                value: recipientAddress,
                                formId: 'RECIPIENT_ADDRESS',
                                placeHolder: 'Input wallet address',
                                onChange: (v) => setRecipientAddress(v)
                            }}
                        />
                    </div>
                    <MintNFTInfoList
                        onChangeWalletList={(v) => setMintInfo(v)}
                        list={mintInfo}
                        disableInput={disableMinIntoList}
                        onClickDeleteAll={() => {
                            setBaseuri('');
                            setIdRange({ start: '', end: '' });
                        }}
                    />
                </Section>
            </BodyContainer>
        </Container>
    );
};

export default Mint;
