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

interface IProps {
    totalSupply: string;
    tokenSymbol: string;
    walletList: IWallet[];
    decimals: string;
}

const TotalSupply = ({ totalSupply, tokenSymbol, walletList, decimals }: IProps) => {
    const [toggleWalletList, setToggleWalletList] = useState<boolean>(false);

    const onClickToggleWalletList = (isOpen: boolean) => {
        setToggleWalletList(isOpen);
    };

    return (
        <TotalSupplyWrapper>
            <TotalSupplySummery>
                <SummeryLeftWrapper>
                    <Icons.CoinStack1 width={'24px'} height={'24px'} />
                    <SummeryLeftText>Total Supply</SummeryLeftText>
                </SummeryLeftWrapper>
                <SummeryRightWrapeer>
                    <SummeryRightTotalSupply $disabled={!Boolean(Number(totalSupply))}>{commaNumber(totalSupply)}</SummeryRightTotalSupply>
                    <SummeryRightTokenSymbol>{tokenSymbol !== '' ? tokenSymbol : ''}</SummeryRightTokenSymbol>
                    <ArrowToggleButton onToggle={onClickToggleWalletList} />
                </SummeryRightWrapeer>
            </TotalSupplySummery>
            {toggleWalletList ? (
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
                                    <ItemLeftAddress $disabled={!Boolean(wallet.recipient)}>
                                        {wallet.recipient || 'Wallet Address'}
                                    </ItemLeftAddress>
                                </ItemLeftWrapper>
                                <ItemTokenAmount $disabled={!Boolean(Number(wallet.amount))}>
                                    {commaNumber(wallet.amount) || '0'}
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
