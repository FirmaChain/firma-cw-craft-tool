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
import useExecuteStore from '../../hooks/useExecuteStore';
import AddressAmountInput from '@/components/atoms/walletList/addressAmountInput';
import useFormStore from '@/store/formStore';
import Cw721MintInput from '@/components/atoms/walletList/cw721MintInput';

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

const Mint = () => {
    const minterInfo = useExecuteStore((state) => state.minterInfo);
    const tokenInfo = useExecuteStore((state) => state.tokenInfo);

    const mintingList = useExecuteStore((state) => state.mintingList);
    const setMinterList = useExecuteStore((state) => state.setMinterList);

    const mintableAmount = useMemo(() => {
        if (!minterInfo || !tokenInfo) return '';

        return subtractStringAmount(minterInfo?.cap, tokenInfo?.total_supply);
    }, [minterInfo, tokenInfo]);

    const totalMintAmount = useMemo(() => {
        let addAmount = '0';
        for (const wallet of mintingList) {
            addAmount = addStringAmount(getUTokenAmountFromToken(wallet.amount, tokenInfo.decimals.toString()), addAmount);
        }
        return addAmount;
    }, [mintingList]);

    const handleWalletList = (value: IWallet[]) => {
        setMinterList(value);
    };

    useEffect(() => {
        return () => {
            useFormStore.getState().clearForm();
            useExecuteStore.getState().clearMinterList();
        };
    }, []);

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Mint</HeaderTitleTypo>
                    <HeaderDescTypo>Create new tokens and add them to the total supply</HeaderDescTypo>
                </TitleWrap>
                <SummeryCard>
                    <TotalMintWrap>
                        <TotalMintLabelTypo>Total Mint Supply :</TotalMintLabelTypo>
                        <TotalMintSupplyBalance>
                            {formatWithCommas(getTokenAmountFromUToken(totalMintAmount, tokenInfo.decimals.toString()))}
                        </TotalMintSupplyBalance>
                        <TotalMintSupplyBalance>{tokenInfo.symbol}</TotalMintSupplyBalance>
                    </TotalMintWrap>
                    <DOTTED_DIVIDER src={IC_DOTTED_DIVIDER} alt={'Dotted Divider'} />
                    <TotalMintWrap>
                        <TotalMintSubLabelTypo>Additional Mintable Token Amount :</TotalMintSubLabelTypo>
                        <TotalMintSubBalance>
                            {formatWithCommas(getTokenAmountFromUToken(mintableAmount, tokenInfo.decimals.toString()))}
                        </TotalMintSubBalance>
                        <TotalMintSubBalance>{tokenInfo.symbol}</TotalMintSubBalance>
                        <IconTooltip size="14px" tooltip={`Additional Mintable Token Amount\n=  Minter Cap - Total Supply`} />
                    </TotalMintWrap>
                </SummeryCard>
            </HeaderWrap>
            <Cw721MintInput
                list={mintingList}
                decimals={tokenInfo.decimals.toString()}
                onChangeWalletList={handleWalletList}
                addressTitle={'Recipient Address'}
                addressPlaceholder={'Input Wallet Address'}
                amountTitle={'Amount'}
            />
        </Container>
    );
};

export default Mint;
