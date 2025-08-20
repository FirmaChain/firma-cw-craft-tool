import { useMemo, useState } from 'react';
import styled from 'styled-components';

import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { IC_ARROW_WITH_TAIL, IC_COIN_STACK, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import {
    addStringAmount,
    compareStringNumbers,
    formatWithCommas,
    getTokenAmountFromUToken,
    getUTokenAmountFromToken
} from '@/utils/balance';
import { getUTokenStrFromTokenStr, shortenAddress } from '@/utils/common';
// import useExecuteStore from '../../hooks/useExecuteStore';
import useModalStore from '@/store/modalStore';
import GreenButton from '@/components/atoms/buttons/greenButton';
import { isValidAddress } from '@/utils/address';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { ONE_TO_MINE } from '@/constants/regex';
import commaNumber from 'comma-number';
import { CRAFT_CONFIGS } from '@/config';
import QRModal2, { ModalType } from '@/components/organisms/modal/qrModal2';
import TxModal from '@/components/organisms/modal/txModal';
import TextEllipsis from '@/components/atoms/ellipsis';

import { useSnackbar } from 'notistack';
import { useCW20Execute } from '@/context/cw20ExecuteContext';
import useWalletStore from '@/store/walletStore';

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

const ContentBox = styled.div<{ $isOpen: boolean }>`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 32px 44px;

    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
    overflow: hidden;
    transition: all 0.2s ease;

    ${({ $isOpen }) =>
        $isOpen
            ? `
        gap: 24px;
    `
            : `
        gap: 0px;
    `}
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

const AccordionBox = styled.div<{ $isOpen: boolean }>`
    overflow-y: scroll;
    display: flex;
    flex-direction: column;

    transition: all 0.15s ease;
    width: 100%;

    ${({ $isOpen }) =>
        $isOpen
            ? `
    max-height: 100%;
    padding: 24px 26px 24px 32px;
    gap: 20px;
    opacity: 1;
`
            : `
    max-height: 0px;
    padding: 0px 32px;
    gap: 0px;
    opacity: 0;
`}
`;

const ButtonWrap = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AccordionValueWrap = styled.div`
    display: flex;
    gap: 6px;
    justify-content: center;
    align-items: center;
`;

const AccordionTypo = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-650, #707070)')};
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */

    white-space: pre;
`;

const AccordionSymbolTypo = styled.div`
    color: var(--Gray-550, #444);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const ScrollbarContainer = styled.div`
    border-radius: 12px;
    display: flex;
    background: var(--Gray-150, #141414);
    overflow: hidden;
`;

const FromToAddressLine = ({
    from,
    to,
    amount,
    decimal,
    symbol
}: {
    from?: string;
    to?: string;
    amount?: string;
    decimal?: string;
    symbol: string;
}) => {
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
            <AccordionValueWrap>
                <AccordionTypo
                    className="clamp-single-line"
                    $disabled={!Boolean(amount && decimal)}
                    data-tooltip-content={amount.length >= 4 ? amount : ''}
                    data-tooltip-id={TOOLTIP_ID.COMMON}
                    data-tooltip-wrapper="span"
                    data-tooltip-place="bottom"
                >
                    {amount && decimal ? commaNumber(getUTokenStrFromTokenStr(amount, decimal)) : 0}
                </AccordionTypo>
                <AccordionSymbolTypo>{symbol}</AccordionSymbolTypo>
            </AccordionValueWrap>
        </div>
    );
};

const USE_WALLET_CONNECT = CRAFT_CONFIGS.USE_WALLET_CONNECT;

const TransferFromPreview = () => {
    const { address, fctBalance } = useWalletStore();
    // const address = useSelector((state: rootState) => state.wallet.address);
    // const fctBalance = useSelector((v: rootState) => v.wallet.fctBalance);

    const context = useCW20Execute();
    const admin = context.contractInfo?.contract_info?.admin;
    const contractAddress = context.contractAddress;
    // const fctBalance = useCW721ExecuteStore((state) => state.fctBalance);
    const transferFromList = context.transferFromList;
    const tokenInfo = context.tokenInfo;
    const allowanceByAddress = context.allowanceByAddress;
    const balanceByAddress = context.balanceByAddress;

    const setIsFetched = context.setIsFetched;
    const clearTransferFrom = context.clearTransferFrom;

    const { enqueueSnackbar } = useSnackbar();

    const modal = useModalStore();

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const totalTransferAmount = useMemo(() => {
        const amounts = transferFromList.map((info) => info.toAmount);

        let totalAmount = '0';
        for (const amount of amounts) {
            totalAmount = addStringAmount(totalAmount, amount);
        }

        return totalAmount;
    }, [transferFromList]);

    const totalAmountByAddress = useMemo(() => {
        const result: Record<string, string> = {};

        transferFromList.map(({ fromAddress, toAmount }) => {
            const _addr = fromAddress.toLowerCase();

            if (!result[_addr]) result[_addr] = '';

            result[_addr] = addStringAmount(result[_addr], toAmount);
        });

        return result;
    }, [transferFromList]);

    const isEnableButton = useMemo(() => {
        const exceedAmount = transferFromList.some(({ fromAddress }) => {
            const _addr = fromAddress.toLowerCase();

            const requiredBalance = totalAmountByAddress[_addr] || '0';
            const ownerBalance = balanceByAddress[_addr] || '0';
            const ownerAllowance = allowanceByAddress[_addr] || '0';

            if (
                compareStringNumbers(requiredBalance, ownerBalance) > 0 ||
                compareStringNumbers(requiredBalance, getTokenAmountFromUToken(ownerAllowance, String(tokenInfo?.decimals))) > 0
            )
                return true;
        });

        if (exceedAmount) return false;

        //! if empty values included
        if (transferFromList.some((v) => v.fromAddress === '' || v.toAddress === '' || v.toAmount === '')) return false;

        //! if all address is valid
        if (transferFromList.some((v) => !isValidAddress(v.fromAddress) || !isValidAddress(v.toAddress))) return false;

        //! if all toAmount values valid
        if (transferFromList.some((v) => v.toAmount.replace(ONE_TO_MINE, '') === '')) return false;

        return true;
    }, [allowanceByAddress, balanceByAddress, totalAmountByAddress, transferFromList]);

    const hideGotoDetail = address !== admin;

    const onClickTransfer = () => {
        if (modal.modals.length >= 1) return;

        if (Number(fctBalance) === 0) {
            enqueueSnackbar({ message: 'Insufficient funds. Please check your account balance.', variant: 'error' });
            return;
        }

        const convertTransferList = [];
        let totalAmount = '0';
        const feeAmount =
            transferFromList.length === 1 ? Number(CRAFT_CONFIGS.DEFAULT_FEE) : transferFromList.length * Number(CRAFT_CONFIGS.BULK_FEE);

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
            modalType: 'EXECUTES' as ModalType,
            header: {
                title: 'Transfer From'
            },
            txParams: {
                contract: contractAddress,
                msg: convertTransferList,
                totalLength: JSON.stringify(convertTransferList).length,
                walletLength: convertTransferList.length
            },
            contentParams: {
                symbol: tokenInfo.symbol,
                decimals: tokenInfo.decimals.toString(),
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Total Transfer Amount',
                        value: totalAmount,
                        type: 'execute_amount',
                        initColor: '#02E191',
                        resultColor: '#E6E6E6'
                    },
                    {
                        label: 'Total Wallet Count',
                        value: convertTransferList.length.toString(),
                        type: 'wallet-count',
                        initColor: '#807E7E',
                        resultColor: '#807E7E'
                    }
                ]
            }
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => {
                return !USE_WALLET_CONNECT ? (
                    <TxModal
                        module="/cw20/transferFrom"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            setIsFetched(true);
                            clearTransferFrom();
                        }}
                        hideGotoDetail={hideGotoDetail}
                    />
                ) : (
                    <QRModal2
                        module="/cw20/transferFrom"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            setIsFetched(true);
                            clearTransferFrom();
                        }}
                        hideGotoDetail={hideGotoDetail}
                    />
                );
            }
        });
    };

    return (
        <Container>
            <ContentBox $isOpen={isOpen}>
                <ItemWrap>
                    <ItemLabelWrap>
                        <ItemLabelIcon src={IC_COIN_STACK} alt={'Transfer Title Icon'} />
                        <ItemLabelTypo>Total Transfer Amount</ItemLabelTypo>
                    </ItemLabelWrap>
                    <ItemAmountWrap style={{ gap: '12px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                            <TextEllipsis CustomDiv={ItemAmountTypo} text={formatWithCommas(totalTransferAmount)} breakMode={'letters'} />
                            <ItemAmountSymbolTypo>{tokenInfo.symbol}</ItemAmountSymbolTypo>
                        </div>
                        <ArrowToggleButton open={isOpen} onToggle={setIsOpen} />
                    </ItemAmountWrap>
                </ItemWrap>
                <ScrollbarContainer>
                    {/* <ExecutePreviewOverlayScroll defer> */}
                    <AccordionBox $isOpen={isOpen} className="address-scrollbar">
                        {transferFromList.map((info, index) => (
                            <FromToAddressLine
                                key={index}
                                from={info.fromAddress}
                                to={info.toAddress}
                                amount={info.toAmount}
                                decimal={tokenInfo.decimals.toString()}
                                symbol={tokenInfo.symbol}
                            />
                        ))}
                    </AccordionBox>
                    {/* </ExecutePreviewOverlayScroll> */}
                </ScrollbarContainer>
            </ContentBox>

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
