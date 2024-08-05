import React, { useState } from 'react';

import {
    ItemLeftAddress,
    ItemLeftWrapper,
    ItemTokenAmount,
    SummeryLeftText,
    SummeryLeftWrapper,
    SummeryRightTokenSymbol,
    SummeryRightTotalSupply,
    SummeryRightWrapeer,
    TotalSupplySummery,
    TotalSupplyWrapper,
    WalletListItem,
    WalletListWrapper
} from './style';
import Icons from '@/components/atoms/icons';
import { IWallet } from '@/interfaces/wallet';
import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import commaNumber from 'comma-number';
import { parseAmountWithDecimal, shortenAddress } from '@/utils/common';
import { TOOLTIP_ID } from '@/constants/tooltip';

interface IProps {
    totalSupply: string;
    tokenSymbol: string;
    walletList: IWallet[];
    decimals: string;
}

const TotalSupply = ({ totalSupply, tokenSymbol, walletList, decimals }: IProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const onClickOpen = (isOpen: boolean) => {
        setIsOpen(isOpen);
    };

    return (
        <TotalSupplyWrapper>
            <TotalSupplySummery>
                <SummeryLeftWrapper>
                    <Icons.CoinStack1 width={'24px'} height={'24px'} />
                    <SummeryLeftText>Supply Amount</SummeryLeftText>
                </SummeryLeftWrapper>
                <SummeryRightWrapeer>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                        <SummeryRightTotalSupply $disabled={!Boolean(Number(totalSupply))}>
                            {commaNumber(parseAmountWithDecimal(totalSupply, '0'))}
                        </SummeryRightTotalSupply>
                        {tokenSymbol && Number(totalSupply) > 0 && <SummeryRightTokenSymbol>{tokenSymbol}</SummeryRightTokenSymbol>}
                    </div>
                    <ArrowToggleButton open={isOpen} onToggle={onClickOpen} />
                </SummeryRightWrapeer>
            </TotalSupplySummery>
            {isOpen ? (
                walletList.length === 0 ? (
                    <WalletListItem>
                        <ItemLeftWrapper>
                            <Icons.Wallet width={'20px'} height={'20px'} />
                            <ItemLeftAddress>{'-'}</ItemLeftAddress>
                        </ItemLeftWrapper>
                        <ItemTokenAmount>{'0'}</ItemTokenAmount>
                    </WalletListItem>
                ) : (
                    <WalletListWrapper>
                        {walletList.map((wallet, index) => (
                            <WalletListItem key={index}>
                                <ItemLeftWrapper>
                                    <Icons.Wallet width={'20px'} height={'20px'} />
                                    <ItemLeftAddress
                                        $disabled={!Boolean(wallet.recipient)}
                                        data-tooltip-content={wallet.recipient.length > 25 ? wallet.recipient : ''}
                                        data-tooltip-id={TOOLTIP_ID.COMMON}
                                        data-tooltip-wrapper="span"
                                        data-tooltip-place="bottom"
                                    >
                                        {shortenAddress(wallet.recipient, 12, 12) || 'Wallet Address'}
                                    </ItemLeftAddress>
                                </ItemLeftWrapper>
                                <ItemTokenAmount $disabled={!Boolean(Number(wallet.amount))} className="clamp-single-line">
                                    {commaNumber(parseAmountWithDecimal(wallet.amount, '0')) || '0'}
                                </ItemTokenAmount>
                            </WalletListItem>
                        ))}
                    </WalletListWrapper>
                )
            ) : (
                <></>
            )}
        </TotalSupplyWrapper>
    );
};

export default React.memo(TotalSupply);
