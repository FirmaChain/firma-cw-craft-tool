import styled from "styled-components";

import { IC_COIN_STACK, IC_COIN_STACK2, IC_DOTTED_DIVIDER } from "@/components/atoms/icons/pngIcons";
import { useContractContext } from "../../context/contractContext";
import { formatWithCommas, getTokenAmountFromUToken, getUTokenAmountFromToken, subtractStringAmount } from "@/utils/balance";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { rootState } from "@/redux/reducers";
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

const ItemLeftWrap = styled.div`
    display: flex;
    gap: 16px;
`;

const CoinStackIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const BurnInfoTitleTypo = styled.div`
    color: #02E191;
    font-family: "General Sans Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const ItemRightWrap = styled.div`
    display: flex;
    gap: 8px;
`;

const BurnAmountTypo = styled.div`
    color: var(--Green-500, #02E191);
    font-family: "General Sans Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 137.5% */
`;

const BurnSymbolTypo = styled.div`
    color: var(--Green-500, #02E191);
    font-family: "General Sans Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const DOTTED_DIVIDER = styled.img`
    width: 100%;
    height: auto;
`;

const CoinStack2Icon = styled.img`
    width: 24px;
    height: 24px;    
`;

const UpdatedBalanceLabelTypo = styled.div`
    color: var(--Gray-700, #999);
    font-family: "General Sans Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const UpdatedBalanceTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #FFF));
    font-family: "General Sans Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 137.5% */
`;

const UpdatedSymbolTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #FFF));
    font-family: "General Sans Variable";
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
    tokenSymbol: string;
    addressAmount: string;
    decimals: string;
}

const BurnPreview = ({ tokenSymbol, addressAmount, decimals }: IProps) => {
    const { contract, burnAmount, setIsFetched } = useContractContext();

    const updatedBalance = useMemo(() => {
        let amount = '0';

        amount = subtractStringAmount(getTokenAmountFromUToken(addressAmount, decimals), burnAmount);

        return amount;
    }, [addressAmount, burnAmount]);

    const onClickBurn = () => {
        const message = {
            amount: getUTokenAmountFromToken(burnAmount, decimals)
        }

        ModalActions.handleData({
            module: '/cw20/burnToken',
            params: {
                contract: contract,
                msg: message
            }
        });
        ModalActions.handleQrConfirm(true);
        ModalActions.handleSetCallback({ callback: () => {
            setIsFetched(true);
        }});
    };

    const isEnableButton = useMemo(() => {
        if (addressAmount === "" || addressAmount === "0") return false;
        if (burnAmount === "" || burnAmount === "0") return false;

        return true;
    }, [addressAmount, burnAmount]);

    return (
        <Container>
            <ContentWrap>
                <ItemWrap>
                    <ItemLeftWrap>
                        <CoinStackIcon src={IC_COIN_STACK} alt={'Burn Title Icon'} />
                        <BurnInfoTitleTypo>Total Burn Amount</BurnInfoTitleTypo>
                    </ItemLeftWrap>
                    <ItemRightWrap>
                        <BurnAmountTypo>{formatWithCommas(burnAmount)}</BurnAmountTypo>
                        <BurnSymbolTypo>{tokenSymbol}</BurnSymbolTypo>
                    </ItemRightWrap>
                </ItemWrap>
                <DOTTED_DIVIDER src={IC_DOTTED_DIVIDER} alt={'Dotted Divider'} />
                <ItemWrap>
                    <ItemLeftWrap>
                        <CoinStack2Icon src={IC_COIN_STACK2} alt={'Burn Update Balance Icon'}/>
                        <UpdatedBalanceLabelTypo>Updated Balance</UpdatedBalanceLabelTypo>
                    </ItemLeftWrap>
                    <ItemRightWrap>
                        <UpdatedBalanceTypo>{updatedBalance}</UpdatedBalanceTypo>
                        <UpdatedSymbolTypo>{tokenSymbol}</UpdatedSymbolTypo>
                    </ItemRightWrap>
                </ItemWrap>
            </ContentWrap>
            <ButtonWrap>
                <ExecuteButton $isEnable={isEnableButton} onClick={onClickBurn}>
                    <ExecuteButtonTypo>Burn</ExecuteButtonTypo>
                </ExecuteButton>
            </ButtonWrap>
        </Container>
    )
};

export default BurnPreview;
