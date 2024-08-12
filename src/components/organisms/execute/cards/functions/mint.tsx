import { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, TitleWrap, SummeryCard, HeaderWrap } from './styles';
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
import useFormStore from '@/store/formStore';
import Divider from '@/components/atoms/divider';
import Cw20MintInputList from '@/components/atoms/walletList/cw20MintInputList';
import Icons from '@/components/atoms/icons';

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

    white-space: pre;
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

    white-space: pre;
`;

const TotalMintSubBalance = styled.div`
    color: var(--Gray-600, #707070);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const MinterCapExceedBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    // margin-top: -15px;
`;

const Mint = () => {
    const minterInfo = useExecuteStore((state) => state.minterInfo);
    const tokenInfo = useExecuteStore((state) => state.tokenInfo);
    const mintingList = useExecuteStore((state) => state.mintingList);
    const setMinterList = useExecuteStore((state) => state.setMinterList);

    //! if minter cap is zero, or no minter info provided, disable mint
    const DISABLE_MINT = !minterInfo || !minterInfo?.cap || BigInt(minterInfo?.cap) === BigInt(0);

    const mintableAmount = useMemo(() => {
        if (!minterInfo || !tokenInfo) return '';

        // console.log(minterInfo, tokenInfo);

        return subtractStringAmount(minterInfo?.cap, tokenInfo?.total_supply);
    }, [minterInfo, tokenInfo]);

    const totalMintAmount = useMemo(() => {
        let addAmount = '0';
        for (const wallet of mintingList) {
            addAmount = addStringAmount(getUTokenAmountFromToken(wallet.amount, tokenInfo.decimals.toString()), addAmount);
        }
        return addAmount;
    }, [mintingList]);

    const exceedMinterCap = useMemo(() => {
        if (!mintableAmount || !totalMintAmount) return false;

        return BigInt(mintableAmount) < BigInt(totalMintAmount);
    }, [mintableAmount, totalMintAmount]);

    const handleWalletList = (value: IWallet[]) => {
        setMinterList(value);
    };

    useEffect(() => {
        return () => {
            useFormStore.getState().clearForm();
            useExecuteStore.getState().clearMinterList();
        };
    }, []);

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Mint</HeaderTitleTypo>
                    <HeaderDescTypo>Create new tokens and add them to the total supply</HeaderDescTypo>
                </TitleWrap>
                <SummeryCard>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <TotalMintWrap>
                            <TotalMintLabelTypo>Total Mint Supply :</TotalMintLabelTypo>
                            <TotalMintSupplyBalance
                                className="clamp-single-line"
                                // data-tooltip-content={
                                //     Number(totalMintAmount) > 0
                                //         ? formatWithCommas(parseAmountWithDecimal2(totalMintAmount, tokenInfo.decimals.toString()))
                                //         : ''
                                // }
                                // data-tooltip-id={TOOLTIP_ID.COMMON}
                                // data-tooltip-wrapper="span"
                                // data-tooltip-place="bottom"
                            >
                                {formatWithCommas(getTokenAmountFromUToken(totalMintAmount, tokenInfo.decimals.toString()))}
                            </TotalMintSupplyBalance>
                            <TotalMintSupplyBalance>{tokenInfo.symbol}</TotalMintSupplyBalance>
                        </TotalMintWrap>
                        {exceedMinterCap && (
                            <MinterCapExceedBox>
                                <Icons.Tooltip width="16px" height="16px" fill="var(--Status-Alert, #e55250)" />
                                <TotalMintLabelTypo style={{ color: 'var(--Status-Alert, #e55250)' }}>
                                    You have exceeded the minter cap.
                                </TotalMintLabelTypo>
                            </MinterCapExceedBox>
                        )}
                    </div>
                    <Divider $direction="horizontal" $variant="dash" $color="#444" />
                    <TotalMintWrap>
                        <TotalMintSubLabelTypo>Additional Mintable Token Amount :</TotalMintSubLabelTypo>
                        <TotalMintSubBalance
                            className="clamp-single-line"
                            // data-tooltip-content={
                            //     Number(mintableAmount) > 0
                            //         ? formatWithCommas(parseAmountWithDecimal2(mintableAmount, tokenInfo.decimals.toString()))
                            //         : ''
                            // }
                            // data-tooltip-id={TOOLTIP_ID.COMMON}
                            // data-tooltip-wrapper="span"
                            // data-tooltip-place="bottom"
                        >
                            {formatWithCommas(getTokenAmountFromUToken(mintableAmount, tokenInfo.decimals.toString()))}
                        </TotalMintSubBalance>
                        <TotalMintSubBalance>{tokenInfo.symbol}</TotalMintSubBalance>
                        <IconTooltip size="14px" tooltip={`Additional Mintable Token Amount\n=  Minter Cap - Total Supply`} />
                    </TotalMintWrap>
                </SummeryCard>
            </HeaderWrap>
            <Cw20MintInputList
                list={mintingList}
                decimals={tokenInfo.decimals.toString()}
                onChangeWalletList={handleWalletList}
                addressTitle={'Recipient Address'}
                addressPlaceholder={'Input Wallet Address'}
                amountTitle={'Amount'}
                blockAllInput={DISABLE_MINT}
            />
        </Container>
    );
};

export default Mint;
