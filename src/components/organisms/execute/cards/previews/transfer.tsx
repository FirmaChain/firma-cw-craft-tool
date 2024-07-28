import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_COIN_STACK, IC_COIN_STACK2, IC_DOTTED_DIVIDER, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import {
    addStringAmount,
    formatWithCommas,
    getTokenAmountFromUToken,
    getUTokenAmountFromToken,
    subtractStringAmount
} from '@/utils/balance';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { shortenAddress } from '@/utils/common';
import { isValidAddress } from '@/utils/address';
import { useModalStore } from '@/hooks/useModal';
import { QRCodeModal } from '@/components/organisms/modal';
import useExecuteStore from '../../hooks/useExecuteStore';
import Divider from '@/components/atoms/divider';
import IconTooltip from '@/components/atoms/tooltip';
import GreenButton from '@/components/atoms/buttons/greenButton';
import useExecuteActions from '../../action';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';

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
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-650, #707070)')};
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

const CoinStack2Icon = styled.img`
    width: 24px;
    height: 24px;
`;

const UpdatedBalanceLabelTypo = styled.div`
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const UpdatedBalanceTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 137.5% */
`;

const UpdatedSymbolTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const ButtonWrap = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TransferPreview = () => {
    const address = useSelector((state: rootState) => state.wallet.address);

    const contractAddress = useExecuteStore((state) => state.contractAddress);
    const fctBalance = useExecuteStore((state) => state.fctBalance);
    const cw20Balance = useExecuteStore((state) => state.cw20Balance);
    const transferList = useExecuteStore((state) => state.transferList);
    const tokenInfo = useExecuteStore((state) => state.tokenInfo);
    const setIsFetched = useExecuteStore((state) => state.setIsFetched);
    const clearTransfer = useExecuteStore((state) => state.clearTransfer);

    const { setCw20Balance } = useExecuteActions();

    const modal = useModalStore();

    const [totalTransferAmount, setTotalTransferAmount] = useState<string>('0');
    const [updatedAmount, setUpdatedAmount] = useState<string>('0');
    const [isEnableButton, setIsEnableButton] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const calculateTotalBalance = useCallback(() => {
        let calcTransferAmount = '0';
        let allAddressesValid = true;
        let allAmountsValid = true;

        for (const wallet of transferList) {
            if (!isValidAddress(wallet.recipient)) {
                allAddressesValid = false;
            }
            if (!wallet.amount || wallet.amount === '') {
                allAmountsValid = false;
            }
            calcTransferAmount = addStringAmount(calcTransferAmount, wallet.amount);
        }

        console.log("allAddressesValid", allAddressesValid);
        console.log("allAmountsValid", allAmountsValid);
        const remainAmount = subtractStringAmount(cw20Balance, getUTokenAmountFromToken(calcTransferAmount, tokenInfo.decimals.toString()));
        setUpdatedAmount(remainAmount);

        setIsEnableButton(allAddressesValid && allAmountsValid);
        setTotalTransferAmount(getUTokenAmountFromToken(calcTransferAmount, tokenInfo.decimals.toString()));
    }, [transferList, cw20Balance, tokenInfo]);

    useEffect(() => {
        calculateTotalBalance();
    }, [transferList, calculateTotalBalance]);

    const onClickTransfer = () => {
        const convertWalletList = [];
        let totalAmount = '0';
        let feeAmount = transferList.length * 15000;

        for (const wallet of transferList) {
            const amount = getUTokenAmountFromToken(wallet.amount, tokenInfo.decimals.toString());
            convertWalletList.push({
                recipient: wallet.recipient,
                amount: amount
            });
            totalAmount = addStringAmount(totalAmount, amount);
        }

        const params = {
            header: {
                title: 'Transfer'
            },
            content: {
                symbol: tokenInfo.symbol,
                decimals: tokenInfo.decimals.toString(),
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Total Transfer Amount',
                        value: totalTransferAmount,
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
                    module="/cw20/transfer"
                    id={id}
                    params={params}
                    onClickConfirm={() => {
                        clearTransfer();
                        setIsFetched(true);
                        setCw20Balance(contractAddress, address);
                    }}
                />
            )
        });
    };

    return (
        <Container>
            <ContentWrap>
                <ItemWrap>
                    <ItemLabelWrap>
                        <ItemLabelIcon src={IC_COIN_STACK} alt={'Transfer Title Icon'} />
                        <ItemLabelTypo>Total Transfer Amount</ItemLabelTypo>
                    </ItemLabelWrap>
                    <ItemAmountWrap>
                        <ItemAmountTypo>
                            {formatWithCommas(getTokenAmountFromUToken(totalTransferAmount, tokenInfo.decimals.toString()))}
                        </ItemAmountTypo>
                        <ItemAmountSymbolTypo>{tokenInfo.symbol}</ItemAmountSymbolTypo>
                        <ArrowToggleButton onToggle={setIsOpen} />
                    </ItemAmountWrap>
                </ItemWrap>
                {isOpen && (
                    <WalletListWrap>
                        {transferList.map((value, index) => (
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
                <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-500, #383838)" />
                <ItemWrap>
                    <ItemLabelWrap>
                        <CoinStack2Icon src={IC_COIN_STACK2} alt={'Update Balance Icon'} />
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                            <UpdatedBalanceLabelTypo>Updated Balance</UpdatedBalanceLabelTypo>
                            <IconTooltip size="14px" />
                        </div>
                    </ItemLabelWrap>
                    <ItemLabelWrap>
                        <UpdatedBalanceTypo>
                            {formatWithCommas(getTokenAmountFromUToken(updatedAmount, tokenInfo.decimals.toString()))}
                        </UpdatedBalanceTypo>
                        <UpdatedSymbolTypo>{tokenInfo.symbol}</UpdatedSymbolTypo>
                    </ItemLabelWrap>
                </ItemWrap>
            </ContentWrap>
            <ButtonWrap>
                <GreenButton disabled={!isEnableButton} onClick={onClickTransfer}>
                    <div className="button-text">Transfer</div>
                </GreenButton>
                {/* <ExecuteButton $isEnable={isEnableButton} onClick={onClickTransfer}>
                    <ExecuteButtonTypo>Transfer</ExecuteButtonTypo>
                </ExecuteButton> */}
            </ButtonWrap>
        </Container>
    );
};

export default TransferPreview;
