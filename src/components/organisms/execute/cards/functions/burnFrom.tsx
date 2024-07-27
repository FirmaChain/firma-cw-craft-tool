import styled from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, SummeryCard, TitleWrap } from './styles';
import WalletList from '@/components/atoms/walletList';
import { IWallet } from '@/interfaces/wallet';
import useExecuteStore from '../../hooks/useExecuteStore';
import { useMemo } from 'react';
import { addStringAmount, formatWithCommas, getTokenAmountFromUToken, getUTokenAmountFromToken } from '@/utils/balance';

const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const SummeryWrap = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
`;

const SummeryLabelTypo = styled.div`
    color: var(--Gray-700, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const SummeryAmountTypo = styled.div`
    color: var(--Gray-850, #e6e6e6);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
`;

const SummerySymbolTypo = styled.div`
    color: var(--Gray-850, #e6e6e6);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
`;

const BurnFrom = () => {
    const tokenInfo = useExecuteStore((state) => state.tokenInfo);
    const setBurnFromList = useExecuteStore((state) => state.setBurnFromList);
    const burnFromList = useExecuteStore((state) => state.burnFromList);

    const handleWalletList = (value: IWallet[]) => {
        setBurnFromList(value);
    };

    const totalBurnAmont = useMemo(() => {
        let totalAmount = '0';

        for (const wallet of burnFromList) {
            totalAmount = addStringAmount(totalAmount, wallet.amount);
        }

        return getUTokenAmountFromToken(totalAmount, tokenInfo.decimals.toString());
    }, [burnFromList, tokenInfo]);

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Burn From</HeaderTitleTypo>
                    <HeaderDescTypo>Destroy tokens from another address using a pre-approved allowance</HeaderDescTypo>
                </TitleWrap>
                <SummeryCard>
                    <SummeryWrap>
                        <SummeryLabelTypo>Total Burn Amount :</SummeryLabelTypo>
                        <SummeryAmountTypo>
                            {formatWithCommas(getTokenAmountFromUToken(totalBurnAmont, String(tokenInfo.decimals)))}
                        </SummeryAmountTypo>
                        <SummerySymbolTypo>{tokenInfo.symbol}</SummerySymbolTypo>
                    </SummeryWrap>
                </SummeryCard>
            </HeaderWrap>
            <WalletList
                decimals={tokenInfo.decimals.toString()}
                onChangeWalletList={handleWalletList}
                addressTitle={'Owner Address'}
                addressPlaceholder={'Input Wallet Address'}
                amountTitle={'Burn Amount'}
            />
        </Container>
    );
};

export default BurnFrom;
