import { styled } from "styled-components";

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, TitleWrap } from "./styles";
import { compareStringNumbers, formatWithCommas, getTokenAmountFromUToken, getUTokenAmountFromToken } from "@/utils/balance";
import InputTextWithLabel from "@/components/atoms/input/inputTextWithLabel";
import { useEffect, useState } from "react";
import { useContractContext } from "../../context/contractContext";

const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const WalletBalanceWrap = styled.div`
    display: flex;
    gap: 4px;
`;

const WalletBalanceTypo = styled.div`
    color: var(--Gray-550, #444);
    font-family: "General Sans Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */
`;

interface IProps {
    decimals: string;
    addressAmount: string;
}

const Burn = ({ decimals, addressAmount }: IProps) => {
    const { _isFetched, _setBurnAmount } = useContractContext();
    const [inputBurnAmount, setInputBurnAmount] = useState<string>("");

    const handleBurnAmount = (value: string) => {
        const truncateDecimals = (value: string) => {
            const decimalPlaces = parseInt(decimals, 10);
            const fractionalPart = value.split('.')[1];

            if (!fractionalPart || fractionalPart.length <= decimalPlaces) {
                return value;
            }
            return addressAmount;
        };

        const isValidFormat = /^[0-9]*\.?[0-9]*$/.test(value);
        if (!isValidFormat) {
            return;
        }
    
        const truncatedValue = truncateDecimals(value);
        const convertBurnAmount = getUTokenAmountFromToken(truncatedValue, decimals);
        const burnAmount = compareStringNumbers(addressAmount, convertBurnAmount) === 1 ? truncatedValue : getTokenAmountFromUToken(addressAmount, decimals);

        setInputBurnAmount(burnAmount);
        _setBurnAmount(burnAmount);
    };
    
    useEffect(() => {
        setInputBurnAmount("");
        _setBurnAmount("0");
    }, [_isFetched]);
    
    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Burn</HeaderTitleTypo>
                    <HeaderDescTypo>Destroy tokens, reducing the total supply</HeaderDescTypo>
                </TitleWrap>
            </HeaderWrap>
            <ContentWrap>
                <InputTextWithLabel
                    placeHolderLeft={"0"}
                    label={"Burn Amount"}
                    value={inputBurnAmount}
                    onChange={handleBurnAmount}
                />
                <WalletBalanceWrap>
                    <WalletBalanceTypo>Balance :</WalletBalanceTypo>
                    <WalletBalanceTypo>{formatWithCommas(getTokenAmountFromUToken(addressAmount, decimals))}</WalletBalanceTypo>
                </WalletBalanceWrap>
            </ContentWrap>
        </Container>
    )
};

export default Burn;