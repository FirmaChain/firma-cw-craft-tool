import { useMemo, useState } from 'react';
import styled from 'styled-components';

import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_ARROW_WITH_TAIL, IC_COIN_STACK, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { addStringAmount, formatWithCommas, getUTokenAmountFromToken } from '@/utils/balance';
import { getUTokenStrFromTokenStr, shortenAddress } from '@/utils/common';
import useExecuteStore from '../../hooks/useExecuteStore';
import { useModalStore } from '@/hooks/useModal';
import { QRCodeModal } from '@/components/organisms/modal';
import GreenButton from '@/components/atoms/buttons/greenButton';
import { isValidAddress } from '@/utils/address';
import { TOOLTIP_ID } from '@/constants/tooltip';
import useFormStore from '@/store/formStore';
import { ONE_TO_MINE } from '@/constants/regex';

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
    gap: 16px;
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
    white-space: pre;
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

const AccordionTypo = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-650, #707070)')};
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const FromToAddressLine = ({ from, to, amount, decimal }: { from?: string; to?: string; amount?: string; decimal?: string }) => {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
                    <img src={IC_WALLET} alt="wallet" style={{ width: '20px' }} />
                    <AccordionTypo
                        data-tooltip-content={from.length >= 13 ? from : ''}
                        data-tooltip-id={TOOLTIP_ID.COMMON}
                        data-tooltip-wrapper="span"
                        data-tooltip-place="bottom"
                        $disabled={!Boolean(from)}
                    >
                        {from ? shortenAddress(from) : 'Wallet Address'}
                    </AccordionTypo>
                </div>

                <img src={IC_ARROW_WITH_TAIL} alt="arrow" style={{ width: '16px' }} />

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
                    <img src={IC_WALLET} alt="wallet" style={{ width: '20px' }} />
                    <AccordionTypo
                        data-tooltip-content={to.length >= 13 ? to : ''}
                        data-tooltip-id={TOOLTIP_ID.COMMON}
                        data-tooltip-wrapper="span"
                        data-tooltip-place="bottom"
                        $disabled={!Boolean(to)}
                    >
                        {to ? shortenAddress(to) : 'Wallet Address'}
                    </AccordionTypo>
                </div>
            </div>

            <AccordionTypo className="clamp-single-line" $disabled={!Boolean(amount && decimal)}>
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

    const setIsFetched = useExecuteStore((state) => state.setIsFetched);
    const clearTransferFrom = useExecuteStore((state) => state.clearTransferFrom);

    const setFormError = useFormStore((v) => v.setFormError);
    const clearFormError = useFormStore((v) => v.clearFormError);

    const modal = useModalStore();

    const [isOpen, setIsOpen] = useState<boolean>(true);
    // const [isEnableButton, setIsEnableButton] = useState<boolean>(false);

    const totalTransferAmount = useMemo(() => {
        const amounts = transferFromList.map((info) => getUTokenStrFromTokenStr(info.toAmount, tokenInfo.decimals.toString()));

        let totalAmount = '0';
        for (const amount of amounts) {
            totalAmount = addStringAmount(totalAmount, amount);
        }

        return totalAmount;
    }, [transferFromList]);

    const isEnableButton = useMemo(() => {
        //! if some from-to address is duplicated
        let isDuplicated = false;
        transferFromList.map(({ fromAddress, toAddress }) => {
            const findAllDuplicted = transferFromList.filter(
                (v) =>
                    v.fromAddress !== '' &&
                    v.toAddress !== '' &&
                    v.fromAddress.toLowerCase() === fromAddress.toLowerCase() &&
                    v.toAddress.toLowerCase() === toAddress.toLowerCase()
            );

            //! if duplucatted list is more than 2 (one for self)
            if (findAllDuplicted.length > 1) {
                isDuplicated = true;
                findAllDuplicted.map(({ id: formId }) =>
                    setFormError({ id: `${formId}_TO_ADDRESS`, type: 'DUPLICATED_FROM_TO', message: 'Duplicated from-to address.' })
                );
            } else {
                findAllDuplicted.map(({ id: formId }) => clearFormError({ id: `${formId}_TO_ADDRESS`, type: 'DUPLICATED_FROM_TO' }));
            }
        });
        if (isDuplicated) return false;

        //! if empty values included
        if (transferFromList.some((v) => v.fromAddress === '' || v.toAddress === '' || v.toAmount === '')) return false;

        //! if all address is valid
        if (transferFromList.some((v) => !isValidAddress(v.fromAddress) || !isValidAddress(v.toAddress))) return false;

        //! if all toAmount values valid
        if (transferFromList.some((v) => v.toAmount.replace(ONE_TO_MINE, '') === '')) return false;

        return true;
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
                        setIsFetched(true);
                        clearTransferFrom();
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
                        <ItemAmountTypo className="clamp-single-line">{formatWithCommas(totalTransferAmount)}</ItemAmountTypo>
                        <ItemAmountSymbolTypo>{tokenInfo.symbol}</ItemAmountSymbolTypo>
                        <ArrowToggleButton open={isOpen} onToggle={setIsOpen} />
                    </ItemAmountWrap>
                </ItemWrap>
                {isOpen && (
                    <AccordionBox>
                        {transferFromList.map((info, index) => (
                            <FromToAddressLine
                                key={index}
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
                <GreenButton disabled={!isEnableButton} onClick={onClickTransfer}>
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
