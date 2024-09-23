import styled from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, SummeryCard, TitleWrap } from './styles';
import { useEffect, useMemo } from 'react';
import TransferFromWalletList from '@/components/atoms/walletList/transferFromWalletList';
import useExecuteStore from '../../hooks/useExecuteStore';
import { getUTokenStrFromTokenStr } from '@/utils/common';
import useFormStore from '@/store/formStore';
import { addStringAmountsArray } from '@/utils/balance';
import commaNumber from 'comma-number';

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

    white-space: pre;
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

export interface ITransferFrom {
    fromAddress: string;
    fromAmount: string;
    toAddress: string;
    toAmount: string;
    allowanceAmount: string;
    id: string;
}

const TransferFrom = () => {
    const contractAddress = useExecuteStore((state) => state.contractAddress);
    const transferFromList = useExecuteStore((state) => state.transferFromList);
    const setTransferFromList = useExecuteStore((state) => state.setTransferFromList);
    const tokenInfo = useExecuteStore((state) => state.tokenInfo);

    const totalTransferAmount = useMemo(() => {
        const amounts = transferFromList.map((info) => info.toAmount);

        return addStringAmountsArray([...amounts]);
    }, [transferFromList]);

    useEffect(() => {
        return () => {
            useFormStore.getState().clearForm();
            useExecuteStore.getState().clearTransferFrom();
        };
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
                        <SummeryAmountTypo className="clamp-single-line">{commaNumber(totalTransferAmount)}</SummeryAmountTypo>
                        <SummerySymbolTypo>{tokenInfo.symbol}</SummerySymbolTypo>
                    </SummeryWrap>
                </SummeryCard>
            </HeaderWrap>
            <TransferFromWalletList
                contractAddress={contractAddress}
                decimals={tokenInfo.decimals.toString()}
                transferList={transferFromList}
                setTransferList={(newList) => setTransferFromList(newList)}
                addressTitle={'Owner Address'}
                addressPlaceholder={'Input Wallet Address'}
                amountTitle={'Amount'}
            />
        </Container>
    );
};

export default TransferFrom;
