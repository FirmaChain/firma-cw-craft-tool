import styled from 'styled-components';
import { Container, HeaderDescTypo, HeaderTitleTypo, TitleWrap, SummeryCard, HeaderWrap } from './styles';
import TransferNFTInputList from '@/components/atoms/walletList/transferNFTInputList';
import Divider from '@/components/atoms/divider';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import { useEffect } from 'react';
import useFormStore from '@/store/formStore';

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
    const transferInfo = useCW721ExecuteStore((v) => v.transfer);
    const setTransfer = useCW721ExecuteStore((v) => v.setTransfer);

    useEffect(() => {
        return () => {
            useCW721ExecuteStore.getState().clearTransferForm();
            useFormStore.getState().clearForm();
        };
    }, []);

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
            <TransferNFTInputList list={transferInfo} onChangeWalletList={(v) => setTransfer(v)} />
        </Container>
    );
};

export default Transfer;
