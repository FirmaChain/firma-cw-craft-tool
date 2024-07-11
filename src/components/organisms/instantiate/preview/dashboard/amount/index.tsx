import React, { useState } from 'react';

import Icons from '../../../../../atoms/icons';
import {
    AmountWrapper,
    DetailAddressText,
    DetailLeftWrapper,
    DetailMinterCapAmount,
    DetailWrapper,
    HeaderLeftWrapper,
    HeaderMinterCapAmount,
    HeaderMinterCapText,
    HeaderMinterCapTokenSymbol,
    HeaderRightWrapper,
    MinterCapHeaderWrapper,
    MinterCapWrapper
} from './style';

import TotalSupply from './totalSupply';
import { IWallet } from '../../../../../../interfaces/wallet';
import { getUTokenStrFromTokenStr } from '../../../../../../utils/common';
import ArrowToggleButton from '../../../../../atoms/buttons/arrowToggleButton';
import { HalfDottedDivider } from '../../../../../atoms/divider/dottedDivider';

interface IProps {
    minterble: boolean;
    minterCap: string;
    tokenSymbol: string;
    minterAddress: string;
    totalSupply: string;
    walletList: IWallet[];
    decimals: string;
}

const Amount = ({ minterble, minterCap, tokenSymbol, minterAddress, totalSupply, walletList, decimals }: IProps) => {
    const [toggleMinterDetail, setToggleMinterDetail] = useState<boolean>(false);

    const onClickToggleMinterDetail = (isOpen: boolean) => {
        setToggleMinterDetail(isOpen);
    };

    return (
        <AmountWrapper>
            {minterble && (
                <>
                    <MinterCapWrapper>
                        <MinterCapHeaderWrapper>
                            <HeaderLeftWrapper>
                                <Icons.CoinStack2 width={'24px'} height={'24px'} />
                                <HeaderMinterCapText>Minter Cap</HeaderMinterCapText>
                            </HeaderLeftWrapper>
                            <HeaderRightWrapper>
                                <HeaderMinterCapAmount>
                                    {minterCap !== '' ? getUTokenStrFromTokenStr(minterCap, decimals) : '0'}
                                </HeaderMinterCapAmount>
                                <HeaderMinterCapTokenSymbol>{tokenSymbol !== '' ? tokenSymbol : ''}</HeaderMinterCapTokenSymbol>
                                <ArrowToggleButton onToggle={onClickToggleMinterDetail} />
                            </HeaderRightWrapper>
                        </MinterCapHeaderWrapper>
                        {toggleMinterDetail ? (
                            <DetailWrapper>
                                <DetailLeftWrapper>
                                    <Icons.wallet width={'20px'} height={'20px'} />
                                    <DetailAddressText>{minterAddress !== '' ? minterAddress : '-'}</DetailAddressText>
                                </DetailLeftWrapper>
                                <DetailMinterCapAmount>
                                    {minterCap !== '' ? getUTokenStrFromTokenStr(minterCap, decimals) : '0'}
                                </DetailMinterCapAmount>
                            </DetailWrapper>
                        ) : (
                            <></>
                        )}
                    </MinterCapWrapper>
                    <HalfDottedDivider />
                </>
            )}
            <TotalSupply totalSupply={totalSupply} tokenSymbol={tokenSymbol} walletList={walletList} decimals={decimals} />
        </AmountWrapper>
    );
};

export default React.memo(Amount);
