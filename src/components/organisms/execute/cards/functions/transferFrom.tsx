import styled from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, SummeryCard, TitleWrap } from './styles';
import { useEffect, useMemo, useState } from 'react';
import TransferFromWalletList from '@/components/atoms/walletList/transferFromWalletList';
import useExecuteStore from '../../hooks/useExecuteStore';
import { addDecimals, getUTokenStrFromTokenStr } from '@/utils/common';

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

interface IProps {
    decimals: string;
    tokenSymbol: string;
}

export interface ITransferFrom {
    fromAddress: string;
    toAddress: string;
    amount: string;
    id: string;
}

const TransferFrom = ({ decimals, tokenSymbol }: IProps) => {
    const transferList = useExecuteStore((state) => state.transferList);
    const setTransferList = useExecuteStore((state) => state.setTransferList);

    const totalTransferAmount = useMemo(() => {
        const amounts = transferList.map((info) => getUTokenStrFromTokenStr(info.amount, decimals));

        return addDecimals(...amounts);
    }, [transferList]);

    useEffect(() => {
        return () => useExecuteStore.getState().clearForm();
    }, []);

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Transfer From</HeaderTitleTypo>
                    <HeaderDescTypo>Move tokens from one address to another using a pre-approved allowance</HeaderDescTypo>
                </TitleWrap>
                <SummeryCard>
                    <SummeryWrap>
                        <SummeryLabelTypo>Total Transfer Amount :</SummeryLabelTypo>
                        <SummeryAmountTypo>{totalTransferAmount}</SummeryAmountTypo>
                        <SummerySymbolTypo>{tokenSymbol}</SummerySymbolTypo>
                    </SummeryWrap>
                </SummeryCard>
            </HeaderWrap>
            <TransferFromWalletList
                decimals={decimals}
                transferList={transferList}
                setTransferList={(newList: ITransferFrom[]) => setTransferList(newList)}
                onChangeWalletList={() => {}}
                addressTitle={'Owner Address'}
                addressPlaceholder={'Input Wallet Address'}
                amountTitle={'Burn Amount'}
            />
        </Container>
    );
};

export default TransferFrom;
