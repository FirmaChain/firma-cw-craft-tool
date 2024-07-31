import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, TitleWrap, SummeryCard, HeaderWrap } from './styles';
import { IC_DOTTED_DIVIDER } from '@/components/atoms/icons/pngIcons';
import WalletList from '@/components/atoms/walletList';
import { IWallet } from '@/interfaces/wallet';
import { addStringAmount, formatWithCommas, getTokenAmountFromUToken, getUTokenAmountFromToken } from '@/utils/balance';
import useExecuteStore from '../../hooks/useCW721ExecuteStore';
import TransferNFTInputList from '@/components/atoms/walletList/transferNFTInputList';
import { v4 } from 'uuid';

const ItemWrap = styled.div`
    display: flex;
    gap: 4px;
`;

const TotalTransferLabelTypo = styled.div`
    color: var(--Gray-700, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const TotalTransferAmountTypo = styled.div`
    color: var(--Gray-850, #e6e6e6);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
`;

const DOTTED_DIVIDER = styled.img`
    width: 100%;
    height: auto;
`;

const MyWalletLabelTypo = styled.div`
    color: var(--Gray-550, #444);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const MyWalletAmountTypo = styled.div`
    color: var(--Gray-650, #707070);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const Transfer = () => {
    // const tokenInfo = useExecuteStore((state) => state.tokenInfo);
    // const cw20Balance = useExecuteStore((state) => state.cw20Balance);
    // const isFetched = useExecuteStore((v) => v.isFetched);
    // const setTransferList = useExecuteStore((state) => state.setTransferList);
    // const setIsFetched = useExecuteStore((v) => v.setIsFetched);

    const [addWalletList, setAddWalletList] = useState<IWallet[]>([]);

    // useEffect(() => {
    //     if (isFetched) {
    //         setIsFetched(false);
    //     }
    // }, [isFetched]);

    const totalTransferAmount = useMemo(() => {
        let addAmount = '0';
        for (const wallet of addWalletList) {
            // addAmount = addStringAmount(getUTokenAmountFromToken(wallet.amount, tokenInfo.decimals.toString()), addAmount);
        }
        return addAmount;
    }, [addWalletList]);

    const handleWalletList = (value: IWallet[]) => {
        setAddWalletList(value);
        // setTransferList(value);
    };

    const [walletList, setWalletList] = useState([{ recipient: '', tokenId: '', id: v4() }]);

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Transfer</HeaderTitleTypo>
                    <HeaderDescTypo>Move an NFT from one address to another</HeaderDescTypo>
                </TitleWrap>
                <SummeryCard>
                    <ItemWrap>
                        <TotalTransferLabelTypo>Total Transfer Amount :</TotalTransferLabelTypo>
                        <TotalTransferAmountTypo>{0}</TotalTransferAmountTypo>
                        <TotalTransferAmountTypo>NFT</TotalTransferAmountTypo>
                    </ItemWrap>
                    <DOTTED_DIVIDER src={IC_DOTTED_DIVIDER} alt={'Dotted Divider'} />
                    <ItemWrap>
                        <MyWalletLabelTypo>My Wallet Balance :</MyWalletLabelTypo>
                        <MyWalletAmountTypo>{0}</MyWalletAmountTypo>
                        <MyWalletAmountTypo>NFT</MyWalletAmountTypo>
                    </ItemWrap>
                </SummeryCard>
            </HeaderWrap>
            <TransferNFTInputList list={walletList} onChangeWalletList={(v) => setWalletList(v)} />
        </Container>
    );
};

export default Transfer;
