import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { IC_COIN_STACK, IC_WALLET } from "@/components/atoms/icons/pngIcons";
import { IWallet } from "@/interfaces/wallet";
import { useContractContext } from "../../context/contractContext";
import { isValidAddress, shortenAddress } from "@/utils/address";
import { addStringAmount, formatWithCommas, getTokenAmountFromUToken, getUTokenAmountFromToken } from "@/utils/balance";
import ArrowToggleButton from "@/components/atoms/buttons/arrowToggleButton";
import { ModalActions } from "@/redux/actions";

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
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 32px 44px;
    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
`;

const ItemWrap = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ItemLabelWrap = styled.div`
    display: flex;
    gap: 16px;
`;

const ItemLabelIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const ItemLabelTypo = styled.div`
    color: #02E191;
    font-family: "General Sans Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const ItemAmountWrap = styled.div`
    display: flex;
    gap: 8px;
`;

const ItemAmountTypo = styled.div`
    color: var(--Green-500, #02E191);
    font-family: "General Sans Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 137.5% */
`;

const ItemAmountSymbolTypo = styled.div`
    color: var(--Green-500, #02E191);
    font-family: "General Sans Variable";
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
    color: var(--Gray-650, #707070);
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const WalletItemTokenAmount = styled.div`
    color: var(--Gray-700, #807E7E);
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
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
    totalSupply: string;
    tokenSymbol: string;
    decimals: string;
}

const BurnFromPreview = ({ totalSupply, tokenSymbol, decimals }: IProps) => {
    const { _contract, _walletList, _setIsFetched, _setWalletList } = useContractContext();

    const [totalBurnBalance, setTotalBurnBalance] = useState<string>('0');
    const [isEnableButton, setIsEnableButton] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const calculateTotalBurnBalance = useCallback(() => {
        let totalAmount = '0';
        let allAddressesValid = true;
        let allAmountsValid = true;

        for (const wallet of _walletList) {
            if (!isValidAddress(wallet.recipient)) {
                allAddressesValid = false;
            }
            if (!wallet.amount || wallet.amount.trim() === '') {
                allAmountsValid = false;
            }
            totalAmount = addStringAmount(totalAmount, wallet.amount);
        }


        setIsEnableButton(allAddressesValid && allAmountsValid);
        setTotalBurnBalance(getUTokenAmountFromToken(totalAmount, decimals));
    }, [_walletList, totalSupply, decimals]);

    const onClickBurn = () => {
        const convertWalletList = [];

        for (const wallet of _walletList) {
            convertWalletList.push({
                owner: wallet.recipient,
                amount: getUTokenAmountFromToken(wallet.amount, decimals)
            });
        }

        ModalActions.handleData({
            module: '/cw20/burnFrom',
            params: {
                contract: _contract,
                msg: convertWalletList
            }
        });
        ModalActions.handleQrConfirm(true);
        ModalActions.handleSetCallback({ callback: () => {
            _setWalletList([]);
            _setIsFetched(true);
        }});
    };

    useEffect(() => {
        calculateTotalBurnBalance();
    }, [_walletList, calculateTotalBurnBalance]);

    return (
        <Container>
            <ContentWrap>
                <ItemWrap>
                    <ItemLabelWrap>
                        <ItemLabelIcon src={IC_COIN_STACK} alt={'Burn From Title Icon'} />
                        <ItemLabelTypo>Total Burn Amount</ItemLabelTypo>
                    </ItemLabelWrap>
                    <ItemAmountWrap>
                        <ItemAmountTypo>{formatWithCommas(getTokenAmountFromUToken(totalBurnBalance, decimals))}</ItemAmountTypo>
                        <ItemAmountSymbolTypo>{tokenSymbol}</ItemAmountSymbolTypo>
                        <ArrowToggleButton onToggle={setIsOpen} />
                    </ItemAmountWrap>
                </ItemWrap>
                {isOpen && (
                    <WalletListWrap>
                        {_walletList.map((value, index) => (
                            <WalletItemWrap key={index}>
                                <WalletLeftItemWrap>
                                    <WalletItemIcon src={IC_WALLET} alt={'Wallet Item'} />
                                    <WalletItemAddressTypo>{value.recipient !== "" ? shortenAddress(value.recipient, 12, 12) : "Wallet Address"}</WalletItemAddressTypo>
                                </WalletLeftItemWrap>
                                <WalletItemTokenAmount>
                                    {value.amount === '' ? '0' : formatWithCommas(value.amount)}
                                </WalletItemTokenAmount>
                            </WalletItemWrap>
                        ))}
                    </WalletListWrap>
                )}
            </ContentWrap>
            <ButtonWrap>
                <ExecuteButton $isEnable={isEnableButton} onClick={onClickBurn}>
                    <ExecuteButtonTypo>Burn From</ExecuteButtonTypo>
                </ExecuteButton>
            </ButtonWrap>
        </Container>
    )
};

export default BurnFromPreview;