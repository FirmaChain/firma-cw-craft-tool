import { useState } from 'react';
import styled from 'styled-components';
import { Container, HeaderDescTypo, HeaderTitleTypo, TitleWrap, SummeryCard, HeaderWrap } from './styles';
import TransferNFTInputList from '@/components/atoms/walletList/transferNFTInputList';
import { v4 } from 'uuid';
import Divider from '@/components/atoms/divider';

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
                    <Divider $direction={'horizontal'} $variant="dash" $color="#444" />
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
