import React, { useEffect, useMemo, useState } from 'react';
import Icons from '@/components/atoms/icons';
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
import { IWallet } from '@/interfaces/wallet';
import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import IconTooltip from '@/components/atoms/tooltip';
import commaNumber from 'comma-number';
import Divider from '@/components/atoms/divider';
import { parseAmountWithDecimal } from '@/utils/common';

interface IProps {
    minterble: boolean;
    minterCap: string;
    tokenSymbol: string;
    minterAddress: string;
    totalSupply: string;
    walletList: IWallet[];
    decimals: string;
}

const CAP_TOOLTIP_TEXT = `Minter Cap is a value that limits the maximum\nnumber of tokens that can be minted.\nYou can mint more tokens by subtracting\nthe Total Supply from the Minter Cap.`;

const Amount = ({ minterble, minterCap, tokenSymbol, minterAddress, totalSupply, walletList, decimals }: IProps) => {
    const cw20Mode = useSelector((state: rootState) => state.global.cw20Mode);

    const [toggleMinterDetail, setToggleMinterDetail] = useState<boolean>(false);

    const onClickToggleMinterDetail = (isOpen: boolean) => {
        setToggleMinterDetail(isOpen);
    };

    const isBasic = cw20Mode === 'BASIC';

    const currentMinterAddress = useMemo(() => {
        if (isBasic) {
            return '';
        } else {
            //? If advanced mode
            return minterAddress;
        }
    }, [isBasic, minterAddress]);

    useEffect(() => {
        if (isBasic) setToggleMinterDetail(false);
    }, [isBasic]);

    return (
        <AmountWrapper>
            {minterble && (
                <>
                    <MinterCapWrapper>
                        <MinterCapHeaderWrapper>
                            <HeaderLeftWrapper>
                                <Icons.CoinStack2 width={'24px'} height={'24px'} />
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                                    <HeaderMinterCapText>Minter Cap</HeaderMinterCapText>
                                    <IconTooltip size="14px" tooltip={CAP_TOOLTIP_TEXT} />
                                </div>
                            </HeaderLeftWrapper>
                            <HeaderRightWrapper>
                                <HeaderMinterCapAmount $disabled={!Boolean(Number(minterCap))}>
                                    {commaNumber(parseAmountWithDecimal(minterCap, '0')) || 0}
                                </HeaderMinterCapAmount>
                                <HeaderMinterCapTokenSymbol>{tokenSymbol !== '' ? tokenSymbol : ''}</HeaderMinterCapTokenSymbol>
                                {!isBasic && <ArrowToggleButton onToggle={onClickToggleMinterDetail} />}
                            </HeaderRightWrapper>
                        </MinterCapHeaderWrapper>
                        {toggleMinterDetail ? (
                            <DetailWrapper>
                                <DetailLeftWrapper>
                                    <Icons.Wallet width={'20px'} height={'20px'} />
                                    <DetailAddressText $disabled={!Boolean(currentMinterAddress)}>
                                        {currentMinterAddress || 'Wallet Address'}
                                    </DetailAddressText>
                                </DetailLeftWrapper>
                                <DetailMinterCapAmount $disabled={!Boolean(Number(minterCap))}>
                                    {commaNumber(parseAmountWithDecimal(minterCap, '0')) || 0}
                                </DetailMinterCapAmount>
                            </DetailWrapper>
                        ) : (
                            <></>
                        )}
                    </MinterCapWrapper>
                    <Divider $direction="horizontal" $color="#383838" $variant="dash" />
                </>
            )}
            <TotalSupply totalSupply={totalSupply} tokenSymbol={tokenSymbol} walletList={walletList} decimals={decimals} />
        </AmountWrapper>
    );
};

export default React.memo(Amount);
