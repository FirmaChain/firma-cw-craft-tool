import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_COIN_STACK, IC_COIN_STACK2, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import {
    addStringAmount,
    formatWithCommas,
    getTokenAmountFromUToken,
    getUTokenAmountFromToken,
    subtractStringAmount
} from '@/utils/balance';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { shortenAddress } from '@/utils/common';
import { isValidAddress } from '@/utils/address';
import { useModalStore } from '@/hooks/useModal';
import { QRCodeModal } from '@/components/organisms/modal';
import useExecuteStore from '../../hooks/useExecuteStore';
import Divider from '@/components/atoms/divider';
import GreenButton from '@/components/atoms/buttons/greenButton';
import useExecuteActions from '../../action';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { ONE_TO_MINE } from '@/constants/regex';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { ExecutePreviewOverlayScroll } from '@/components/organisms/instantiate/preview/dashboard/style';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 36px;
    justify-content: center;
    overflow: hidden;
`;

const ContentScrollWrap = styled.div`
    display: flex;
    width: 100%;
    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
    overflow: hidden;
`;

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 32px 44px;

    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
    overflow: hidden;
    gap: 24px;
`;

const ItemBox = styled.div<{ $isOpen: boolean }>`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 24px;
    height: fit-content;
    transition: all 0.2s all;

    ${({ $isOpen }) => $isOpen ? `
        gap: 24px;
    `: `
        gap: 0px;
    `}
`

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

const WalletListWrap = styled.div<{ $isOpen: boolean }>`
    height: object-fit;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: object-fit;
    transition: all 0.15s ease;

    ${({ $isOpen }) => $isOpen ? `
        max-height: 100%;
        padding: 24px 32px;
        gap: 20px;
        opacity: 1;
    `: `
        max-height: 0px;
        padding: 0px 32px;
        gap: 0px;
        opacity: 0;
    `}  
`;

const WalletItemWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 16px;
`;

const WalletLeftItemWrap = styled.div`
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

const WalletItemTokenWrap = styled.div`
    display: flex;
    gap: 6px;
    justify-content: center;
    align-items: center;
`;

const WalletItemTokenAmount = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? '#383838' : '#807E7E')};
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const WalletItemTokenSymbol = styled.div`
    color: var(--Gray-550, #444);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
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

    white-space: pre;
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

const ScrollbarContainer = styled.div`
    border-radius: 12px;
    display: flex;
    background: var(--Gray-150, #141414);
    overflow: hidden;
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

    const [isOpen, setIsOpen] = useState<boolean>(true);

    console.log(transferList);

    const updatedAmount = useMemo(() => {
        let calcTransferAmount = '0';

        for (const wallet of transferList) {
            calcTransferAmount = addStringAmount(calcTransferAmount, wallet.amount);
        }

        const remainAmount = subtractStringAmount(cw20Balance, getUTokenAmountFromToken(calcTransferAmount, tokenInfo.decimals.toString()));
        return remainAmount;
    }, [transferList, cw20Balance, tokenInfo]);

    const totalTransferAmount = useMemo(() => {
        let calcTransferAmount = '0';

        for (const wallet of transferList) {
            calcTransferAmount = addStringAmount(calcTransferAmount, wallet.amount);
        }

        return getUTokenAmountFromToken(calcTransferAmount, tokenInfo.decimals.toString());
    }, [transferList, tokenInfo]);

    const isEnableButton = useMemo(() => {
        //! check all address and amount is not empty
        if (transferList.some((v) => v.recipient === '' || v.amount === '')) return false;
        //! check all address is valid
        if (transferList.some((v) => !isValidAddress(v.recipient))) return false;
        //! check all address is not self address
        if (transferList.some((v) => v.recipient.toLowerCase() === address.toLowerCase())) return false;
        //! check all amount is valid ( > 0)
        if (transferList.some((v) => v.amount.replace(ONE_TO_MINE, '') === '')) return false;
        //! check total amount is not exceed token balance
        if (BigInt(cw20Balance || '0') < BigInt(totalTransferAmount)) return false;

        return true;
    }, [address, cw20Balance, totalTransferAmount, transferList]);

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
            <ContentBox>
                <ItemBox $isOpen={isOpen}>
                    <ItemWrap>
                        <ItemLabelWrap>
                            <ItemLabelIcon src={IC_COIN_STACK} alt={'Transfer Title Icon'} />
                            <ItemLabelTypo>Total Transfer Amount</ItemLabelTypo>
                        </ItemLabelWrap>
                        <ItemAmountWrap>
                            <ItemAmountTypo className="clamp-single-line">
                                {formatWithCommas(getTokenAmountFromUToken(totalTransferAmount, tokenInfo.decimals.toString()))}
                            </ItemAmountTypo>
                            <ItemAmountSymbolTypo>{tokenInfo.symbol}</ItemAmountSymbolTypo>
                            <ArrowToggleButton open={isOpen} onToggle={setIsOpen} />
                        </ItemAmountWrap>
                    </ItemWrap>
                    <ScrollbarContainer>
                        <ExecutePreviewOverlayScroll defer>
                            <WalletListWrap $isOpen={isOpen}>
                                {transferList.map((value, index) => (
                                    <WalletItemWrap key={index}>
                                        <WalletLeftItemWrap>
                                            <WalletItemIcon src={IC_WALLET} alt={'Wallet Item'} />
                                            <WalletItemAddressTypo
                                                $disabled={!value.recipient}
                                                data-tooltip-content={value.recipient.length >= 25 ? value.recipient : ''}
                                                data-tooltip-id={TOOLTIP_ID.COMMON}
                                                data-tooltip-wrapper="span"
                                                data-tooltip-place="bottom"
                                            >
                                                {value.recipient !== '' ? shortenAddress(value.recipient, 12, 12) : 'Wallet Address'}
                                            </WalletItemAddressTypo>
                                        </WalletLeftItemWrap>
                                        <WalletItemTokenWrap>
                                            <WalletItemTokenAmount className="clamp-single-line" $disabled={!Number(value.amount)}>
                                                {value.amount === '' ? '0' : formatWithCommas(value.amount)}
                                            </WalletItemTokenAmount>
                                            <WalletItemTokenSymbol>{tokenInfo.symbol}</WalletItemTokenSymbol>
                                        </WalletItemTokenWrap>
                                    </WalletItemWrap>
                                ))}
                            </WalletListWrap>
                        </ExecutePreviewOverlayScroll>
                    </ScrollbarContainer>
                </ItemBox>
                <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-500, #383838)" />
                <ItemWrap>
                    <ItemLabelWrap>
                        <CoinStack2Icon src={IC_COIN_STACK2} alt={'Update Balance Icon'} />
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                            <UpdatedBalanceLabelTypo>Updated Balance</UpdatedBalanceLabelTypo>
                        </div>
                    </ItemLabelWrap>
                    <ItemLabelWrap>
                        <UpdatedBalanceTypo className="clamp-single-line">
                            {formatWithCommas(getTokenAmountFromUToken(updatedAmount, tokenInfo.decimals.toString()))}
                        </UpdatedBalanceTypo>
                        <UpdatedSymbolTypo>{tokenInfo.symbol}</UpdatedSymbolTypo>
                    </ItemLabelWrap>
                </ItemWrap>
            </ContentBox>

            <ButtonWrap>
                <GreenButton disabled={!isEnableButton} onClick={onClickTransfer}>
                    <div className="button-text">Transfer</div>
                </GreenButton>
            </ButtonWrap>
        </Container>
    );
};

export default TransferPreview;
