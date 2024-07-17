import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_ARROW_WITH_TAIL, IC_COIN_STACK, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { addStringAmount, getUTokenAmountFromToken, subtractStringAmount } from '@/utils/balance';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useContractContext } from '../../context/contractContext';
import { addDecimals, getUTokenStrFromTokenStr, shortenAddress } from '@/utils/common';
import { isValidAddress } from '@/utils/address';
import { ModalActions } from '@/redux/actions';
import commaNumber from 'comma-number';
import IconButton from '@/components/atoms/buttons/iconButton';
import useExecuteStore from '../../hooks/useExecuteStore';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 36px;
    justify-content: center;
`;

const ContentWrap = styled.div`
    width: calc(100% - 88px);
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

const AccordionBox = styled.div`
    width: calc(100% - 64px);
    height: auto;
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 12px;
    background: var(--Gray-150, #141414);
`;

const ButtonWrap = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ExecuteButton = styled(IconButton)<{ disabled?: boolean }>`
    width: 220px !important;
    height: 48px;
    border-radius: 8px;
    background: ${({ disabled }) => (!disabled ? '#02E191' : '#707070')};
    display: flex;
    justify-content: center;
    align-items: center;

    border: none;
    outline: none;
    transition:
        background 0.1s,
        transform 0.1s;
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

const AccordionTypo = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-650, #707070)')};

    /* Body/Body2 - Rg */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const FromToAddressLine = ({ from, to, amount, decimal }: { from?: string; to?: string; amount?: string; decimal?: string }) => {
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
                    <img src={IC_WALLET} alt="wallet" style={{ width: '20px' }} />
                    <AccordionTypo $disabled={!Boolean(from)}>{from ? shortenAddress(from) : 'Wallet Address'}</AccordionTypo>
                </div>

                <img src={IC_ARROW_WITH_TAIL} alt="arrow" style={{ width: '16px' }} />

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
                    <img src={IC_WALLET} alt="wallet" style={{ width: '20px' }} />
                    <AccordionTypo $disabled={!Boolean(to)}>{to ? shortenAddress(to) : 'Wallet Address'}</AccordionTypo>
                </div>
            </div>

            <AccordionTypo $disabled={!Boolean(amount && decimal)}>
                {amount && decimal ? getUTokenStrFromTokenStr(amount, decimal) : 0}
            </AccordionTypo>
        </div>
    );
};

interface IProps {
    addressAmount: string;
    tokenSymbol: string;
    decimals: string;
}

const TransferFromPreview = ({ addressAmount, tokenSymbol, decimals }: IProps) => {
    const { _contract, _walletList, _setIsFetched, _setWalletList } = useContractContext();

    const transferList = useExecuteStore((state) => state.transferList);

    const [isEnableButton, setIsEnableButton] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const totalTransferAmount = useMemo(() => {
        const amounts = transferList.map((info) => getUTokenStrFromTokenStr(info.amount, decimals));

        return addDecimals(...amounts);
    }, [transferList]);

    const calculateTotalBurnBalance = useCallback(() => {
        let calcTransferAmount = '0';
        let allAddressesValid = true;
        let allAmountsValid = true;

        for (const wallet of _walletList) {
            if (!isValidAddress(wallet.recipient)) {
                allAddressesValid = false;
            }
            if (!wallet.amount || wallet.amount.trim() === '') {
                allAmountsValid = false;
            }
            calcTransferAmount = addStringAmount(calcTransferAmount, wallet.amount);
        }

        const remainAmount = subtractStringAmount(addressAmount, getUTokenAmountFromToken(calcTransferAmount, decimals));
        // setUpdatedAmount(remainAmount);

        setIsEnableButton(allAddressesValid && allAmountsValid);
        // setTotalTransferAmount(getUTokenAmountFromToken(calcTransferAmount, decimals));
    }, [_walletList, addressAmount, decimals]);

    useEffect(() => {
        calculateTotalBurnBalance();
    }, [_walletList, calculateTotalBurnBalance]);

    const onClickTransfer = () => {
        const convertWalletList = [];

        for (const wallet of _walletList) {
            convertWalletList.push({
                recipient: wallet.recipient,
                amount: getUTokenAmountFromToken(wallet.amount, decimals)
            });
        }

        ModalActions.handleData({
            module: '/cw20/transfer',
            params: {
                contract: _contract,
                msg: convertWalletList
            }
        });
        ModalActions.handleQrConfirm(true);
        ModalActions.handleSetCallback({
            callback: () => {
                _setWalletList([]);
                _setIsFetched(true);
            }
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
                        <ItemAmountTypo>{commaNumber(totalTransferAmount, decimals)}</ItemAmountTypo>
                        <ItemAmountSymbolTypo>{tokenSymbol}</ItemAmountSymbolTypo>
                        <ArrowToggleButton onToggle={setIsOpen} />
                    </ItemAmountWrap>
                </ItemWrap>
                {isOpen && (
                    <AccordionBox>
                        {transferList.map((info) => (
                            <FromToAddressLine from={info.fromAddress} to={info.toAddress} amount={info.amount} decimal={decimals} />
                        ))}
                    </AccordionBox>
                )}
            </ContentWrap>
            <ButtonWrap>
                <ExecuteButton disabled onClick={onClickTransfer}>
                    <ExecuteButtonTypo>Transfer</ExecuteButtonTypo>
                </ExecuteButton>
            </ButtonWrap>
        </Container>
    );
};

export default TransferFromPreview;
