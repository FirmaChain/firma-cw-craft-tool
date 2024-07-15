import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ModalActions } from '@/redux/actions';

import { IC_COIN_STACK, IC_COIN_STACK2, IC_DOTTED_DIVIDER, IC_WALLET } from '../../../../atoms/icons/pngIcons';
import ArrowToggleButton from '../../../../atoms/buttons/arrowToggleButton';
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
import { useContractContext } from '../../context/contractContext';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 36px;
    justify-content: center;
`;

const ContentWrap = styled.div`
    width: calc(100% - 88px);
    height: auto;
    padding: 32px 44px;
    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
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
    width: calc(100% - 64px);
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

const WalletItemAddressTypo = styled.div`
    color: var(--Gray-500, #383838);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;

const WalletItemTokenAmount = styled.div`
    color: var(--Gray-500, #383838);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const DOTTED_DIVIDER = styled.img`
    width: 100%;
    height: auto;
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

const ExecuteButton = styled.button<{ $isEnable: boolean }>`
    width: 220px !important;
    height: 48px;
    border-radius: 8px;
    background: ${(props) => (props.$isEnable ? '#02E191' : '#707070')};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${(props) => (props.$isEnable ? 'pointer' : 'inherit')};
    pointer-events: ${(props) => (props.$isEnable ? 'auto' : 'none')};
    border: none;
    outline: none;
    transition:
        background 0.1s,
        transform 0.1s;

    &:active {
        transform: scale(0.99);
    }
`;

const ExecuteButtonTypo = styled.div`
    color: var(--Gray-100, #121212);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 125% */
`;

interface IProps {
    minterCap: string;
    totalSupply: string;
    decimals: string;
    tokenSymbol: string;
}

const MintPreview = ({ minterCap, totalSupply, decimals, tokenSymbol }: IProps) => {
    const { contract, walletList, setIsFetched, setWalletList } = useContractContext();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [totalMintBalance, setTotalMintBalance] = useState<string>('0');
    const [isEnableButton, setIsEnableButton] = useState<boolean>(false);

    const calculateTotalMintBalance = useCallback(() => {
        let totalAmount = '0';
        let allAddressesValid = true;
        let allAmountsValid = true;

        for (const wallet of walletList) {
            if (!isValidAddress(wallet.recipient)) {
                allAddressesValid = false;
            }
            if (!wallet.amount || wallet.amount.trim() === '') {
                allAmountsValid = false;
            }
            totalAmount = addStringAmount(totalAmount, wallet.amount);
        }

        const possibleMintAmount = subtractStringAmount(minterCap, totalSupply);
        const compare = compareStringNumbers(getUTokenAmountFromToken(totalAmount, decimals), possibleMintAmount);

        setIsEnableButton(allAddressesValid && allAmountsValid && compare !== 1);
        setTotalMintBalance(getUTokenAmountFromToken(totalAmount, decimals));
    }, [walletList, minterCap, totalSupply, decimals]);

    useEffect(() => {
        calculateTotalMintBalance();
    }, [walletList, calculateTotalMintBalance]);

    const onClickMint = () => {
        const convertWalletList: IWallet[] = [];

        for (const wallet of walletList) {
            convertWalletList.push({
                recipient: wallet.recipient,
                amount: getUTokenAmountFromToken(wallet.amount, decimals)
            });
        }

        ModalActions.handleData({
            module: '/cw20/mintToken',
            params: {
                contract: contract,
                msg: convertWalletList
            }
        });
        ModalActions.handleQrConfirm(true);
        ModalActions.handleSetCallback({ callback: () => {
            setWalletList([]);
            setIsFetched(true);
        }});
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
                                {formatWithCommas(getTokenAmountFromUToken(totalMintBalance, decimals))}
                            </TokenInfoMintAmountTypo>
                            <TokeInfoMintSymbolTypo>{tokenSymbol}</TokeInfoMintSymbolTypo>
                            <ArrowToggleButton onToggle={setIsOpen} />
                        </TokenInfoRightWrap>
                    </TokenInfoWrap>
                    {isOpen && (
                        <WalletListWrap>
                            {walletList.map((value, index) => (
                                <WalletItemWrap key={index}>
                                    <WalletLeftItemWrap>
                                        <WalletItemIcon src={IC_WALLET} alt={'Wallet Item'} />
                                        <WalletItemAddressTypo>{shortenAddress(value.recipient, 12, 12)}</WalletItemAddressTypo>
                                    </WalletLeftItemWrap>
                                    <WalletItemTokenAmount>
                                        {value.amount === '' ? '0' : formatWithCommas(value.amount)}
                                    </WalletItemTokenAmount>
                                </WalletItemWrap>
                            ))}
                        </WalletListWrap>
                    )}
                </TokenTitleWrap>
                <DOTTED_DIVIDER src={IC_DOTTED_DIVIDER} alt={'Dotted Divider'} />
                <TokenInfoWrap>
                    <TokenInfoLeft>
                        <TokenInfoIcon src={IC_COIN_STACK2} alt={'Mint Execute Subtitle Icon'} />
                        <TokenInfoSubTitleTypo>Total Supply</TokenInfoSubTitleTypo>
                        {/* TODO TOOLTIP ICON */}
                    </TokenInfoLeft>
                    <TokenInfoRightWrap>
                        <TotalSupplyWrap>
                            <TotalSupplyAmount>{formatWithCommas(getTokenAmountFromUToken(totalSupply, decimals))}</TotalSupplyAmount>
                            <TotalSupplySymbol>{tokenSymbol}</TotalSupplySymbol>
                        </TotalSupplyWrap>
                    </TokenInfoRightWrap>
                </TokenInfoWrap>
            </ContentWrap>
            <ButtonWrap>
                <ExecuteButton $isEnable={isEnableButton} onClick={onClickMint}>
                    <ExecuteButtonTypo>Mint</ExecuteButtonTypo>
                </ExecuteButton>
            </ButtonWrap>
        </Container>
    );
};

export default MintPreview;
