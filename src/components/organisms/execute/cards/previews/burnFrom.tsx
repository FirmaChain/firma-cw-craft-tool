import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { IC_COIN_STACK, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { isValidAddress, shortenAddress } from '@/utils/address';
import { addStringAmount, formatWithCommas, getTokenAmountFromUToken, getUTokenAmountFromToken } from '@/utils/balance';
import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { useModalStore } from '@/hooks/useModal';
import { QRCodeModal } from '@/components/organisms/modal';
import useExecuteStore from '../../hooks/useExecuteStore';
import GreenButton from '@/components/atoms/buttons/greenButton';
import useFormStore from '@/store/formStore';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { ONE_TO_MINE } from '@/constants/regex';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { ExecutePreviewOverlayScroll } from '@/components/organisms/instantiate/preview/dashboard/style';
import { CRAFT_CONFIGS } from '@/config';

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
    // border-radius: 24px;
    // border: 1px solid var(--Gray-550, #444);
    gap: 24px;
    // overflow: scroll;
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

const WalletListWrap = styled.div<{ $isOpen: boolean }>`
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
    color: ${({ $disabled }) => ($disabled ? '#383838' : '#707070')};
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */

    white-space: pre;
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

const BurnFromPreview = () => {
    const network = useSelector((state: rootState) => state.global.network);
    
    const userAddress = useSelector((v: rootState) => v.wallet.address);
    const contractAddress = useExecuteStore((v) => v.contractAddress);
    const fctBalance = useExecuteStore((v) => v.fctBalance);
    const burnFromList = useExecuteStore((v) => v.burnFromList);
    const tokenInfo = useExecuteStore((v) => v.tokenInfo);
    const allowanceByAddress = useExecuteStore((v) => v.allowanceByAddress);
    const clearBurnFrom = useExecuteStore((v) => v.clearBurnFrom);
    const setIsFetched = useExecuteStore((v) => v.setIsFetched);
    const setFormError = useFormStore((v) => v.setFormError);
    const clearFormError = useFormStore((v) => v.clearFormError);

    const modal = useModalStore();

    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [availableAmount, setAvailableAmount] = useState<string>("0");

    const craftConfig = useMemo(() => {
        const config = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return config;
    }, [network]);
    
    const totalBurnBalance = useMemo(() => {
        let totalAmount = '0';

        for (const wallet of burnFromList) {
            totalAmount = addStringAmount(totalAmount, wallet.amount);
        }

        return getUTokenAmountFromToken(totalAmount, tokenInfo.decimals.toString());
    }, [burnFromList, tokenInfo]);

    const checkAmounyByAddress = () => {
        let result = true;

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

        // const checkAddress = Object.keys(addressAmountMap);

        // checkAddress.map((address: string) => {
        //     const currentAllowance = BigInt(allowanceByAddress[address] || '');

        //     const inputAmount = addressAmountMap[address];
        //     const formIds = burnFromList.filter((one) => one.recipient.toLowerCase() === address).map((v) => v.id);

        //     //! if total amount is bigger than provided allowance
        //     if (currentAllowance < inputAmount) {
        //         result = false;
        //         formIds.map((id) => setFormError({ id: `${id}_AMOUNT`, type: 'ALLOWANCE_EXCEED', message: 'Allowance exceed.' }));
        //     } else {
        //         formIds.map((id) => clearFormError({ id: `${id}_AMOUNT`, type: 'ALLOWANCE_EXCEED' }));
        //     }
        // });

        return result;
    };

    // useEffect(() => {
    //     checkAmounyByAddress();
    // }, [allowanceByAddress]);

    const isEnableButton = useMemo(() => {
        //! if self-address is included
        if (burnFromList.some((v) => v.recipient.toLowerCase() === userAddress)) return false;

        //! check all amount by address is valid
        // const isAmountOK = checkAmounyByAddress();
        // if (!isAmountOK) return false;

        //! check all list is filled (empty value check)
        if (
            burnFromList.some(
                (value) => value.recipient === '' || value.amount === '' || value.amount.replace(ONE_TO_MINE, '').length === 0
            )
        )
            return false;

        //! check all address is valid
        if (burnFromList.some((value) => !isValidAddress(value.recipient))) return false;

        return true;
    }, [burnFromList, userAddress]);

    const onClickBurn = () => {
        const convertWalletList = [];
        let totalAmount = '0';
        const feeAmount = burnFromList.length === 1
        ? Number(craftConfig.DEFAULT_FEE) : burnFromList.length * Number(craftConfig.BULK_FEE);

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
                        setIsFetched(true);
                        clearBurnFrom();
                    }}
                />
            )
        });
    };

    return (
        <Container>
            <ContentScrollWrap>
                {/* <ExecutePreviewOverlayScroll defer> */}
                <ContentBox $isOpen={isOpen}>
                    <ItemWrap>
                        <ItemLabelWrap>
                            <ItemLabelIcon src={IC_COIN_STACK} alt={'Burn From Title Icon'} />
                            <ItemLabelTypo>Total Burn Amount</ItemLabelTypo>
                        </ItemLabelWrap>
                        <ItemAmountWrap>
                            <ItemAmountTypo className="clamp-single-line">
                                {formatWithCommas(getTokenAmountFromUToken(totalBurnBalance, tokenInfo.decimals.toString()))}
                            </ItemAmountTypo>
                            <ItemAmountSymbolTypo>{tokenInfo.symbol}</ItemAmountSymbolTypo>
                            <ArrowToggleButton open={isOpen} onToggle={setIsOpen} />
                        </ItemAmountWrap>
                    </ItemWrap>
                    <ScrollbarContainer>
                        <WalletListWrap $isOpen={isOpen} className="address-scrollbar">
                            {burnFromList.map((value, index) => (
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
                                        <WalletItemTokenAmount $disabled={!Number(value.amount)} className="clamp-single-line">
                                            {value.amount === '' ? '0' : formatWithCommas(value.amount)}
                                        </WalletItemTokenAmount>
                                        <WalletItemTokenSymbol>{tokenInfo.symbol}</WalletItemTokenSymbol>
                                    </WalletItemTokenWrap>
                                </WalletItemWrap>
                            ))}
                        </WalletListWrap>
                    </ScrollbarContainer>
                </ContentBox>
                {/* </ExecutePreviewOverlayScroll> */}
            </ContentScrollWrap>
            <ButtonWrap>
                <GreenButton disabled={!isEnableButton} onClick={onClickBurn}>
                    <div className="button-text">Burn</div>
                </GreenButton>
            </ButtonWrap>
        </Container>
    );
};

export default BurnFromPreview;
