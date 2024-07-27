import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { IC_COIN_STACK, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { isValidAddress, shortenAddress } from '@/utils/address';
import { addStringAmount, formatWithCommas, getTokenAmountFromUToken, getUTokenAmountFromToken } from '@/utils/balance';
import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { useModalStore } from '@/hooks/useModal';
import { QRCodeModal } from '@/components/organisms/modal';
import useExecuteStore from '../../hooks/useExecuteStore';
import GreenButton from '@/components/atoms/buttons/greenButton';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 36px;
    justify-content: center;
`;

const ContentWrap = styled.div`
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 32px 44px;
    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
`;

const ItemWrap = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ItemLabelWrap = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
`;

const ItemLabelIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const ItemLabelTypo = styled.div`
    color: #02e191;
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */

    opacity: 0.8;
`;

const ItemAmountWrap = styled.div`
    display: flex;
    gap: 8px;
`;

const ItemAmountTypo = styled.div`
    color: var(--Green-500, #02e191);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 137.5% */
`;

const ItemAmountSymbolTypo = styled.div`
    color: var(--Green-500, #02e191);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const WalletListWrap = styled.div`
    height: auto;
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 12px;
    background: var(--Gray-150, #141414);
`;

const WalletItemWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const WalletLeftItemWrap = styled.div`
    width: 100%;
    display: flex;
    gap: 16px;
`;

const WalletItemIcon = styled.img`
    width: 20px;
    height: 20px;
`;

const WalletItemAddressTypo = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? '#383838' : '#707070')};
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const WalletItemTokenAmount = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? '#383838' : '#807E7E')};
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const ButtonWrap = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ExecuteButton = styled.button<{ $isEnable: boolean }>`
    width: 220px !important;
    height: 48px;
    border-radius: 8px;
    background: ${(props) => (props.$isEnable ? '#02E191' : '#707070')};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${(props) => (props.$isEnable ? 'pointer' : 'inherit')};
    pointer-events: ${(props) => (props.$isEnable ? 'auto' : 'none')};
    border: none;
    outline: none;
    transition:
        background 0.1s,
        transform 0.1s;

    &:active {
        transform: scale(0.99);
    }
`;

const ExecuteButtonTypo = styled.div`
    color: var(--Gray-100, #121212);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 125% */
`;

const BurnFromPreview = () => {
    const contractAddress = useExecuteStore((v) => v.contractAddress);
    const fctBalance = useExecuteStore((v) => v.fctBalance);
    const cw20Balance = useExecuteStore((v) => v.cw20Balance);
    const burnFromList = useExecuteStore((v) => v.burnFromList);
    const tokenInfo = useExecuteStore((v) => v.tokenInfo);

    const modal = useModalStore();

    const [totalBurnBalance, setTotalBurnBalance] = useState<string>('0');
    const [isEnableButton, setIsEnableButton] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const calculateTotalBurnBalance = useCallback(() => {
        let totalAmount = '0';
        let allAddressesValid = true;
        let allAmountsValid = true;

        for (const wallet of burnFromList) {
            if (!isValidAddress(wallet.recipient)) {
                allAddressesValid = false;
            }
            if (!wallet.amount || wallet.amount.trim() === '') {
                allAmountsValid = false;
            }
            totalAmount = addStringAmount(totalAmount, wallet.amount);
        }

        setIsEnableButton(allAddressesValid && allAmountsValid);
        setTotalBurnBalance(getUTokenAmountFromToken(totalAmount, tokenInfo.decimals.toString()));
    }, [burnFromList, tokenInfo]);

    const onClickBurn = () => {
        const convertWalletList = [];
        let totalAmount = '0';
        let feeAmount = burnFromList.length * 15000;

        for (const wallet of burnFromList) {
            const amount = getUTokenAmountFromToken(wallet.amount, tokenInfo.decimals.toString());
            convertWalletList.push({
                owner: wallet.recipient,
                amount: amount
            });
            totalAmount = addStringAmount(totalAmount, amount);
        }

        const params = {
            header: {
                title: 'Burn From'
            },
            content: {
                symbol: tokenInfo.symbol,
                decimals: tokenInfo.decimals.toString(),
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Total Burn Amount',
                        value: totalAmount,
                        type: 'amount'
                    },
                    {
                        label: 'Total Wallet Count',
                        value: convertWalletList.length.toString(),
                        type: 'wallet-count'
                    }
                ]
            },
            contract: contractAddress,
            msg: convertWalletList
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <QRCodeModal
                    module="/cw20/burnFrom"
                    id={id}
                    params={params}
                    onClickConfirm={() => {
                        console.log(111);
                    }}
                />
            )
        });
    };

    useEffect(() => {
        calculateTotalBurnBalance();
    }, [burnFromList, calculateTotalBurnBalance]);

    return (
        <Container>
            <ContentWrap>
                <ItemWrap>
                    <ItemLabelWrap>
                        <ItemLabelIcon src={IC_COIN_STACK} alt={'Burn From Title Icon'} />
                        <ItemLabelTypo>Total Burn Amount</ItemLabelTypo>
                    </ItemLabelWrap>
                    <ItemAmountWrap>
                        <ItemAmountTypo>
                            {formatWithCommas(getTokenAmountFromUToken(totalBurnBalance, tokenInfo.decimals.toString()))}
                        </ItemAmountTypo>
                        <ItemAmountSymbolTypo>{tokenInfo.symbol}</ItemAmountSymbolTypo>
                        <ArrowToggleButton onToggle={setIsOpen} />
                    </ItemAmountWrap>
                </ItemWrap>
                {isOpen && (
                    <WalletListWrap>
                        {burnFromList.map((value, index) => (
                            <WalletItemWrap key={index}>
                                <WalletLeftItemWrap>
                                    <WalletItemIcon src={IC_WALLET} alt={'Wallet Item'} />
                                    <WalletItemAddressTypo $disabled={!value.recipient}>
                                        {value.recipient !== '' ? shortenAddress(value.recipient, 12, 12) : 'Wallet Address'}
                                    </WalletItemAddressTypo>
                                </WalletLeftItemWrap>
                                <WalletItemTokenAmount $disabled={!Number(value.amount)}>
                                    {value.amount === '' ? '0' : formatWithCommas(value.amount)}
                                </WalletItemTokenAmount>
                            </WalletItemWrap>
                        ))}
                    </WalletListWrap>
                )}
            </ContentWrap>
            <ButtonWrap>
                <GreenButton disabled={!isEnableButton} onClick={onClickBurn}>
                    <div className="button-text">Burn From</div>
                </GreenButton>
                {/* <ExecuteButton $isEnable={isEnableButton} onClick={onClickBurn}>
                    <ExecuteButtonTypo>Burn From</ExecuteButtonTypo>
                </ExecuteButton> */}
            </ButtonWrap>
        </Container>
    );
};

export default BurnFromPreview;
