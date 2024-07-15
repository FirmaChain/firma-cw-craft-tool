import styled from "styled-components";

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, SummeryCard, TitleWrap } from "./styles";
import WalletList from "@/components/atoms/walletList";
import { IWallet } from "@/interfaces/wallet";
import { useState } from "react";
import { useContractContext } from "../../context/contractContext";

const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const SummeryWrap = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
`;

const SummeryLabelTypo = styled.div`
    color: var(--Gray-700, #807E7E);
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const SummeryAmountTypo = styled.div`
    color: var(--Gray-850, #E6E6E6);
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
`;

const SummerySymbolTypo = styled.div`
    color: var(--Gray-850, #E6E6E6);
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
`;

interface IProps {
    decimals: string;
    tokenSymbol: string;
}

const BurnFrom = ({ decimals, tokenSymbol }: IProps) => {
    const { setWalletList } = useContractContext();
    
    const [burnWalletList, setBurnWalletList] = useState<IWallet[]>([]);

    const handleWalletList = (value: IWallet[]) => {
        setBurnWalletList(value);
        setWalletList(value);
    };

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Burn From</HeaderTitleTypo>
                    <HeaderDescTypo>Destroy tokens from another address using a pre-approved allowance</HeaderDescTypo>
                </TitleWrap>
                <SummeryCard>
                    <SummeryWrap>
                        <SummeryLabelTypo>Total Burn Amount :</SummeryLabelTypo>
                        <SummeryAmountTypo></SummeryAmountTypo>
                        <SummerySymbolTypo>{tokenSymbol}</SummerySymbolTypo>
                    </SummeryWrap>
                </SummeryCard>
            </HeaderWrap>
            <WalletList
                decimals={decimals}
                onChangeWalletList={handleWalletList}
                addressTitle={"Owner Address"}
                addressPlaceholder={"Input Wallet Address"}
                amountTitle={"Burn Amount"}
            />
        </Container>
    )
};

export default BurnFrom;