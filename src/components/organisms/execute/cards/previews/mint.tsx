import { useMemo, useState } from 'react';
import styled from 'styled-components';

import { IC_COIN_STACK, IC_COIN_STACK2, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import {
    addStringAmount,
    formatWithCommas,
    getTokenAmountFromUToken,
    getUTokenAmountFromToken,
    subtractStringAmount
} from '@/utils/balance';
import { IWallet } from '@/interfaces/wallet';
import { isValidAddress, shortenAddress } from '@/utils/address';
import { useModalStore } from '@/hooks/useModal';
import { QRCodeModal } from '@/components/organisms/modal';
import useExecuteStore from '../../hooks/useExecuteStore';
import Divider from '@/components/atoms/divider';
import IconTooltip from '@/components/atoms/tooltip';
import GreenButton from '@/components/atoms/buttons/greenButton';
import useExecuteActions from '../../action';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { ONE_TO_MINE } from '@/constants/regex';
import { ExecutePreviewOverlayScroll, StyledOverlayScrollbar } from '@/components/organisms/instantiate/preview/dashboard/style';

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
    // border-radius: 24px;
    // border: 1px solid var(--Gray-550, #444);
    gap: 24px;
    // overflow: scroll;
`;

const TokenInfoWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    gap: 16px;
`;

const TokenTitleWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TokenInfoLeft = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
`;

const TokenInfoIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const TokenInfoTitleTypo = styled.div`
    color: #02e191;
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    opacity: 0.8;

    white-space: pre;
`;

const TokenInfoRightWrap = styled.div`
    display: flex;
    gap: 8px;
`;

const TokenInfoMintAmountTypo = styled.div`
    color: var(--Green-500, #02e191);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 137.5% */
`;

const TokeInfoMintSymbolTypo = styled.div`
    color: var(--Green-500, #02e191);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const WalletListWrap = styled.div`
    height: auto;
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 12px;
    background: var(--Gray-150, #141414);
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
    line-height: 20px;
    white-space: pre;
`;

const WalletItemTokenAmount = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? '#383838' : '#807E7E')};
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const TokenInfoSubTitleTypo = styled.div`
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */

    white-space: pre;
`;

const TotalSupplyWrap = styled.div`
    display: flex;
    gap: 8px;
`;

const TotalSupplyAmount = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 137.5% */
`;

const TotalSupplySymbol = styled.div`
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

const MintPreview = () => {
    const contractAddress = useExecuteStore((state) => state.contractAddress);
    const fctBalance = useExecuteStore((state) => state.fctBalance);
    const mintingList = useExecuteStore((state) => state.mintingList);
    const minterInfo = useExecuteStore((state) => state.minterInfo);
    const tokenInfo = useExecuteStore((state) => state.tokenInfo);
    const isFetched = useExecuteStore((state) => state.setIsFetched);
    const clearMinterList = useExecuteStore((state) => state.clearMinterList);
    const { setMinterInfo, setTokenInfo } = useExecuteActions();

    const modal = useModalStore();

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const totalMintBalance = useMemo(() => {
        let totalAmount = '0';

        for (const wallet of mintingList) {
            totalAmount = addStringAmount(totalAmount, wallet.amount);
        }

        return getUTokenAmountFromToken(totalAmount, tokenInfo.decimals.toString());
    }, [mintingList, tokenInfo]);

    const mintableAmount = useMemo(() => {
        if (!minterInfo || !tokenInfo) return '';

        return subtractStringAmount(minterInfo?.cap, tokenInfo?.total_supply);
    }, [minterInfo, tokenInfo]);

    const totalMintAmount = useMemo(() => {
        let addAmount = '0';
        for (const wallet of mintingList) {
            addAmount = addStringAmount(getUTokenAmountFromToken(wallet.amount, tokenInfo.decimals.toString()), addAmount);
        }
        return addAmount;
    }, [mintingList, tokenInfo.decimals]);

    const exceedMinterCap = useMemo(() => {
        if (!mintableAmount || !totalMintAmount) return false;

        return BigInt(mintableAmount) < BigInt(totalMintAmount);
    }, [mintableAmount, totalMintAmount]);

    const isEnableButton = useMemo(() => {
        //! all list is filled
        if (mintingList.some(({ recipient, amount }) => !recipient || !amount)) return false;

        //! all addresses in list is valid
        if (mintingList.some(({ recipient }) => !isValidAddress(recipient))) return false;

        //! all amount in list valid number ( > 0)
        if (mintingList.some(({ amount }) => amount.replace(ONE_TO_MINE, '') === '')) return false;

        if (exceedMinterCap)
            //! total supply amount + current supply <= minter cap
            return false;

        return true;
    }, [exceedMinterCap, mintingList]);

    const onClickMint = () => {
        const convertWalletList: IWallet[] = [];
        let totalAmount = '0';
        let feeAmount = mintingList.length * 15000;

        for (const wallet of mintingList) {
            const amount = getUTokenAmountFromToken(wallet.amount, tokenInfo.decimals.toString());
            convertWalletList.push({
                recipient: wallet.recipient,
                amount: amount
            });
            totalAmount = addStringAmount(totalAmount, amount);
        }

        const params = {
            header: {
                title: 'Mint'
            },
            content: {
                symbol: tokenInfo.symbol,
                decimals: tokenInfo.decimals.toString(),
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Total Mint Amount',
                        value: totalMintBalance,
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
                    module="/cw20/mintToken"
                    id={id}
                    params={params}
                    onClickConfirm={() => {
                        isFetched(true);
                        clearMinterList();
                        setMinterInfo(contractAddress);
                        setTokenInfo(contractAddress);
                    }}
                />
            )
        });
    };

    return (
        <Container>
            <ContentScrollWrap>
                <ExecutePreviewOverlayScroll defer>
                    <ContentBox>
                        <TokenTitleWrap>
                            <TokenInfoWrap>
                                <TokenInfoLeft>
                                    <TokenInfoIcon src={IC_COIN_STACK} alt={'Mint Execute Title Icon'} />
                                    <TokenInfoTitleTypo>Total Mint Supply</TokenInfoTitleTypo>
                                </TokenInfoLeft>
                                <TokenInfoRightWrap>
                                    <TokenInfoMintAmountTypo className="clamp-single-line">
                                        {formatWithCommas(getTokenAmountFromUToken(totalMintBalance, tokenInfo.decimals.toString()))}
                                    </TokenInfoMintAmountTypo>
                                    <TokeInfoMintSymbolTypo>{tokenInfo.symbol}</TokeInfoMintSymbolTypo>
                                    <ArrowToggleButton open={isOpen} onToggle={setIsOpen} />
                                </TokenInfoRightWrap>
                            </TokenInfoWrap>
                            {isOpen && (
                                <WalletListWrap>
                                    {mintingList.map((value, index) => (
                                        <WalletItemWrap key={index}>
                                            <WalletLeftItemWrap>
                                                <WalletItemIcon src={IC_WALLET} alt={'Wallet Item'} />
                                                <WalletItemAddressTypo
                                                    $disabled={!value.recipient}
                                                    data-tooltip-content={value.recipient?.length > 25 ? value.recipient : ''}
                                                    data-tooltip-id={TOOLTIP_ID.COMMON}
                                                    data-tooltip-wrapper="span"
                                                    data-tooltip-place="bottom"
                                                >
                                                    {value.recipient ? shortenAddress(value.recipient, 12, 12) : 'Wallet Address'}
                                                </WalletItemAddressTypo>
                                            </WalletLeftItemWrap>
                                            <WalletItemTokenAmount $disabled={!Number(value.amount)} className="clamp-single-line">
                                                {value.amount === '' ? '0' : formatWithCommas(value.amount)}
                                            </WalletItemTokenAmount>
                                        </WalletItemWrap>
                                    ))}
                                </WalletListWrap>
                            )}
                        </TokenTitleWrap>
                        <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-500, #383838)" />
                        <TokenInfoWrap>
                            <TokenInfoLeft>
                                <TokenInfoIcon src={IC_COIN_STACK2} alt={'Mint Execute Subtitle Icon'} />
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                                    <TokenInfoSubTitleTypo>Total Supply</TokenInfoSubTitleTypo>
                                    <IconTooltip
                                        size="14px"
                                        tooltip={`Total Supply is the sum of the existing Total\nSupply and the newly minted amount.`}
                                    />
                                </div>
                            </TokenInfoLeft>
                            <TokenInfoRightWrap>
                                <TotalSupplyWrap>
                                    <TotalSupplyAmount className="clamp-single-line">
                                        {formatWithCommas(
                                            getTokenAmountFromUToken(
                                                String(BigInt(tokenInfo.total_supply) + BigInt(totalMintBalance)),
                                                tokenInfo.decimals.toString()
                                            )
                                        )}
                                    </TotalSupplyAmount>
                                    <TotalSupplySymbol>{tokenInfo.symbol}</TotalSupplySymbol>
                                </TotalSupplyWrap>
                            </TokenInfoRightWrap>
                        </TokenInfoWrap>
                    </ContentBox>
                </ExecutePreviewOverlayScroll>
            </ContentScrollWrap>
            <ButtonWrap>
                <GreenButton disabled={!isEnableButton} onClick={onClickMint}>
                    <div className="button-text">Mint</div>
                </GreenButton>
            </ButtonWrap>
        </Container>
    );
};

export default MintPreview;
