import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Container, HeaderDescTypo, HeaderTitleTypo, TitleWrap, SummeryCard, HeaderWrap } from './styles';
import { IWallet } from '@/interfaces/wallet';
import {
    addStringAmount,
    compareStringNumbers,
    formatWithCommas,
    getTokenAmountFromUToken,
    getUTokenAmountFromToken
} from '@/utils/balance';
import useExecuteStore from '../../hooks/useExecuteStore';
import useFormStore from '@/store/formStore';
import Cw20TransferInputList from '@/components/atoms/walletList/cw20TransferInputList';
import Icons from '@/components/atoms/icons';
import Divider from '@/components/atoms/divider';
import useExecuteActions from '../../action';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import TextEllipsis from '@/components/atoms/ellipsis';

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

    white-space: pre;
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

    white-space: pre;
`;

const MyWalletAmountTypo = styled.div`
    color: var(--Gray-650, #707070);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const ErrorMessageBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    margin-left: 4px;
`;

const Transfer = () => {
    const userAddress = useSelector((v: rootState) => v.wallet.address);
    const contractAddress = useExecuteStore((v) => v.contractAddress);
    const tokenInfo = useExecuteStore((state) => state.tokenInfo);
    const isFetched = useExecuteStore((state) => state.isFetched);
    const cw20Balance = useExecuteStore((state) => state.cw20Balance);
    const transferList = useExecuteStore((state) => state.transferList);
    const setTransferList = useExecuteStore((state) => state.setTransferList);
    const setIsFetched = useExecuteStore((state) => state.setIsFetched);
    const { setCw20Balance } = useExecuteActions();

    const totalTransferAmount = useMemo(() => {
        let addAmount = '0';
        for (const wallet of transferList) {
            addAmount = addStringAmount(getUTokenAmountFromToken(wallet.amount, tokenInfo.decimals.toString()), addAmount);
        }
        return addAmount;
    }, [transferList]);

    const isBalanceExceed = useMemo(() => {
        if (!totalTransferAmount || !cw20Balance) return false;

        return BigInt(totalTransferAmount) > BigInt(cw20Balance);
    }, [cw20Balance, totalTransferAmount]);

    const handleWalletList = (value: IWallet[]) => {
        setTransferList(value);
    };

    useEffect(() => {
        setCw20Balance(contractAddress, userAddress);
        return () => {
            useFormStore.getState().clearForm();
            useExecuteStore.getState().clearTransfer();
        };
    }, []);

    useEffect(() => {
        if (isFetched) {
            setCw20Balance(contractAddress, userAddress);
            setIsFetched(false);
        }
    }, [isFetched]);

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Transfer</HeaderTitleTypo>
                    <HeaderDescTypo>Move tokens from one address to another</HeaderDescTypo>
                </TitleWrap>
                <SummeryCard>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <ItemWrap>
                            <TotalTransferLabelTypo>Total Transfer Amount :</TotalTransferLabelTypo>
                            <TextEllipsis
                                CustomDiv={TotalTransferAmountTypo}
                                text={formatWithCommas(getTokenAmountFromUToken(totalTransferAmount, tokenInfo.decimals.toString()))}
                                breakMode={'letters'}
                            />
                            {/* <TotalTransferAmountTypo className="clamp-single-line">
                                {formatWithCommas(getTokenAmountFromUToken(totalTransferAmount, tokenInfo.decimals.toString()))}
                            </TotalTransferAmountTypo> */}
                            <TotalTransferAmountTypo style={{ fontWeight: '400' }}>{tokenInfo.symbol}</TotalTransferAmountTypo>
                        </ItemWrap>
                        {isBalanceExceed && (
                            <ErrorMessageBox>
                                <Icons.Tooltip width="16px" height="16px" fill="var(--Status-Alert, #e55250)" />
                                <TotalTransferLabelTypo style={{ color: 'var(--Status-Alert, #e55250)' }}>
                                    You have exceeded the token balance.
                                </TotalTransferLabelTypo>
                            </ErrorMessageBox>
                        )}
                    </div>
                    <Divider $direction={'horizontal'} $variant="dash" $color="#444" />
                    <ItemWrap>
                        <MyWalletLabelTypo>My Wallet Balance :</MyWalletLabelTypo>
                        <TextEllipsis
                            CustomDiv={MyWalletAmountTypo}
                            text={formatWithCommas(getTokenAmountFromUToken(cw20Balance, tokenInfo.decimals.toString()))}
                            breakMode={'letters'}
                        />
                        {/* <MyWalletAmountTypo className="clamp-single-line">
                            {formatWithCommas(getTokenAmountFromUToken(cw20Balance, tokenInfo.decimals.toString()))}
                        </MyWalletAmountTypo> */}
                        <MyWalletAmountTypo style={{ fontWeight: '400' }}>{tokenInfo.symbol}</MyWalletAmountTypo>
                    </ItemWrap>
                </SummeryCard>
            </HeaderWrap>
            <Cw20TransferInputList
                list={transferList}
                decimals={tokenInfo.decimals.toString()}
                onChangeWalletList={handleWalletList}
                addressTitle={'Recipient Address'}
                addressPlaceholder={'Input Wallet Address'}
                amountTitle={'Transfer Amount'}
            />
        </Container>
    );
};

export default Transfer;
