import { useMemo, useState } from 'react';
import styled from 'styled-components';

import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_ARROW_WITH_TAIL, IC_COIN_STACK, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { addStringAmount, formatWithCommas, getUTokenAmountFromToken } from '@/utils/balance';
import { getUTokenStrFromTokenStr, shortenAddress } from '@/utils/common';
import { ModalActions } from '@/redux/actions';
import IconButton from '@/components/atoms/buttons/iconButton';
import useExecuteStore from '../../hooks/useExecuteStore';
import { useModalStore } from '@/hooks/useModal';
import { QRCodeModal } from '@/components/organisms/modal';
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

const AccordionBox = styled.div`
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

const TransferFromPreview = () => {
    const contractAddress = useExecuteStore((state) => state.contractAddress);
    const fctBalance = useExecuteStore((state) => state.fctBalance);
    const transferFromList = useExecuteStore((state) => state.transferFromList);
    const tokenInfo = useExecuteStore((state) => state.tokenInfo);

    const modal = useModalStore();

    const [isEnableButton, setIsEnableButton] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const totalTransferAmount = useMemo(() => {
        const amounts = transferFromList.map((info) => getUTokenStrFromTokenStr(info.toAmount, tokenInfo.decimals.toString()));

        let totalAmount = '0';
        for (const amount of amounts) {
            totalAmount = addStringAmount(totalAmount, amount);
        }

        return totalAmount;
    }, [transferFromList]);

    const onClickTransfer = () => {
        const convertTransferList = [];
        let totalAmount = '0';
        let feeAmount = transferFromList.length * 15000;

        for (const transfer of transferFromList) {
            const amount = getUTokenAmountFromToken(transfer.toAmount, tokenInfo.decimals.toString());
            convertTransferList.push({
                owner: transfer.fromAddress,
                amount: amount,
                recipient: transfer.toAddress
            });
            totalAmount = addStringAmount(totalAmount, amount);
        }

        const params = {
            header: {
                title: 'Transfer From'
            },
            content: {
                symbol: tokenInfo.symbol,
                decimals: tokenInfo.decimals.toString(),
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Total Transfer Amount',
                        value: totalAmount,
                        type: 'amount'
                    },
                    {
                        label: 'Total Wallet Count',
                        value: convertTransferList.length.toString(),
                        type: 'wallet-count'
                    }
                ]
            },
            contract: contractAddress,
            msg: convertTransferList
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <QRCodeModal
                    module="/cw20/transferFrom"
                    id={id}
                    params={params}
                    onClickConfirm={() => {
                        console.log(111);
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
                        <ItemAmountTypo>{formatWithCommas(totalTransferAmount)}</ItemAmountTypo>
                        <ItemAmountSymbolTypo>{tokenInfo.symbol}</ItemAmountSymbolTypo>
                        <ArrowToggleButton onToggle={setIsOpen} />
                    </ItemAmountWrap>
                </ItemWrap>
                {isOpen && (
                    <AccordionBox>
                        {transferFromList.map((info) => (
                            <FromToAddressLine
                                from={info.fromAddress}
                                to={info.toAddress}
                                amount={info.toAmount}
                                decimal={tokenInfo.decimals.toString()}
                            />
                        ))}
                    </AccordionBox>
                )}
            </ContentWrap>
            <ButtonWrap>
                <GreenButton disabled={false} onClick={onClickTransfer}>
                    <div className="button-text">Transfer</div>
                </GreenButton>
                {/* <ExecuteButton onClick={onClickTransfer}>
                    <ExecuteButtonTypo>Transfer</ExecuteButtonTypo>
                </ExecuteButton> */}
            </ButtonWrap>
        </Container>
    );
};

export default TransferFromPreview;
