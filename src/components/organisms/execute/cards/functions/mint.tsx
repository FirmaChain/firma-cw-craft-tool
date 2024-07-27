import { useMemo, useState } from 'react';
import styled from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, TitleWrap, SummeryCard, HeaderWrap } from './styles';
import { IC_DOTTED_DIVIDER } from '@/components/atoms/icons/pngIcons';
import WalletList from '@/components/atoms/walletList';
import {
    addStringAmount,
    formatWithCommas,
    getTokenAmountFromUToken,
    getUTokenAmountFromToken,
    subtractStringAmount
} from '@/utils/balance';
import { IWallet } from '@/interfaces/wallet';
import IconTooltip from '@/components/atoms/tooltip';
import useExecuteStore from '../../hooks/useExecuteStore';

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

const DOTTED_DIVIDER = styled.img`
    width: 100%;
    height: auto;
`;

const Mint = () => {
    const minterInfo = useExecuteStore((state) => state.minterInfo);
    const tokenInfo = useExecuteStore((state) => state.tokenInfo);
    const setMinterList = useExecuteStore((state) => state.setMinterList);

    const [addWalletList, setAddWalletList] = useState<IWallet[]>([]);

    const mintableAmount = useMemo(() => {
        return subtractStringAmount(minterInfo.cap, tokenInfo.total_supply);
    }, [minterInfo, tokenInfo]);

    const totalMintAmount = useMemo(() => {
        let addAmount = '0';
        for (const wallet of addWalletList) {
            addAmount = addStringAmount(getUTokenAmountFromToken(wallet.amount, tokenInfo.decimals.toString()), addAmount);
        }
        return addAmount;
    }, [addWalletList]);

    const handleWalletList = (value: IWallet[]) => {
        setAddWalletList(value);
        setMinterList(value);
    };

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Mint</HeaderTitleTypo>
                    <HeaderDescTypo>Create new tokens and add them to the total supply</HeaderDescTypo>
                </TitleWrap>
                <SummeryCard>
                    <TotalMintWrap>
                        <TotalMintLabelTypo>Total Mint Supply :</TotalMintLabelTypo>
                        <TotalMintSupplyBalance>
                            {formatWithCommas(getTokenAmountFromUToken(totalMintAmount, tokenInfo.decimals.toString()))}
                        </TotalMintSupplyBalance>
                        <TotalMintSupplyBalance>{tokenInfo.symbol}</TotalMintSupplyBalance>
                    </TotalMintWrap>
                    <DOTTED_DIVIDER src={IC_DOTTED_DIVIDER} alt={'Dotted Divider'} />
                    <TotalMintWrap>
                        <TotalMintSubLabelTypo>Additional Mintable Token Amount :</TotalMintSubLabelTypo>
                        <TotalMintSubBalance>
                            {formatWithCommas(getTokenAmountFromUToken(mintableAmount, tokenInfo.decimals.toString()))}
                        </TotalMintSubBalance>
                        <TotalMintSubBalance>{tokenInfo.symbol}</TotalMintSubBalance>
                        <IconTooltip
                            size="14px"
                            tooltip={'Minter Cap is a value that limits the maximum\nnumber of tokens that can be minted.'}
                        />
                    </TotalMintWrap>
                </SummeryCard>
            </HeaderWrap>
            <WalletList
                decimals={tokenInfo.decimals.toString()}
                onChangeWalletList={handleWalletList}
                addressTitle={'Recipient Address'}
                addressPlaceholder={'Input Wallet Address'}
                amountTitle={'Amount'}
            />
        </Container>
    );
};

export default Mint;
