import { useMemo, useState } from 'react';
import styled from 'styled-components';

import { IC_COIN_STACK, IC_COIN_STACK2, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import {
    addStringAmount,
    compareStringNumbers,
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

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 36px;
    justify-content: center;
`;

const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 32px 44px;
    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
    gap: 24px;
`;

const TokenInfoWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
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
`;

const WalletLeftItemWrap = styled.div`
    width: 100%;
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
    const [isEnableButton, setIsEnableButton] = useState<boolean>(false);

    const totalMintBalance = useMemo(() => {
        let totalAmount = '0';
        let allAddressesValid = true;
        let allAmountsValid = true;

        for (const wallet of mintingList) {
            if (!isValidAddress(wallet.recipient)) {
                allAddressesValid = false;
            }
            if (!wallet.amount || wallet.amount.trim() === '') {
                allAmountsValid = false;
            }
            totalAmount = addStringAmount(totalAmount, wallet.amount);
        }

        const possibleMintAmount = subtractStringAmount(minterInfo ? minterInfo.cap : '0', tokenInfo.total_supply);
        const compare = compareStringNumbers(getUTokenAmountFromToken(totalAmount, tokenInfo.decimals.toString()), possibleMintAmount);

        setIsEnableButton(allAddressesValid && allAmountsValid && compare !== 1);

        return getUTokenAmountFromToken(totalAmount, tokenInfo.decimals.toString());
    }, [mintingList, tokenInfo, minterInfo]);

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
                        type: 'wallet'
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
            <ContentWrap>
                <TokenTitleWrap>
                    <TokenInfoWrap>
                        <TokenInfoLeft>
                            <TokenInfoIcon src={IC_COIN_STACK} alt={'Mint Execute Title Icon'} />
                            <TokenInfoTitleTypo>Total Mint Supply</TokenInfoTitleTypo>
                        </TokenInfoLeft>
                        <TokenInfoRightWrap>
                            <TokenInfoMintAmountTypo>
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
                                        <WalletItemAddressTypo $disabled={!value.recipient}>
                                            {value.recipient ? shortenAddress(value.recipient, 12, 12) : 'Wallet Address'}
                                        </WalletItemAddressTypo>
                                    </WalletLeftItemWrap>
                                    <WalletItemTokenAmount $disabled={!Number(value.amount)}>
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
                            <TotalSupplyAmount>
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
            </ContentWrap>
            <ButtonWrap>
                <GreenButton disabled={!isEnableButton} onClick={onClickMint}>
                    <div className="button-text">Mint</div>
                </GreenButton>
            </ButtonWrap>
        </Container>
    );
};

export default MintPreview;
