import styled from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, SummeryCard, TitleWrap } from './styles';

import { IWallet } from '@/interfaces/wallet';
// import useExecuteStore from '../../hooks/useExecuteStore';
import { useEffect, useMemo, useState } from 'react';
import { addStringAmount, getTokenAmountFromUToken, getUTokenAmountFromToken } from '@/utils/balance';

import useFormStore from '@/store/formStore';
import Cw20BurnFromInputList from '@/components/atoms/walletList/cw20BurnFromInputList';
import Icons from '@/components/atoms/icons';
import commaNumber from 'comma-number';
import { isValidAddress } from '@/utils/address';
import TextEllipsis from '@/components/atoms/ellipsis';
import { useCW20Execute } from '@/context/cw20ExecuteContext';

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

const ErrorTypo = styled.div`
    color: var(--Status-Alert, #e55250);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */

    white-space: pre;
`;

const BurnFrom = () => {
    const context = useCW20Execute();
    const tokenInfo = context.tokenInfo;
    const burnFromList = context.burnFromList;
    const allowanceByAddress = context.allowanceByAddress;
    const setBurnFromList = context.setBurnFromList;
    const clearBurnFrom = context.clearBurnFrom;

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

    const showExceedMessage = useMemo(() => {
        let result = false;
        const addressAmountMap: Record<string, bigint> = {};
        burnFromList.map((value) => {
            if (isValidAddress(value.recipient)) {
                const lowerAddress = value.recipient.toLowerCase();
                if (!addressAmountMap[lowerAddress]) {
                    addressAmountMap[lowerAddress] = BigInt(0);
                }
                const uToken = getUTokenAmountFromToken(value.amount, String(tokenInfo?.decimals));
                addressAmountMap[lowerAddress] = addressAmountMap[lowerAddress] + BigInt(uToken);
            }
        });
        const checkAddress = Object.keys(addressAmountMap);
        checkAddress.map((address: string) => {
            const currentAllowance = BigInt(allowanceByAddress[address] || '');
            const inputAmount = addressAmountMap[address];
            //! if total amount is bigger than provided allowance
            if (currentAllowance < inputAmount) {
                result = true;
            }
        });
        return result;
    }, [allowanceByAddress, burnFromList, tokenInfo]);

    useEffect(() => {
        return () => {
            useFormStore.getState().clearForm();
            clearBurnFrom();
        };
    }, []);

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Burn From</HeaderTitleTypo>
                    <HeaderDescTypo>Destroy tokens from another address using a pre-approved allowance</HeaderDescTypo>
                </TitleWrap>
                <SummeryCard>
                    <SummeryWrap>
                        <SummeryLabelTypo>Total Burn Amount : </SummeryLabelTypo>
                        <TextEllipsis
                            CustomDiv={SummeryAmountTypo}
                            text={commaNumber(getTokenAmountFromUToken(totalBurnAmont, String(tokenInfo.decimals)))}
                            breakMode={'letters'}
                        />
                        {/* <SummeryAmountTypo className="clamp-single-line">
                            {commaNumber(getTokenAmountFromUToken(totalBurnAmont, String(tokenInfo.decimals)))}
                        </SummeryAmountTypo> */}
                        <SummerySymbolTypo style={{ fontWeight: '400' }}>{tokenInfo.symbol}</SummerySymbolTypo>
                    </SummeryWrap>
                    {showExceedMessage && (
                        <SummeryWrap>
                            <Icons.Tooltip width="16px" height="16px" fill="var(--Status-Alert, #e55250)" />
                            <ErrorTypo>You have exceeded the allowance.</ErrorTypo>
                        </SummeryWrap>
                    )}
                </SummeryCard>
            </HeaderWrap>
            <Cw20BurnFromInputList
                decimals={tokenInfo.decimals.toString()}
                onChangeWalletList={handleWalletList}
                addressTitle={'Owner Address'}
                addressPlaceholder={'Input Wallet Address'}
                amountTitle={'Burn Amount'}
                list={burnFromList}
            />
        </Container>
    );
};

export default BurnFrom;
