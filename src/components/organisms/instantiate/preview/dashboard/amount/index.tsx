import React, { useEffect, useMemo, useState } from 'react';
import Icons from '@/components/atoms/icons';
import {
    AmountWrapper,
    DetailAddressText,
    DetailLeftWrapper,
    DetailMinterCapAmount,
    DetailWrapper,
    DividerBox,
    HeaderLeftWrapper,
    HeaderMinterCapAmount,
    HeaderMinterCapText,
    HeaderMinterCapTokenSymbol,
    HeaderRightWrapper,
    MinterCapAccordianBox,
    MinterCapHeaderWrapper,
    MinterCapInfoBox,
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
import { shortenAddress } from '@/utils/common';
import { TOOLTIP_ID } from '@/constants/tooltip';

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
    const contractMode = useSelector((state: rootState) => state.global.contractMode);

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const onClickOpen = (isOpen: boolean) => {
        setIsOpen(isOpen);
    };

    const isBasic = contractMode === 'BASIC';

    const currentMinterAddress = useMemo(() => {
        if (isBasic) {
            return '';
        } else {
            //? If advanced mode
            return minterAddress;
        }
    }, [isBasic, minterAddress]);

    useEffect(() => {
        if (!isBasic) setIsOpen(true);
    }, [isBasic]);

    return (
        <AmountWrapper $isMinterble={true} style={{ gap: 0 }}>
            <MinterCapAccordianBox $open={minterble}>
                <MinterCapWrapper>
                    <MinterCapHeaderWrapper>
                        <HeaderLeftWrapper>
                            <Icons.CoinStack2 width={'24px'} height={'24px'} />
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                                <HeaderMinterCapText>Minter Cap</HeaderMinterCapText>
                                <IconTooltip size="14px" tooltip={CAP_TOOLTIP_TEXT} TooltipIcon={<Icons.Alert />} />
                            </div>
                        </HeaderLeftWrapper>
                        <HeaderRightWrapper>
                            <HeaderMinterCapAmount className="clamp-single-line" $disabled={!Boolean(Number(minterCap))}>
                                {commaNumber(minterCap) || 0}
                            </HeaderMinterCapAmount>
                            {minterCap && tokenSymbol && <HeaderMinterCapTokenSymbol>{tokenSymbol || ''}</HeaderMinterCapTokenSymbol>}
                            {!isBasic && <ArrowToggleButton open={isOpen} onToggle={onClickOpen} />}
                        </HeaderRightWrapper>
                    </MinterCapHeaderWrapper>
                    <MinterCapInfoBox $open={!isBasic && isOpen}>
                        <div style={{ height: '20px', padding: 0 }} />
                        <DetailWrapper $isOpen={true}>
                            <DetailLeftWrapper>
                                <Icons.Wallet width={'20px'} height={'20px'} />
                                <DetailAddressText
                                    $disabled={!Boolean(currentMinterAddress)}
                                    data-tooltip-content={currentMinterAddress.length >= 25 ? currentMinterAddress : ''}
                                    data-tooltip-id={TOOLTIP_ID.COMMON}
                                    data-tooltip-wrapper="span"
                                    data-tooltip-place="bottom"
                                >
                                    {shortenAddress(currentMinterAddress, 12, 12) || 'Wallet Address'}
                                </DetailAddressText>
                            </DetailLeftWrapper>
                            <DetailMinterCapAmount $disabled={!Boolean(Number(minterCap))} className="clamp-single-line">
                                {commaNumber(minterCap) || 0}
                            </DetailMinterCapAmount>
                        </DetailWrapper>
                    </MinterCapInfoBox>
                </MinterCapWrapper>
                <DividerBox>
                    <Divider $direction="horizontal" $color="#383838" $variant="dash" />
                </DividerBox>
            </MinterCapAccordianBox>
            <TotalSupply totalSupply={totalSupply} tokenSymbol={tokenSymbol} walletList={walletList} decimals={decimals} />
        </AmountWrapper>
    );
};

export default React.memo(Amount);
