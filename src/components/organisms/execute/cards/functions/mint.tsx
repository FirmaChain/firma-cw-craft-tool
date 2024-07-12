import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Tooltip } from '@mui/material';

import { Container, HeaderDescTypo, HeaderTitleTypo, TitleWrap, SummeryCard, HeaderWrap } from './styles';
import { IC_DOTTED_DIVIDER, IC_TOOLTIP_INFO } from '../../../../atoms/icons/pngIcons';
import { useContractContext } from '../../context/contractContext';
import WalletList from '../../../../atoms/walletList';
import {
    addStringAmount,
    formatWithCommas,
    getTokenAmountFromUToken,
    getUTokenAmountFromToken,
    subtractStringAmount
} from '../../../../../utils/balance';
import { IWallet } from '../../../../../interfaces/wallet';

const MintCardWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const TotalMintWrap = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
`;

const TotalMintLabelTypo = styled.div`
    color: var(--Gray-650, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const TotalMintSupplyBalance = styled.div`
    color: var(--Gray-800, #e6e6e6);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
`;

const TotalMintSubLabelTypo = styled.div`
    color: var(--Gray-550, #444);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const TotalMintSubBalance = styled.div`
    color: var(--Gray-600, #707070);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const AdditionalTooltipIcon = styled.img`
    width: 14px;
    height: 14px;
    cursor: pointer;
`;

const DOTTED_DIVIDER = styled.img`
    width: 100%;
    height: auto;
`;

interface IProps {
    totalSupply: string;
    minterCap: string;
    tokenSymbol: string;
    decimals: string;
}

const Mint = ({ totalSupply, minterCap, tokenSymbol, decimals }: IProps) => {
    const { setWalletList } = useContractContext();

    const [addWalletList, setAddWalletList] = useState<IWallet[]>([]);

    const mintableAmount = useMemo(() => {
        return subtractStringAmount(minterCap, totalSupply);
    }, [totalSupply]);

    const totalMintAmount = useMemo(() => {
        let addAmount = '0';
        for (const wallet of addWalletList) {
            addAmount = addStringAmount(getUTokenAmountFromToken(wallet.amount, decimals), addAmount);
        }
        return addAmount;
    }, [addWalletList]);

    const handleWalletList = (value: IWallet[]) => {
        setAddWalletList(value);
        setWalletList(value);
    };

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Mint</HeaderTitleTypo>
                    <HeaderDescTypo>Create new tokens and add them to the total supply</HeaderDescTypo>
                </TitleWrap>
                <SummeryCard>
                    <MintCardWrap>
                        <TotalMintWrap>
                            <TotalMintLabelTypo>Total Mint Supply :</TotalMintLabelTypo>
                            <TotalMintSupplyBalance>
                                {formatWithCommas(getTokenAmountFromUToken(totalMintAmount, decimals))}
                            </TotalMintSupplyBalance>
                            <TotalMintSupplyBalance>{tokenSymbol}</TotalMintSupplyBalance>
                        </TotalMintWrap>
                        <DOTTED_DIVIDER src={IC_DOTTED_DIVIDER} alt={'Dotted Divider'} />
                        <TotalMintWrap>
                            <TotalMintSubLabelTypo>Additional Mintable Token Amount :</TotalMintSubLabelTypo>
                            <TotalMintSubBalance>
                                {formatWithCommas(getTokenAmountFromUToken(mintableAmount, decimals))}
                            </TotalMintSubBalance>
                            <TotalMintSubBalance>{tokenSymbol}</TotalMintSubBalance>
                            <Tooltip title={'Minter Cap is a value that limits the maximum\nnumber of tokens that can be minted.'}>
                                <AdditionalTooltipIcon
                                    src={IC_TOOLTIP_INFO}
                                    alt={'Additional Mintable Balance Tooltip'}
                                    data-tip={'This is the tooltip text'}
                                />
                            </Tooltip>
                        </TotalMintWrap>
                    </MintCardWrap>
                </SummeryCard>
            </HeaderWrap>
            <WalletList
                decimals={decimals}
                onChangeWalletList={handleWalletList}
                addressTitle={'Recipient Address'}
                addressPlaceholder={'Input Wallet Address'}
                amountTitle={'Amount'}
            />
        </Container>
    );
};

export default Mint;
